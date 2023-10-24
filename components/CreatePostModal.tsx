"use client";
import { handleSession } from "@/app/lib/actions";
import { SessionType } from "@/common.types";
import { getSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import CustomButton from "./CustomButton";

const CreatePostModal = ({
  setOpenModal,
}: {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [session, setSession] = useState<SessionType | null>(null);
  const handleSession = async () => {
    const session = await getSession();
    setSession(session);
  };
  useEffect(() => {
    handleSession();
  }, []);
  return (
    <section className=' fixed top-0 right-0 h-full bg-black/60 flex items-center w-screen z-40 '>
      <div className='mx-auto w-1/2 min-h-fit py-3 px-4 bg-white  rounded-md'>
        <div className='flex items-center px-3 gap-3 justify-between'>
          <div className='flex px-4 items-start gap-2 py-3 '>
            {session?.image && (
              <Image
                src={session?.image}
                alt='profile'
                width={40}
                height={40}
                className=' aspect-square object-fill rounded-full min-w-min'
              />
            )}
            <div>
              <h4 className='text-sm font-semibold '>{session?.name}</h4>
              <p className='text-gray-700  text-xs font-sans lowercase'>5h</p>
            </div>
          </div>
          <Image
            src='/close.svg'
            alt='X'
            onClick={() => setOpenModal(false)}
            width={15}
            height={15}
          />
        </div>
        <textarea
          className='w-full bg-gray-100 text-dark-gray rounded-md min-h-[200px] focus:outline-none text-sm py-2 px-3 my-3 h-fit'
          placeholder='Share your thoughts..'
        ></textarea>
        <textarea
          className='w-full bg-gray-100 text-link-blue rounded-md min-h-[50px] focus:outline-none text-sm py-2 px-3 my-3 h-fit'
          placeholder='Tags e.g #java#python'
        ></textarea>
        <div className='py-5 flex items-center justify-between gap-2 px-2'>
          <div className='flex items-center gap-2'>
            <Image src='/image.svg' alt='Choose Image' width={25} height={25} />
            <p className='text-sm'>Choose Image</p>
          </div>
          <CustomButton
            text='Post'
            handleClick={() => {}}
            styles='bg-link-blue text-white font-semibold w-28 rounded-full'
          />
        </div>
      </div>
    </section>
  );
};

export default CreatePostModal;
