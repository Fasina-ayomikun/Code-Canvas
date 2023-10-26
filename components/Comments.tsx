import { CommentProp } from "@/common.types";
import moment from "moment";
import Image from "next/image";
import React from "react";

const Comments = ({ comments }: { comments: CommentProp[] | undefined }) => {
  return (
    <div className='mt-5'>
      {comments?.map((comment) => (
        <div className='w-full bg-white my-2 py-3 px-4  rounded-md  '>
          <div className='flex items-start justify-between gap-2'>
            <div className='flex px-4 items-center gap-2 py-3 '>
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
            <span className='text-xs text-gray-500'>
              {moment(comment?.createdAt).format("hh:mm a")}
            </span>
          </div>
          <p className='text-sm font-regular mt-2'> {comment?.desc}</p>
        </div>
      ))}
    </div>
  );
};

export default Comments;
