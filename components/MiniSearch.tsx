"use client";
import React, { useEffect, useState } from "react";
import CustomInput from "./CustomInput";
import Image from "next/image";
import { SessionType } from "@/common.types";
import { getSession } from "next-auth/react";

const MiniSearch = ({ session }: { session: SessionType | null }) => {
  const [text, setText] = useState("");

  return (
    <section className='flex items-center gap-5 px-5 box_shadow2  w-full mx-auto my-10 py-2 bg-white'>
      {session?.image && (
        <Image
          src={session?.image}
          alt='profile'
          width={60}
          height={60}
          className=' aspect-square object-fill  rounded-full'
        />
      )}
      <div
        className={`bg-transparent  h-12 border-gray-300 rounded-full w-full flex justify-between px-3 my-4 border-[1px] relative  `}
      >
        <input
          type='text'
          id=''
          className={`text-sm  w-full focus:outline-none h-full 
border-0 px-3 py-1 bg-transparent`}
          placeholder='Share your thoughts...'
        />{" "}
      </div>
    </section>
  );
};

export default MiniSearch;
