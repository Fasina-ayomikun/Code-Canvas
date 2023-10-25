import React from 'react';
import Follower from './Follower';

function Followers() {
    return (
        <div className='bg-white shadow-md w-[400px] p-4 rounded-md'>
            <div className='flex justify-between items-center'>
                <p className='font-bold text-lg'>Followers</p>
                <p className='text-blue-600 text-lg cursor-pointer'>See all followers</p>
            </div>
            <div className='grid grid-cols-3 gap-2 mt-3'>
                {
                    Array(9).fill('').map((a, idx) => (
                        <div className='' key={idx}>
                            <Follower />
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default Followers;