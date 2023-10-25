"use client";
import { handleSession, uploadImage } from "@/app/lib/actions";
import { PostProps, SessionType } from "@/common.types";
import { getSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import CustomButton from "./CustomButton";
import convertToBase64 from "@/utils/convertToBase64";
import toast from "react-hot-toast";

const CreatePostModal = ({
  setOpenModal,
  session,
  postToEdit,
  setIsEditing,
  fetchPosts,
  setPostToEdit,
}: {
  setPostToEdit: React.Dispatch<React.SetStateAction<PostProps | null>>;
  postToEdit: PostProps | null;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  session: SessionType | null;
  fetchPosts: () => void;
}) => {
  const [form, setForm] = useState<{
    desc: string;
    tags: string[];
    image: string;
  }>({
    desc: "",
    tags: [],
    image: "",
  });
  const [preview, setPreview] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const handleStateChange = (name: string, value: string | string[]) => {
    setForm((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const handleTags = (tagList: string) => {
    const value = tagList.split("#");
    handleStateChange("tags", value.slice(1, value.length));
  };
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    try {
      const file = e.target.files[0];
      const base64 = (await convertToBase64(file)) as string;
      setPreview(base64);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      let data;
      if (preview) {
        const imageUrl = await uploadImage(preview);
        data = await imageUrl?.json();
        console.log(data);
      }

      if (postToEdit) {
        const response = await fetch(`/api/create-post/${postToEdit?._id}`, {
          method: "PATCH",
          body: JSON.stringify({ ...form, image: data?.url }),
        });
        if (response.ok) {
          console.log("okay updated");
          fetchPosts();
          setOpenModal(false);
          setForm({ desc: "", tags: [], image: "" });
          setPreview("");
          setIsEditing(false);
          setPostToEdit(null);
        }
      } else {
        const response = await fetch("/api/create-post/new", {
          method: "POST",
          body: JSON.stringify({
            ...form,
            user: session?.id,
            image: data?.url,
          }),
        });
        if (response.ok) {
          fetchPosts();
          setOpenModal(false);
          setForm({ desc: "", tags: [], image: "" });
          setPreview("");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    postToEdit?.image && setPreview(postToEdit?.image);
    postToEdit &&
      setForm({
        desc: postToEdit?.desc,
        tags: postToEdit?.tags,
        image: postToEdit?.image,
      });
  }, []);
  return (
    <section className=' fixed top-0 right-0 h-full py-6 bg-black/60 flex items-center  w-screen z-40 '>
      <div className='mx-auto w-5/6 md:w-2/3 lg:w-1/2 h-[500px]  overflow-y-scroll py-3 px-4 bg-white  rounded-md '>
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
            onClick={() => {
              setOpenModal(false);
              setPreview("");
              setForm({ desc: "", tags: [], image: "" });
              setIsEditing(false);
              setPostToEdit(null);
            }}
            width={15}
            height={15}
          />
        </div>
        <form onSubmit={handleSubmit} className='h-full'>
          <textarea
            className='w-full bg-gray-100 text-dark-gray rounded-md min-h-[200px] focus:outline-none text-sm py-2 px-3 my-3 h-fit'
            placeholder='Share your thoughts..'
            name='desc'
            defaultValue={postToEdit?.desc ? postToEdit?.desc : form?.desc}
            onChange={(e) => handleStateChange(e.target.name, e.target.value)}
          ></textarea>
          <textarea
            className='w-full bg-gray-100 text-link-blue rounded-md min-h-[50px] focus:outline-none text-sm py-2 px-3 my-3 h-fit'
            placeholder='Tags e.g #java#python'
            name='tags'
            defaultValue={
              postToEdit?.tags && postToEdit?.tags?.length > 1
                ? postToEdit?.tags?.join("#")
                : ""
            }
            onChange={(e) => handleTags(e.target.value)}
          ></textarea>
          {preview && (
            <div className='relative w-full h-fit min-h-[350px]'>
              <Image src={preview} alt={"Post"} fill className='object-fill' />
            </div>
          )}
          <div className='py-5 flex items-center justify-between gap-2 px-2'>
            <div
              className='flex items-center gap-2 cursor-pointer'
              onClick={() => fileRef?.current?.click()}
            >
              <Image
                src='/image.svg'
                alt='Choose Image'
                width={25}
                height={25}
              />
              <p className='text-sm'>Choose Image</p>
            </div>
            <input
              type='file'
              ref={fileRef}
              onChange={handleImageUpload}
              className='hidden'
            />
            <CustomButton
              text={postToEdit ? "Edit" : "Post"}
              btnType='submit'
              isLoading={isLoading}
              handleClick={() => {}}
              styles='bg-link-blue text-white font-semibold w-28 rounded-full text-md'
            />
          </div>
        </form>
      </div>
    </section>
  );
};

export default CreatePostModal;
