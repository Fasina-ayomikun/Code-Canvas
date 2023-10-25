import Image from 'next/image';
import React from 'react';

function Follower() {
    return (
        <div>
            <div className='relative w-24 h-24'>
                <Image 
                    src='/hero2.jpg' 
                    alt='image'
                    layout='fill'
                    objectFit='cover'
                    className='rounded-md'
                />
            </div>
            <p className='text-sm text-gray-600'>John Doe</p>
        </div>
    );
}

export default Follower;