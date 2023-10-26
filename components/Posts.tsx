"use client";
import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import { PostProps, SessionType } from "@/common.types";
const Posts = ({
  setOpenModal,
  setPostToEdit,
  isEditing,
  setIsEditing,
  isLoading,
  fetchPosts,
  posts,
  session,
}: {
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  fetchPosts: () => void;
  isLoading: boolean;
  posts: PostProps[];
  isEditing: boolean;
  session: SessionType | null;
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
            postId={post?._id}
            session={session}
            setIsEditing={setIsEditing}
          />
        );
      })}
    </section>
  );
};

export default Posts;
