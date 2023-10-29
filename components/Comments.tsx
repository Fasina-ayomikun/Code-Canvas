import { CommentProp, SingleCommentProps } from "@/common.types";
import moment from "moment";
import Image from "next/image";
import React, { useState } from "react";
import Toggle from "./Toggle";
import { AiFillDelete } from "react-icons/ai";

const Comments = ({
  comments,
  fetchComments,
}: {
  comments: SingleCommentProps[];
  fetchComments: () => void;
}) => {
  console.log(comments);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const deleteComment = async (commentId: string) => {
    try {
      const response = await fetch(`/api/comments/${commentId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchComments();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='mt-5 h-[500px] overflow-y-scroll'>
      {comments &&
        comments?.map((comment: SingleCommentProps) => (
          <div className='w-full bg-white my-2 py-3 px-4  rounded-md  '>
            <div className='flex items-start gap-2 justify-between'>
              <div className='flex px-4 items-center gap-2 py-3 justify-between'>
                {comment?.creator?.image && (
                  <Image
                    src={comment?.creator?.image}
                    alt='profile'
                    width={40}
                    height={40}
                    className=' aspect-square object-fill rounded-full'
                  />
                )}
                <div>
                  <h4 className='text-sm font-semibold '>
                    {comment?.creator?.name}
                  </h4>
                  <p className='text-link-blue ml-1 my-1 text-xs font-sans lowercase'>
                    @{comment?.creator?.username}
                  </p>
                </div>
              </div>
              <AiFillDelete
                className='text-md text-red-300'
                onClick={() => {
                  deleteComment(comment?._id);
                }}
              />
            </div>
            <p className='text-sm font-regular mt-2'> {comment?.desc}</p>
            <span className='text-xs text-gray-500 flex items-end justify-end '>
              {moment(comment?.createdAt).format("hh:mm a")}
            </span>
          </div>
        ))}
    </div>
  );
};

export default Comments;
