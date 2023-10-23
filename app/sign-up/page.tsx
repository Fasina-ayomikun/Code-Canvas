"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { toast } from "react-hot-toast";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import convertToBase64 from "@/utils/convertToBase64";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function isValidEmail(email: string) {
    const regrex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regrex.test(email);
  }
  const router = useRouter();

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    try {
      const file = e.target.files[0];
      const base64 = await convertToBase64(file) as string;
      setImage(base64);
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!email && !fullName && !password && !username) {
        return toast.error("All credentials are required");
      }

      if (!isValidEmail(email)) {
        return toast.error("Provide a valid email");
      }

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
          image
        }),
      });

      const json = await response.json();

      if (response.ok) {
        router.push("/");
      }

      if (!response.ok) {
        console.log(json)
        toast.error(json);
      }
    } catch (error) {
      toast.error((error as Error).message);
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

            <div className="mb-2">
              <label htmlFor="file" className="flex items-center justify-center gap-2 cursor-pointer">
                <Image
                  src="/addAvatar.png" 
                  alt="Add avatar"
                  width={30}
                  height={30}
                />
                <p>Add an avatar (optional)</p>
              </label>
              <input 
                className="hidden"
                type="file" id="file" 
                accept="image/*" 
                onChange={(e) => handleChange(e)}
              />

              {
                image && (
                  <div className="flex justify-center items-center m-2">
                    <p className="flex items-center gap-3">
                      <span className="text-sm">Preview:</span>
                      <Image src={image} alt="image" width={60} height={60} />
                    </p>
                  </div>
                )
              }
            </div>

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
