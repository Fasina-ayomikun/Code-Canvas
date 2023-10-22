"use client";
import { SessionType } from "@/common.types";
import { getSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const MiniProfileCard = () => {
  const [session, setSession] = useState<SessionType | null>(null);
  const handleSession = async () => {
    const session = await getSession();
    if (session) {
      setSession(session);
    }
    console.log(session);
  };
  useEffect(() => {
    handleSession();
  }, []);
  return (
    <section className='hidden lg:block box_shadow2  w-4/5 mx-auto my-10 bg-white'>
      <div className='relative w-full h-32 '>
        <Image src='/hero1.jpg' alt='' fill className='object-cover' />
      </div>
      <div className='z-6 px-4 pb-2 -translate-y-14'>
        {session?.image && (
          <Image
            src={session?.image}
            alt=''
            width={100}
            height={100}
            className='rounded-full object-cover aspect-square mx-auto -scroll border-4 border-white'
          />
        )}
        <h3 className='font-bold  capitalize text-center my-2 '>
          {session?.name}
        </h3>
        <p className='text-xs leading-4 text-dark-gray -tracking-3 text-center'>
          {session?.bio}
        </p>
      </div>
    </section>
  );
};

export default MiniProfileCard;
