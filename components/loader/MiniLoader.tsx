"use client";
import React from "react";
import { RotatingLines } from "react-loader-spinner";

function MiniLoader({ width }: { width: string }) {
  return (
    <div className='flex justify-center items-center'>
      <RotatingLines
        strokeColor='dodgerblue'
        strokeWidth='3'
        animationDuration='0.75'
        width={width}
        visible={true}
      />
    </div>
  );
}

export default MiniLoader;
