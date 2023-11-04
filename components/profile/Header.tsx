"use client";
import useFollow from "@/hooks/useFollow";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiTwotoneEdit } from "react-icons/ai";
import { BsFillChatDotsFill } from "react-icons/bs";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdDoneOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import MiniLoader from "../loader/MiniLoader";
import { setIsFollowing } from "@/redux/slices/profile";

function Header() {
  const { isLoggedInUser, userDetails, sessionUserData, isFollowing, follow } = useSelector(
    (state: any) => state.profile
  );

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const { toggleFollow } = useFollow();

  const handleFollow = async () => {
    setIsLoading(true);
    
    if (isFollowing) {
      dispatch(setIsFollowing(false));
    } else {
      dispatch(setIsFollowing(true));
    }
    // console.log(isLoggedInUser, userDetails, sessionUserData);
    try {
      await toggleFollow({ followerId: sessionUserData.id, followingId: userDetails._id})
    } catch (error) {
      console.log(error);
      dispatch(setIsFollowing(false));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className='bg-white h-[480px] shadow-md pb-10'>
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
        <div className='bg-white relative w-[180px] h-[180px] rounded-full flex justify-center items-center object-cover'>
          <Image
            className='rounded-full w-full h-full'
            src={userDetails?.image}
            alt='profile picture'
            width={170}
            height={170}
            objectFit='cover'
          />
        </div>

        <div className="ml-3 relative top-5">
          <div className="mt-20 mb-2">
            <h2 className='text-4xl font-bold mb-2'>{userDetails.name}</h2>
            <span className="text-gray-500 text-base font-bold">@{userDetails.username}</span>
          </div>
          <div className='flex justify-center items-center gap-2'>
            <p className='text-sm text-gray-600 cursor-pointer'>
              {follow.follower?.length} follower{follow.follower?.length > 1 ? 's' : ''}
            </p>
            <p className='rounded-full bg-gray-600 w-[6px] h-[6px]' />
            <p className='text-sm text-gray-600 cursor-pointer'>
              {follow.following?.length} following
            </p>
          </div>
        </div>
      </div>

      {isLoggedInUser ? (
        <Link
          href={`/update-profile/${userDetails._id}`}
          className='w-4/5 m-auto flex justify-end items-center -translate-y-20 cursor-pointer'
        >
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

          {
            isLoading ? (
              <div className="bg-blue-600 w-28 rounded-md py-[10px]">
                <MiniLoader width="20" strokeColor="white" />
              </div>
            ) : (
              <button
                disabled={isLoading}
                onClick={handleFollow}
                className='bg-blue-600 text-white rounded-md p-2 px-3 flex justify-center items-center gap-2 cursor-pointer'>
                {
                  isFollowing ? (
                    <>
                      <MdDoneOutline size={20} color='white' />
                      <p>Following</p>
                    </>
                  ) : (
                    <>
                      <IoIosAddCircleOutline size={20} color='white' />
                      <p>Follow</p>
                    </>
                  )
                }
          </button>
            )
          }

        </div>
      )}
    </div>
  );
}

export default Header;
