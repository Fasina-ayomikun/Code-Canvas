import React from 'react';
import { useSelector } from 'react-redux';

function About() {

    const { userDetails } = useSelector((state: any) => state.profile);

    return (
        <div className='bg-white shadow-md w-[400px] p-4 rounded-md'>
            <h2 className='font-bold text-2xl mb-2'>Bio</h2>
            <p className='text-sm text-gray-600'>
                { userDetails.bio }
            </p>
        </div>
    );
}

export default About;