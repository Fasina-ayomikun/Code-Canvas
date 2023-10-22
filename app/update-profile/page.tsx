"use client";
import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";

const UpdateProfile = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [bio, setBio] = useState("");
  const [tagText, setTagText] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  const fileRef = useRef<HTMLInputElement>(null);

  const handleTags = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTagText(value);
    if (value.includes(",")) {
      if (tags.length < 6) {
        if (!tags.includes(value.replace(",", ""))) {
          setTags([...tags, value.replace(",", "")]);
        } else {
          //TODO:USe toastify later
          alert("Tag already exists");
        }
      } else {
        //TODO:USe toastify later and modify response
        alert("Tags input complete");
      }
      setTagText("");
    }
  };
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const reader = new FileReader();
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;
    if (!selectedFile.type.includes("image")) {
      alert("Please upload an image");
      return;
    }

    reader.onload = () => {
      const result = reader.result as string;

      setPreview(result);
    };
    reader.onerror = (errorEvent) => {
      console.error("Error reading file:", errorEvent);
    };

    reader.readAsDataURL(selectedFile);
  };
  return (
    <section className='bg-background  mx-auto  h-full sm:h-screen w-1/2  '>
      <div className='w-full px-12 pt-10'>
        <form onSubmit={() => {}}>
          <h3 className="font-['Dancing_Script'] font-black text-4xl text-center mb-10">
            Code Canvas
          </h3>
          <div className='mx-auto aspect-square w-32 rounded-full bg-gray-200  flex  items-center justify-center'>
            <div
              className='relative w-24  aspect-square '
              onClick={() => {
                if (fileRef) {
                  fileRef?.current?.click();
                }
              }}
            >
              <Image
                src={preview ? preview : "/user.svg"}
                alt='profile'
                fill
                className='object-contain '
              />
              <input
                type='file'
                ref={fileRef}
                onChange={handleFileUpload}
                className='hidden'
              />
            </div>
          </div>
          <h2 className='text-center font-semibold my-5 text-lg'>
            Profile Picture
          </h2>
          <div className='flex items-center my-4 gap-2'>
            <p className='text-md font-medium '>Upload a banner image:</p>
            <input type='file' name='profile-pic' id='' />
          </div>
          <div className='w-full h-full'>
            <CustomInput
              styles='bg-transparent  h-12 border-gray-300 rounded-sm'
              type='bio'
              isPassword={false}
              setValue={setBio}
            />
            <div
              className={`bg-transparent  py-2 h-full border-gray-300 rounded-sm w-full flex flex-col  justify-between px-3 my-4 border-[1px] relative  `}
            >
              <div className='flex items-center gap-2 px-2 flex-wrap'>
                {tags.map((tag, index) => (
                  <p
                    key={index}
                    className='flex items-center gap-1 text-sm  border-[1px] px-2 py-1 text-dark-gray lowercase rounded-sm flex-wrap'
                  >
                    {tag}
                    <Image
                      src='/close.svg'
                      alt='X'
                      onClick={() => {
                        const newTags = tags.filter(
                          (t) => t.toLowerCase() !== tag.toLowerCase()
                        );
                        setTags(newTags);
                      }}
                      width={10}
                      height={10}
                      className='object-contain text-gray-800'
                    />
                  </p>
                ))}
              </div>
              <input
                type='text'
                id=''
                value={tagText}
                onChange={handleTags}
                className={`text-sm  w-full focus:outline-none h-10 border-0 px-3 py-1 bg-transparent`}
                placeholder='Enter your interests (e.g javascript,html)'
              />{" "}
            </div>
            <p className='text-xs text-end text-gray-600'>Forgot password?</p>

            <CustomButton
              text='Update Profile'
              isLoading={isLoading}
              handleClick={() => {}}
              btnType='submit'
              styles='bg-blue-500 text-white'
            />
          </div>
        </form>
      </div>
    </section>
  );
};

export default UpdateProfile;
