"use client";
import React, { useEffect, useLayoutEffect, useState } from "react";
import Header from "@/components/profile/Header";
import About from "@/components/profile/About";
import Followers from "@/components/profile/Followers";
import Posts from "@/components/Posts";
import { getSession } from "next-auth/react";
import useAuth from "@/hooks/useAuth";
import {
  setIsLoggedInUser,
  setSessionUserDetails,
} from "@/redux/slices/profile";
import { useDispatch, useSelector } from "react-redux";
import usePost from "@/hooks/usePost";
import PageLoader from "@/components/loader/PageLoader";
import { SessionType } from "@/common.types";
import useFollow from "@/hooks/useFollow";

function Profile({ params }: { params: { username: string } }) {
  const [session, setSession] = useState<SessionType | null>(null);
  const [gettingUser, setGettingUser] = useState(false);
  const { getUserDetails } = useAuth();
  const { fetchUserPost } = usePost();
  const { isFollowing, getUserFollowersAndFollowing } = useFollow();
  const dispatch = useDispatch();
  const { userDetails } = useSelector((state: any) => state.profile);
  const { posts } = useSelector((state: any) => state.post);
  const { isLoading, isFetchingUserDetails, isLoadingFollowing } = useSelector(
    (state: any) => state.loading
  );

  const handleSession = async () => {
    const data = await getSession();
    if (data) {
      setSession(data);
    }
  }

  useLayoutEffect(() => {
    if (isLoading) return;

    dispatch(setSessionUserDetails(session));

    if (session && userDetails) {
      isFollowing({ followerId: session?.id as string, followingId: userDetails._id});
    }

    if (session && userDetails && session?.id === userDetails._id) {
      dispatch(setIsLoggedInUser(true));
    }
  }, [session, userDetails]);

  useLayoutEffect(() => {
    if (!userDetails._id) return;
    fetchUserPost({ userId: userDetails._id });
    getUserFollowersAndFollowing({ id: userDetails._id });
  }, [userDetails._id]);

  useEffect(() => {
    handleSession();
    getUserDetails(params?.username, setGettingUser);
  }, []);

  if (isFetchingUserDetails || isLoading || !session || !userDetails || isLoadingFollowing) {
    return <PageLoader />;
  }

  return (
    <div className='bg-background_color min-h-screen'>
      <Header />

      <div className='mt-10 px-10 grid grid-cols-3'>
        <div className='flex flex-col gap-4'>
          <About />
          <Followers />
        </div>

        <div className='col-span-2'>
          <h2 className='font-bold text-2xl text-center'>Posts</h2>
          <Posts
            fetchPosts={() => {}}
            isEditing
            isLoading={isLoading}
            posts={posts}
            setIsEditing={() => {}}
            setOpenModal={() => {}}
            setPostToEdit={() => {}}
          />
        </div>
      </div>
    </div>
  );
}

export default Profile;
