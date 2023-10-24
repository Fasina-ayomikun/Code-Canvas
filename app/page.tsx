"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import { useRouter } from "next/navigation";
import { useSession, signIn, getProviders } from "next-auth/react";
import { toast } from "react-hot-toast";

const Home = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [providers, setProviders] = useState({});
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      if (!email && !password) {
        return toast.error("All credentials are required");
      }

      const response = await signIn("credentials", {
        callbackUrl: "/feed",
        email,
        password,
      });

      console.log(response);
    } catch (error) {
      console.log(error);
      toast.error((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className='bg-background  flex justify-center items-center gap-3  h-full sm:h-screen w-screen '>
      <div className='relative hidden md:block w-full h-full'>
        <Image src='/hero1.jpg' alt='Lady' fill className='  object-cover' />
      </div>
      <div className='w-full px-12 pt-10'>
        <form onSubmit={handleSubmit}>
          <h3 className="font-['Dancing_Script'] font-black text-4xl text-center mb-10">
            Code Canvas
          </h3>
          <div className='w-full h-full'>
            <CustomInput
              styles='bg-transparent  h-12 border-gray-300 rounded-sm'
              type='email'
              isPassword={false}
              setValue={setEmail}
            />
            <CustomInput
              styles='bg-transparent  h-12 border-gray-300 rounded-sm'
              type='password'
              showPassword={showPassword}
              isPassword={true}
              setValue={setPassword}
              setShowPassword={setShowPassword}
            />
            <p className='text-xs text-end text-gray-600'>Forgot password?</p>

            <CustomButton
              text='Log in'
              isLoading={isLoading}
              handleClick={() => {}}
              btnType='submit'
              styles='bg-blue-500 text-white'
            />
          </div>
          <div className='flex items-center px-4 justify-center gap-4 my-6'>
            <hr className='w-full' />
            <span className='font-regular text-gray-600'>OR</span>
            <hr className='w-full' />
          </div>

          <CustomButton
            handleClick={() => signIn("google")}
            text='Log in with Google'
            styles='text-red-600 bg-transparent border-[2px] border-red-400 text-red-500 gap-2'
            iconSrc='/google.svg'
          />
          <CustomButton
            handleClick={() => signIn("github")}
            text='Log in with Github'
            styles=' bg-black border-[2px] border-black text-white gap-2'
            iconSrc='/github.svg'
          />
        </form>
        <p className='text-center  text-sm mt-6'>
          Don't have an account?{" "}
          <Link href='/sign-up' className='text-blue-700'>
            Sign up
          </Link>
        </p>
      </div>
      <div className='relative w-full h-full hidden md:block'>
        <Image src='/hero2.jpg' alt='Sign' fill className='object-cover' />
      </div>
    </section>
  );
};

export default Home;
