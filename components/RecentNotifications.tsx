import Image from "next/image";
import React from "react";

const RecentNotifications = () => {
  return (
    <section className='hidden lg:block box_shadow2  w-4/5 mx-auto my-10 py-5 bg-white'>
      <h3 className='font-bold  capitalize text-center my-2 border-b-[1px] border-link-blue text-  pb-3'>
        Recent Notifications
      </h3>
      <div className='flex px-4 items-start gap-2 py-3 hover:bg-gray-200'>
        <Image
          src='/hero1.jpg'
          alt='profile'
          width={40}
          height={40}
          className=' aspect-square object-cover rounded-full'
        />
        <div>
          <h4 className='text-sm font-semibold text-link-blue'>
            Fasina Ayomikun
          </h4>
          <p className='text-gray-600  text-xs font-sans lowercase'>
            5 mins ago
          </p>
        </div>
      </div>
      <div className='flex px-4 items-start gap-2 py-3 hover:bg-gray-200'>
        <Image
          src='/hero1.jpg'
          alt='profile'
          width={40}
          height={40}
          className=' aspect-square object-cover rounded-full'
        />
        <div>
          <h4 className='text-sm font-semibold text-link-blue'>
            Fasina Ayomikun
          </h4>
          <p className='text-gray-600  text-xs font-sans lowercase'>
            5 mins ago
          </p>
        </div>
      </div>
      <div className='flex px-4 items-start gap-2 py-3 hover:bg-gray-200'>
        <Image
          src='/hero1.jpg'
          alt='profile'
          width={40}
          height={40}
          className=' aspect-square object-cover rounded-full'
        />
        <div>
          <h4 className='text-sm font-semibold text-link-blue'>
            Fasina Ayomikun
          </h4>
          <p className='text-gray-600  text-xs font-sans lowercase'>
            5 mins ago
          </p>
        </div>
      </div>
      <div className='flex px-4 items-start gap-2 py-3 hover:bg-gray-200'>
        <Image
          src='/hero1.jpg'
          alt='profile'
          width={40}
          height={40}
          className=' aspect-square object-cover rounded-full'
        />
        <div>
          <h4 className='text-sm font-semibold text-link-blue'>
            Fasina Ayomikun
          </h4>
          <p className='text-gray-600  text-xs font-sans lowercase'>
            5 mins ago
          </p>
        </div>
      </div>
    </section>
  );
};

export default RecentNotifications;
