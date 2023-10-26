"use client";
import { PostProps, SessionType } from "@/common.types";
import Advertisements from "@/components/Advertisements";
import CreatePostModal from "@/components/CreatePostModal";
import MiniProfileCard from "@/components/MiniProfileCard";
import MiniSearch from "@/components/MiniSearch";
import Navbar from "@/components/Navbar";
import PageLoader from "@/components/loader/PageLoader";
import Posts from "@/components/Posts";
import RecentNotifications from "@/components/RecentNotifications";
import SuggestedPeople from "@/components/SuggestedPeople";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const Feed = () => {
  const [openModal, setOpenModal] = useState(false);
  const [postToEdit, setPostToEdit] = useState<PostProps | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [session, setSession] = useState<SessionType | null>(null);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { status, data } = useSession();

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/create-post");
      const data = await response.json();
      console.log(data);
      setPosts(data.posts);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setSession(data);
  }, []);
  useEffect(() => {
    fetchPosts();
  }, [isEditing]);

  if (status === "loading") {
    return <PageLoader />
  }

  return (
    <>
      <Navbar setOpenModal={setOpenModal} session={data} />
      {openModal && (
        <CreatePostModal
          setPostToEdit={setPostToEdit}
          postToEdit={postToEdit}
          session={session}
          setOpenModal={setOpenModal}
          fetchPosts={fetchPosts}
          setIsEditing={setIsEditing}
        />
      )}
      <section className='gap-3 bg-background_color grid grid-cols-1  lg:grid-cols-12'>
        <div className='col-span-3 '>
          <MiniProfileCard session={session} />
          <SuggestedPeople />
        </div>
        <div className='col-span-6 mx-auto px-10 sm:px-20  lg:px-3 w-full'>
          <MiniSearch session={session} />
          <Posts
            session={data}
            setIsEditing={setIsEditing}
            isEditing={isEditing}
            isLoading={isLoading}
            posts={posts}
            fetchPosts={fetchPosts}
            setPostToEdit={setPostToEdit}
            setOpenModal={setOpenModal}
          />
        </div>
        <div className='col-span-3'>
          <RecentNotifications />
          <Advertisements />
        </div>
      </section>
    </>
  );
};

export default Feed;
