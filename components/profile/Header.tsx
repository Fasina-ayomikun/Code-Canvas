import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { AiTwotoneEdit } from "react-icons/all";

function Header() {
    return (
        <div className='bg-white h-[450px] shadow-md pb-10'>
            {/* Banner Image Layout */}
            <div className='w-4/5 h-[300px] relative m-auto'>
                <Image 
                    src='/hero2.jpg' 
                    alt='banner' 
                    layout='fill' 
                    className='rounded-b-md'
                    // objectFit='cover'
                />
            </div>

            {/* Profile Image Layout */}
            <div className='relative left-40 -top-[90px] flex items-end'>
                <div className='bg-white relative w-[180px] h-[180px] rounded-full flex justify-center items-center'>
                    <Image 
                        className='rounded-full'
                        src='/avatar.png' 
                        alt='profile picture'
                        width={170} 
                        height={170}
                        objectFit='cover'
                    />
                </div>

                <div>
                    <h2 className='text-4xl font-bold mb-2'>Ghasty</h2>
                    <div className='flex justify-center items-center gap-2'>
                        <p className='text-sm text-gray-600 cursor-pointer'>4.1k followers</p>
                        <p className='rounded-full bg-gray-600 w-[6px] h-[6px]' />
                        <p className='text-sm text-gray-600 cursor-pointer'>4.1k following</p>
                    </div>
                </div>
            </div>

            <Link href="/update-profile/2" className='w-4/5 m-auto flex justify-end items-center -translate-y-20 cursor-pointer'>
                <div className='bg-gray-300 rounded-md p-2 px-3 flex justify-center items-center gap-2'>
                    <AiTwotoneEdit />
                    <p>Edit Profile</p>
                </div>
            </Link>
        </div>
    );
}

export default Header;