"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  function isValidEmail(email: string) {
    const regrex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regrex.test(email);
  }
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (email && fullName && password && username) {
        if (isValidEmail(email)) {
          const response = await fetch("/api/auth/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify({
              name: fullName,
              email: email,
              username: username,
              password: password,
              loggedInWithPassword: true,
            }),
          });

          if (response.ok) {
            router.push("/");
          }
        } else {
          alert("Provide a valid email");
        }
      } else {
        alert("Provide all credentials");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section className='bg-background pb-10 overflow-x-hidden flex justify-center items-center   h-full  w-screen '>
      <div className='w-full mx-auto max-w-lg px-10 pt-10'>
        <form onSubmit={handleSubmit}>
          <h3 className="font-['Dancing_Script'] font-black text-4xl text-center mb-10">
            Code Canvas
          </h3>
          <div className='w-full h-full'>
            <CustomInput
              styles='bg-transparent  h-12 border-gray-300 rounded-sm'
              type='full name'
              isPassword={false}
              setValue={setFullName}
            />
            <CustomInput
              styles='bg-transparent  h-12 border-gray-300 rounded-sm'
              type='username'
              isPassword={false}
              setValue={setUsername}
            />
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
              isLoading={isLoading}
              text='Sign Up'
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
            text='Sign up with Google'
            styles='text-red-600 bg-transparent border-[2px] border-red-400 text-red-500 gap-2'
            iconSrc='/google.svg'
          />
          <CustomButton
            handleClick={() => signIn("github")}
            text='Sign up with Github'
            styles=' bg-black border-[2px] border-black text-white gap-2'
            iconSrc='/github.svg'
          />
        </form>
        <p className='text-center  text-sm mt-6'>
          Already have an account?{" "}
          <Link href='/' className='text-blue-700'>
            Log in
          </Link>
        </p>
      </div>
    </section>
  );
};

export default SignUp;
