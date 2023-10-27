"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import CustomInput from "./CustomInput";
import Link from "next/link";
import Toggle from "./Toggle";
import { getSession, signOut, useSession } from "next-auth/react";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { SessionType } from "@/common.types";
import { useRouter } from "next/navigation";
import CustomButton from "./CustomButton";

const Navbar = ({
  setOpenModal,
}: {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [searchText, setSearchText] = useState("");
  const [isFixed, setIsFixed] = useState(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [session, setSession] = useState<SessionType | null>(null);
  const router = useRouter();
  //TODO:Put ina separate file
  const dropDownContent = [
    {
      title: "Create Post",
      handleClick: () => {
        setOpenModal(true);
      },
    },
    {
      title: "Profile",
      handleClick: () => {
        router.push(`/profile/${session?.username}`);
      },
    },
    {
      title: "Sign Out",
      handleClick: () => {
        signOut({ callbackUrl: "http://localhost:3000" });
      },
    },
  ];

  //TODO:Put in another fil

  const navLinks = [
    {
      title: "Home",
      url: "/feed",
      iconUrl: "/home.svg",
    },
    {
      title: "Messages",
      url: "/messages",
      iconUrl: "/message.svg",
    },
    {
      title: "Notifications",
      url: "/notifications",
      iconUrl: "/notice.svg",
    },
  ];
  const handleSession = async () => {
    const data = await getSession();
    if (data) {
      setSession(data);
    }
  };
  useEffect(() => {
    handleSession();
    console.log(session);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <nav
      className={`bg-white box_shadow1 px-6 ${
        isFixed ? "fixed z-30 top-0 left-0 right-0" : "relative"
      } `}
    >
      <div className='flex sm:grid sm:grid-cols-10 gap-5 items-center justify-between'>
        <div className='sm:col-span-2  sm:w-full '>
          <Image
            src={"/magnifying-glass.svg"}
            alt='Show'
            width={20}
            height={20}
            className='sm:hidden block'
          />
          <CustomInput
            showIcon={true}
            setValue={setSearchText}
            isPassword={false}
            styles='bg-gray-200 h-10 hidden sm:flex'
          />
        </div>

        <div className='flex items-center justify-center gap-3 sm:gap-7 col-span-6 '>
          {navLinks.map(({ title, url, iconUrl }, index) => {
            return (
              <div
                key={index}
                className='py-6 px-2 hover:bg-link-blue ease-in duration-200 text-dark-gray hover:text-white flex item-center gap-2'
              >
                <Link
                  href={url}
                  className='font-bold hidden xs:block text-inherit text-sm'
                >
                  {title}
                </Link>
                <Image src={iconUrl} alt={title} width={20} height={20} />
              </div>
            );
          })}
        </div>
        {session ? (
          <div className='relative sm:col-span-2 flex items-center gap-2 '>
            {session?.image && (
              <Image
                src={session?.image}
                alt='profile'
                width={40}
                height={40}
                onClick={() => setIsDropDownOpen((prev) => !prev)}
                className=' aspect-square object-fill rounded-full min-w-min'
              />
            )}
            <p className='font-bold text-dark-gray hidden sm:block text-xs'>
              {session?.name}
            </p>
            <Toggle
              isDropDownOpen={isDropDownOpen}
              dropDownContent={dropDownContent}
            />
          </div>
        ) : (
          <CustomButton
            text='Log In'
            styles='bg-transparent  text-link-blue mt-0  duration-300 ease-in underline hover:text-dark-gray'
            handleClick={() => router.push("/")}
          />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
