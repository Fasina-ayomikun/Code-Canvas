"use client";
import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import { PostProps, SessionType } from "@/common.types";
import MiniLoader from "./loader/MiniLoader";
const Posts = ({
  setOpenModal,
  setPostToEdit,
  isEditing,
  setIsEditing,
  isLoading,
  fetchPosts,
  posts,
}: {
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  fetchPosts: () => void;
  isLoading: boolean;
  posts: PostProps[];
  isEditing: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setPostToEdit: React.Dispatch<React.SetStateAction<PostProps | null>>;
}) => {
  if (isLoading) {
    //TODO:Add Custom loading
    return <MiniLoader width='30' />;
  }

  return (
    <section>
      {posts?.length === 0 ? (
        <p className='font-medium text-xl text-center mt-10'>No post</p>
      ) : (
        posts?.map((post, index) => {
          return (
            <PostCard
              fetchPosts={fetchPosts}
              setOpenModal={setOpenModal}
              setPostToEdit={setPostToEdit}
              key={index}
              post={post}
              setIsEditing={setIsEditing}
            />
          );
        })
      )}
    </section>
  );
};

export default Posts;
