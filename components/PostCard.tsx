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
  post,
}: PostCardProps) => {
  const data = localStorage.getItem("CODE_CANVAS_SESSION_USER");
  const session = data ? JSON.parse(data) : null;
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(post.likesUser.includes(session.id));
  const [likeNum, setLikeNum] = useState(post.noOfLikes);
  const [postComment, setPostComment] = useState<CommentProp>({
    desc: "",
    creator: session?.id,
    post: post._id,
  });
  const [isCommenting, setIsCommenting] = useState(false);
  const [openCommentModal, setOpenCommentModal] = useState("");
  const [allComments, setAllComments] = useState([]);
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

  const handleToggleLike = async (param: string) => {
    setIsLiked((prev) => !prev);
    console.log("liking....", param);

    if (param === "like") {
      setLikeNum((prev) => prev + 1);
    } else {
      setLikeNum((prev) => prev - 1);
    }

    try {
      const response = await fetch("/api/likes/toggle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session.id,
          postId: post._id,
        }),
      });

      const data = await response.json();

      if (!response.ok) return;

      console.log(data);
    } catch (error) {
      setIsLiked(false);
      console.log(error);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/comments`, {
        method: "POST",
        body: JSON.stringify({
          creator: session?.id,
          post: post?._id,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log(data);

        setAllComments(data.comments);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const createComment = async () => {
    setIsCommenting(true);
    try {
      if (!session) return;
      const response = await fetch(`/api/comments/new`, {
        method: "POST",
        body: JSON.stringify(postComment),
      });
      if (response.ok) {
        setPostComment({ desc: "", creator: session?.id, post: post._id });
        fetchComments();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsCommenting(false);
    }
  };

  useEffect(() => {
    fetchComments();
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
            {isLiked ? (
              <Image
                src='/like-filled.svg'
                alt=''
                width={20}
                height={20}
                onClick={() => handleToggleLike("unlike")}
                className='object-contain'
              />
            ) : (
              <Image
                src='/like.svg'
                alt=''
                width={20}
                height={20}
                onClick={() => handleToggleLike("like")}
                className='object-contain'
              />
            )}
            {/* TODO:Makesure the likes exclude you */}

            {isLiked && likeNum > 1 ? (
              <p className='text-sm'>You and {likeNum - 1} others like this</p>
            ) : isLiked ? (
              <p className='text-sm'>You like this</p>
            ) : likeNum > 0 ? (
              <p className='text-sm'>
                {likeNum} {likeNum > 1 ? "people" : "person"} likes this
              </p>
            ) : null}
          </div>
          <div
            className='cursor-pointer flex items-center gap-2'
            onClick={() =>
              setOpenCommentModal((prev) => {
                if (prev) {
                  return "";
                }

                return post._id;
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
            <p className='text-sm'>
              {allComments.length} Comment{allComments.length < 2 ? "" : "s"}
            </p>
          </div>
        </div>
      </div>
      {openCommentModal === post._id && (
        <>
          <form
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              createComment();
            }}
            className='w-full bg-white rounded-md px-5 py-3'
          >
            <div className='w-full bg-gray-100  rounded-md min-h-[50px]  h-fit flex items-center gap-3 px-3'>
              <textarea
                name='desc'
                value={postComment?.desc}
                required
                onChange={(e) =>
                  setPostComment((prev) => {
                    return { ...prev, desc: e.target.value };
                  })
                }
                placeholder='Share your comment..'
                className='w-full h-full bg-transparent text-link-blue focus:outline-none text-sm  py-2 px-3'
              ></textarea>
              <CustomButton
                btnType='submit'
                text='Post'
                isLoading={isCommenting}
                handleClick={() => {}}
                styles=' bg-transparent underline text-link-blue font-bold  mx-auto text-md'
              />
            </div>
          </form>
          {allComments.length < 1 ? (
            <p className='text-sm ml-3 text-dark-gray mt-5'>
              Be the first to comment...
            </p>
          ) : (
            <Comments comments={allComments} fetchComments={fetchComments} />
          )}
        </>
      )}
    </>
  );
};

export default PostCard;
