"use client";
import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import { PostProps } from "@/common.types";
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
    return <div>Loading...</div>;
  }
  return (
    <section>
      {posts?.map((post, index) => {
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
      })}
    </section>
  );
};

export default Posts;
