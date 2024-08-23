import Link from "next/link";
import React from "react";
import { Logo } from "@/assets";
import Image from "next/image";



const Footer = () => {
  return (
    <>
      <footer className=' w-full px-12 bg-[#3A1078] bg-gradient-to-r from-blue-700 to-indigo-800'>
        <div className='w-full max-w-screen-xl mx-auto p-4 md:py-8'>
          <div className='sm:flex sm:items-center sm:justify-between'>
            <a
              href='https://flowbite.com/'
              className='flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse'
            >
            <Image
              src={Logo}
              alt='mind-flash'
              loading='lazy'
              className='w-[25px] h-[25px]'
            />
              <span className='self-center text-white text-2xl font-semibold whitespace-nowrap dark:text-white'>
                MindFlash
              </span>
            </a>
          </div>
          <span className='block text-white text-sm mt-[1em]  sm:text-center dark:text-gray-400'>
            © 2024{" "}
            <Link href='/' className='hover:underline'>
              MindFlash™
            </Link>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </>
  );
};

export default Footer;
