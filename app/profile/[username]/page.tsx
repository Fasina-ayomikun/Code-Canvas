"use client";
import React, { useEffect, useLayoutEffect } from 'react';
import Header from '@/components/profile/Header';
import About from '@/components/profile/About';
import Followers from '@/components/profile/Followers';
import Posts from '@/components/Posts';
import { useSession } from 'next-auth/react';
import useAuth from '@/hooks/useAuth';
import { setIsLoggedInUser, setSessionUserDetails } from '@/redux/slices/profile';
import { useDispatch, useSelector } from 'react-redux';
import usePost from '@/hooks/usePost';

function Profile({ params }:{ params: { username: string} }) {

    const { data, status} = useSession();
    const { getUserDetails } = useAuth();
    const { fetchUserPost } = usePost();
    const dispatch = useDispatch();
    const { userDetails } = useSelector((state: any) => state.profile);
    const { posts } = useSelector((state: any) => state.post);
    const { isLoading } = useSelector((state: any) => state.loading);

    console.log(posts)

    useLayoutEffect(() => {
        console.log(status);
        if (status === "loading") return;
        dispatch(setSessionUserDetails(data));

        if (data && ((data as any)?.id === userDetails._id)) {
            dispatch(setIsLoggedInUser(true));
        }
    }, [data, status, userDetails])

    useLayoutEffect(() => {
        if (!userDetails._id) return;
        fetchUserPost({ userId: userDetails._id })
    }, [userDetails._id])

    useEffect(() => {
        getUserDetails({ username: params.username });
    }, []);

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