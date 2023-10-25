"use client";
import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { uploadImage } from "../../lib/actions";
import { useRouter } from "next/navigation";
import { SessionType } from "@/common.types";
import { getSession } from "next-auth/react";
import { BsFillCameraFill } from "react-icons/bs";

const UpdateProfile = ({ params }: { params: { id: string } }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [bio, setBio] = useState("");
  const [tagText, setTagText] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [image, setImage] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [preview, setPreview] = useState("");
  const [session, setSession] = useState<SessionType | null>(null);
  const router = useRouter();

  const handleSession = async () => {
    const response = await getSession();

    session && setSession(response);
  };
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

    reader.onload = async () => {
      const result = reader.result as string;

      setPreview(result);
      const response = await uploadImage(result);
      const data = await response?.json();
      response && setImage(data?.url);
    };
    reader.onerror = (errorEvent) => {
      console.error("Error reading file:", errorEvent);
    };

    reader.readAsDataURL(selectedFile);
  };

  const handleBannerImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    e.preventDefault();

    const reader = new FileReader();
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;
    if (!selectedFile.type.includes("image")) {
      alert("Please upload an image");
      return;
    }

    reader.onload = async () => {
      const result = reader.result as string;

      const response = await uploadImage(result);
      const data = await response?.json();
      data && setBannerImage(data?.url);
    };
    reader.onerror = (errorEvent) => {
      console.error("Error reading file:", errorEvent);
    };

    reader.readAsDataURL(selectedFile);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`/api/auth/update-profile/${params.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          bio: bio || session?.bio,
          tags: tags || session?.tags,
          bannerImage: bannerImage || session?.bannerImage,
          image: image || session?.image,
        }),
      });
      console.log(response);
      if (response.ok) {
        router.push("/feed");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    handleSession();
  }, []);
  return (
    <section className='bg-background  mx-auto  h-full sm:h-screen w-1/2  '>
      <div className='w-full px-12 pt-10'>
        <form onSubmit={handleSubmit}>
          <h3 className="font-['Dancing_Script'] font-black text-4xl text-center mb-10">
            Code Canvas
          </h3>
          <div className='mx-auto aspect-square w-32 rounded-full bg-gray-200  flex  items-center justify-center'>
            <div className='relative w-24  aspect-square cursor-pointer'>
              <p className='absolute -left-4 z-50'>
                <BsFillCameraFill size={24} />
              </p>
              {/* FIXME:Show default image */}
              <label htmlFor='file' className='cursor-pointer'>
                {session?.image ? (
                  <Image
                    src={session?.image}
                    alt='profile'
                    fill
                    className='object-contain '
                  />
                ) : (
                  <Image
                    src={preview ? preview : "/user.svg"}
                    alt='profile'
                    fill
                    className='object-contain '
                  />
                )}
              </label>
              <input
                type='file'
                id='file'
                onChange={handleFileUpload}
                className='hidden'
                accept='image/*'
              />
            </div>
          </div>
          <h2 className='text-center font-semibold my-5 text-lg'>
            Add Profile Picture
          </h2>

          <div className='mb-2'>
            <label
              htmlFor='banner-file'
              className='flex items-center justify-center gap-2 cursor-pointer'
            >
              <Image
                src='/addAvatar.png'
                alt='Add avatar'
                width={30}
                height={30}
              />
              <p>Upload a banner image</p>
            </label>
            <input
              className='hidden'
              type='file'
              id='banner-file'
              onChange={handleBannerImageUpload}
              accept='image/*'
            />
          </div>

          <div className='w-full h-full'>
            <CustomInput
              styles='bg-transparent  h-12 border-gray-300 rounded-sm'
              type='bio'
              value={session?.bio}
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

            <CustomButton
              text='Update Profile'
              isLoading={isLoading}
              handleClick={() => {}}
              btnType='submit'
              styles='w-full mt-5 rounded-md bg-blue-500 text-white'
            />
          </div>
        </form>
      </div>
    </section>
  );
};

export default UpdateProfile;
