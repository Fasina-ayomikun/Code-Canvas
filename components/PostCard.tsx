"use client";
import { PostCardProps, PostProps } from "@/common.types";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Toggle from "./Toggle";
type ProfileProp = {};

const PostCard = ({ post }: PostCardProps) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const { profile, desc, noOfComments, noOfLikes, imageUrl, tags } = post;
  const dropDownContent = [
    { title: "Edit Post", handleClick: () => {} },
    { title: "Delete Post", handleClick: () => {} },
    // { title: "Edit Post", handleClick: () => {} },
  ];

  // the drop down should disappear when user clicks outside the modal
  useEffect(() => {

    const disableDropdown = (e: Event) => {
      if (!(e.target as HTMLElement).classList.contains("drop-down")) {
        setIsDropDownOpen(false);
      }
    }

    document.addEventListener("click", disableDropdown);

    return () => {
      document.removeEventListener("click", disableDropdown);
    }
  }, [])

  return (
    <div className='px-5 box_shadow2  w-full mx-auto my-10 py-3 rounded-md bg-white'>
      <div className='flex items-center gap-2  justify-between'>
        <div className='flex px-4 items-start gap-2 py-3 '>
          <Image
            //TODO:change imageUrl to image
            src={profile?.imageUrl}
            alt='profile'
            width={40}
            height={40}
            className=' aspect-square object-cover rounded-full'
          />
          <div>
            <h4 className='text-sm font-semibold '>{profile?.name}</h4>
            <p className='text-gray-700  text-xs font-sans lowercase'>5h</p>
          </div>
        </div>
        <div className='relative'>
          <div
            className='drop-down cursor-pointer'
            id='dropdown-button'
            onClick={() => setIsDropDownOpen((prev) => !prev)}
          >
            <div className='h-[1px] drop-down rounded-full bg-dark-gray w-4 hover:bg-link-blue my-1'></div>
            <div className='h-[1px] drop-down rounded-full bg-dark-gray w-4 hover:bg-link-blue hover:duration-200 hover:skew-x-2 my-1'></div>
            <div className='h-[1px] drop-down rounded-full bg-dark-gray w-4 hover:bg-link-blue hover:duration-200 hover:skew-x-2 my-1'></div>
          </div>
          <Toggle
            isDropDownOpen={isDropDownOpen}
            dropDownContent={dropDownContent}
          />
        </div>
      </div>
      <p className='text-sm py-3 text-dark-gray'>{desc}</p>
      <div className='relative w-full '>
        <p className='text-sm text-link-blue mb-3'>
          {tags.map((tag, index) => (
            <span key={index}>#{tag} </span>
          ))}
        </p>
        <Image
          src={imageUrl}
          alt='post'
          width={1600}
          height={900}
          layout='responsive'
          className=' object-contain h-fit'
        />
      </div>
      <div className='py-4 pt-3 flex items-center justify-between gap-3'>
        <div className='flex items-center gap-2'>
          <Image
            src={`${isLiked ? "/like-filled.svg" : "/like.svg"}`}
            alt=''
            width={20}
            height={20}
            onClick={() => setIsLiked((prev) => !prev)}
            className='object-contain'
          />
          {/* TODO:Makesure the likes exclude you */}
          <p className='text-sm '>You and {noOfLikes} others liked this</p>
        </div>
        <div className='flex items-center gap-2'>
          <Image
            src='/comment.svg'
            alt=''
            width={20}
            height={20}
            className='object-contain'
          />
          <p className='text-sm'>{noOfComments} Comments</p>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
