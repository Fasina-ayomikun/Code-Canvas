"use client";
import { CommentProp, PostCardProps, PostProps } from "@/common.types";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Toggle from "./Toggle";
import moment from "moment";
import CustomButton from "./CustomButton";
import Comments from "./Comments";
type userProp = {};

const PostCard = ({
  setPostToEdit,
  setIsEditing,
  fetchPosts,
  setOpenModal,
  postId,
  session,
}: PostCardProps) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [postComment, setPostComment] = useState<CommentProp>({
    creator: {
      image: session?.image,
      name: session?.name,
      username: session?.username,
    },
    desc: "",
    createdAt: "",
  });
  const [post, setPost] = useState<PostProps | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [openCommentModal, setOpenCommentModal] = useState("");

  const dropDownContent = [
    {
      title: "Edit Post",
      handleClick: () => {
        setOpenModal(true);
        setPostToEdit(post);
        setIsEditing(true);
      },
    },
    {
      title: "Delete Post",
      handleClick: async () => {
        const response = await fetch(`/api/create-post/${post?._id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          console.log("deleted");
          fetchPosts();
        }
      },
    },
  ];
  const handleStateChange = (name: string, value: string) => {
    setPostComment((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const UpdatePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const created = new Date(Date.now()).toString();
    try {
      const response = await fetch(`/api/create-post/${postId}`, {
        method: "PATCH",
        body: JSON.stringify({
          desc: post?.desc,
          tags: post?.tags,
          image: post?.image,
          liked: isLiked,
          comment: { ...postComment, createdAt: created },
        }),
      });
      if (response.ok) {
        fetchSinglePost();
        setPostComment({
          creator: {
            image: session?.image,
            name: session?.name,
            username: session?.username,
          },
          desc: "",
          createdAt: "",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const fetchSinglePost = async () => {
    try {
      const response = await fetch(`/api/create-post/${postId}`);
      const data = await response.json();
      data && setPost(data?.post);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchSinglePost();
  }, []);
  // the drop down should disappear when user clicks outside the modal
  useEffect(() => {
    const disableDropdown = (e: Event) => {
      if (!(e.target as HTMLElement).classList.contains("drop-down")) {
        setIsDropDownOpen(false);
      }
    };

    document.addEventListener("click", disableDropdown);

    return () => {
      document.removeEventListener("click", disableDropdown);
    };
  }, []);

  return (
    <>
      <div className='px-5 box_shadow2  w-full mx-auto my-10 py-3 rounded-md bg-white'>
        <div className='flex items-center gap-2  justify-between'>
          <div className='flex px-4 items-start gap-2 py-3 '>
            {post?.user && (
              <Image
                src={post?.user?.image}
                alt='profile'
                width={40}
                height={40}
                className=' aspect-square object-fill rounded-full'
              />
            )}
            <div>
              <h4 className='gap-2 text-sm font-semibold '>
                {post?.user?.name}
              </h4>
              <p className='text-gray-700  text-xs font-sans lowercase'>
                {moment(post?.createdAt).format("hh:mm a")}
              </p>
            </div>
          </div>
          <div className='relative'>
            <div
              className='drop-down cursor-pointer'
              id='dropdown-button'
              onClick={() => setIsDropDownOpen((prev) => !prev)}
            >
              <div className='h-[1px] drop-down rounded-full bg-dark-gray w-4 hover:bg-link-blue my-1'></div>
              <div className='h-[1px] drop-down rounded-full bg-dark-gray w-4 hover:bg-link-blue hover:duration-200 hover:skew-x-2 my-1'></div>
              <div className='h-[1px] drop-down rounded-full bg-dark-gray w-4 hover:bg-link-blue hover:duration-200 hover:skew-x-2 my-1'></div>
            </div>
            <Toggle
              isDropDownOpen={isDropDownOpen}
              dropDownContent={dropDownContent}
            />
          </div>
        </div>
        <p className='text-sm py-3 text-dark-gray'>{post?.desc}</p>
        <div className='relative w-full '>
          <p className='text-sm text-link-blue mb-3'>
            {post?.tags.map((tag, index) => (
              <span key={index}>#{tag} </span>
            ))}
          </p>
          {post?.image && (
            <Image
              src={post?.image}
              alt='post'
              width={1600}
              height={900}
              layout='responsive'
              className=' object-cover h-fit'
            />
          )}
        </div>
        <div className='py-4 pt-3 flex items-center justify-between gap-3'>
          <div className='flex items-center gap-2'>
            <Image
              src={`${isLiked ? "/like-filled.svg" : "/like.svg"}`}
              alt=''
              width={20}
              height={20}
              onClick={() => setIsLiked((prev) => !prev)}
              className='object-contain'
            />
            {/* TODO:Makesure the likes exclude you */}
            <p className='text-sm '>
              You and {post?.noOfLikes} others liked this
            </p>
          </div>
          <div
            className='cursor-pointer flex items-center gap-2'
            onClick={() =>
              setOpenCommentModal((prev) => {
                if (prev) {
                  return "";
                }

                return postId;
              })
            }
          >
            <Image
              src='/comment.svg'
              alt=''
              width={20}
              height={20}
              className='object-contain'
            />
            <p className='text-sm'>{post?.comments.length} Comments</p>
          </div>
        </div>
      </div>
      {openCommentModal === postId && (
        <>
          <form
            onSubmit={UpdatePost}
            className='w-full bg-white rounded-md px-5 py-3'
          >
            <div className='w-full bg-gray-100  rounded-md min-h-[50px]  h-fit flex items-center gap-3 px-3'>
              <textarea
                name='desc'
                required
                value={postComment.desc}
                onChange={(e) =>
                  handleStateChange(e.target.name, e.target.value)
                }
                placeholder='Share your comment..'
                className='w-full h-full bg-transparent text-link-blue focus:outline-none text-sm  py-2 px-3'
              ></textarea>
              <CustomButton
                btnType='submit'
                text='Post'
                isLoading={isLoading}
                handleClick={() => {}}
                styles=' bg-transparent underline text-link-blue font-bold  mx-auto text-md'
              />
            </div>
          </form>
          <Comments comments={post?.comments} />
        </>
      )}
    </>
  );
};

export default PostCard;
