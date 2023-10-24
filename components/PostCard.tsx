"use client";
import { PostCardProps, PostProps } from "@/common.types";
import Image from "next/image";
import React, { useState } from "react";
import Toggle from "./Toggle";
import moment from "moment";
type userProp = {};

const PostCard = ({
  setPostToEdit,
  setIsEditing,
  fetchPosts,
  setOpenModal,
  post,
}: PostCardProps) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const {
    user,
    desc,
    updatedAt,
    createdAt,
    noOfComments,
    noOfLikes,
    image,
    tags,
  } = post;
  const dropDownContent = [
    {
      title: "Edit Post",
      handleClick: () => {
        setOpenModal(true);
        setPostToEdit(post);
        setIsEditing(true);
      },
    },
    {
      title: "Delete Post",
      handleClick: async () => {
        const response = await fetch(`/api/create-post/${post?._id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          console.log("deleted");
          fetchPosts();
        }
      },
    },
  ];
  return (
    <div className='px-5 box_shadow2  w-full mx-auto my-10 py-3 bg-white'>
      <div className='flex items-center gap-2  justify-between'>
        <div className='flex px-4 items-start gap-2 py-3 '>
          <Image
            src={user?.image}
            alt='profile'
            width={40}
            height={40}
            className=' aspect-square object-fill rounded-full'
          />
          <div>
            <h4 className='gap-2 text-sm font-semibold '>{user?.name}</h4>
            <p className='text-gray-700  text-xs font-sans lowercase'>
              {moment(createdAt).format("hh:mm a")}
              <span className='text-xs italic ml-2 font-regular text-gray-600 underline'>
                {createdAt < updatedAt ? "Edited" : ""}
              </span>
            </p>
          </div>
        </div>
        <div className='relative'>
          <div
            className=''
            id='dropdown-button'
            onClick={() => setIsDropDownOpen((prev) => !prev)}
          >
            <div className='h-[1px] rounded-full bg-dark-gray w-4 hover:bg-link-blue my-1'></div>
            <div className='h-[1px] rounded-full bg-dark-gray w-4 hover:bg-link-blue hover:duration-200 hover:skew-x-2 my-1'></div>
            <div className='h-[1px] rounded-full bg-dark-gray w-4 hover:bg-link-blue hover:duration-200 hover:skew-x-2 my-1'></div>
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
        {image && (
          <Image
            src={image}
            alt='post'
            width={1600}
            height={900}
            layout='responsive'
            className=' object-cover h-fit'
          />
        )}
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
