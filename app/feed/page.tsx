"use client";
import Advertisements from "@/components/Advertisements";
import CreatePostModal from "@/components/CreatePostModal";
import MiniProfileCard from "@/components/MiniProfileCard";
import MiniSearch from "@/components/MiniSearch";
import Navbar from "@/components/Navbar";
import Posts from "@/components/Posts";
import RecentNotifications from "@/components/RecentNotifications";
import SuggestedPeople from "@/components/SuggestedPeople";
import React, { useState } from "react";

const Feed = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <Navbar setOpenModal={setOpenModal} />
      {openModal && <CreatePostModal setOpenModal={setOpenModal} />}
      <section className='gap-3 bg-background_color grid grid-cols-1  lg:grid-cols-12'>
        <div className='col-span-3'>
          <MiniProfileCard />
          <SuggestedPeople />
        </div>
        <div className='col-span-6 mx-auto px-10 sm:px-20  lg:px-3'>
          <MiniSearch />
          <Posts />
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
