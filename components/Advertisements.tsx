import Image from "next/image";
import React from "react";

const Advertisements = () => {
  return (
    <section className='hidden lg:block box_shadow2 px-5 pb-5 pt-3  w-4/5 mx-auto my-10 bg-white'>
      <h3 className='font-bold  capitalize text-center my-2 border-b-[1px] border-link-blue text-  pb-3'>
        Advertisement
      </h3>
      <div className='relative w-full h-36'>
        <Image src='/hero1.jpg' alt='' fill className='object-cover' />
      </div>
    </section>
  );
};

export default Advertisements;
