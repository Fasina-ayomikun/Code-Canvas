"use client";
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { AiTwotoneEdit, BsFillChatDotsFill, IoAddOutline } from "react-icons/all";
import { useSelector } from 'react-redux';

function Header() {

    const { isLoggedInUser, userDetails, sessionUserData } = useSelector((state: any) => state.profile);
    // console.log(isLoggedInUser, userDetails, sessionUserData);

    useEffect(() => {

    }, []);

    return (
        <div className='bg-white h-[450px] shadow-md pb-10'>
          {/* Banner Image Layout */}
          <div className='w-4/5 h-[300px] relative m-auto'>
              <Image 
                  src={userDetails.bannerImage} 
                  alt='banner' 
                  layout='fill' 
                  className='rounded-b-md'
                  // objectFit='cover'
              />
          </div>

          {/* Profile Image Layout */}
          <div className='relative left-40 -top-[90px] flex items-end'>
              <div className='bg-white relative w-[180px] h-[180px] rounded-full flex justify-center items-center'>
                  <Image 
                      className='rounded-full'
                      src={userDetails.image} 
                      alt='profile picture'
                      width={170} 
                      height={170}
                      objectFit='cover'
                  />
              </div>

              <div>
                  <h2 className='text-4xl font-bold mb-2'>{userDetails.username}</h2>
                  <div className='flex justify-center items-center gap-2'>
                      <p className='text-sm text-gray-600 cursor-pointer'>4.1k followers</p>
                      <p className='rounded-full bg-gray-600 w-[6px] h-[6px]' />
                      <p className='text-sm text-gray-600 cursor-pointer'>4.1k following</p>
                  </div>
              </div>
          </div>

          {
            isLoggedInUser ? (
                <Link href="/update-profile/2" className='w-4/5 m-auto flex justify-end items-center -translate-y-20 cursor-pointer'>
                    <div className='bg-gray-300 rounded-md p-2 px-3 flex justify-center items-center gap-2'>
                        <AiTwotoneEdit />
                        <p>Edit Profile</p>
                    </div>
                </Link>
            ) : (
                <div className='w-4/5 m-auto flex items-center justify-end gap-2 -translate-y-20'>
                    <div className='bg-gray-300 rounded-md p-2 px-3 flex justify-center items-center gap-2 cursor-pointer'>
                        <BsFillChatDotsFill />
                        <p>Message</p>
                    </div>
                    
                    <div className='bg-blue-600 text-white rounded-md p-2 px-3 flex justify-center items-center gap-2 cursor-pointer'>
                        <IoAddOutline size={20} color="white" />
                        <p>Follow</p>
                    </div>
                </div>
            )
          }
        </div>
  );
}

export default Header;
