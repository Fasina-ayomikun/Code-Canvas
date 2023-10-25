"use client";
import React from 'react';
import Header from '@/components/profile/Header';
import About from '@/components/profile/About';
import Followers from '@/components/profile/Followers';
import Posts from '@/components/Posts';

function Profile() {
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
                        isLoading
                        posts={[]}
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