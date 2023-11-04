"use client";
import React from "react";
import { RotatingLines } from "react-loader-spinner";

function MiniLoader({ width, strokeColor = 'dodgerblue' }: { width: string, strokeColor?: string }) {
  return (
    <div className='flex justify-center items-center'>
      <RotatingLines
        strokeColor={strokeColor}
        strokeWidth='3'
        animationDuration='0.75'
        width={width}
        visible={true}
      />
    </div>
  );
}

export default MiniLoader;
