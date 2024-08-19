import React from "react";

const Footer = () => {
  return (
    <>
      <footer className=' w-[100vw] px-12 bg-[#3A1078] bg-gradient-to-r from-blue-700 to-indigo-800'>
        <div className='w-full max-w-screen-xl mx-auto p-4 md:py-8'>
          <div className='sm:flex sm:items-center sm:justify-between'>
            <a
              href='https://flowbite.com/'
              className='flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse'
            >
              {/* <img
                src='https://flowbite.com/docs/images/logo.svg'
                className='h-8'
                alt='Flowbite Logo'
              /> */}
              <span className='self-center text-white text-2xl font-semibold whitespace-nowrap dark:text-white'>
                MindFlash
              </span>
            </a>
            <ul className='flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400'>
              <li>
                <a href='#' className='hover:underline text-white me-4 md:me-6'>
                  About
                </a>
              </li>
              <li>
                <a href='#' className='hover:underline text-white me-4 md:me-6'>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href='#' className='hover:underline text-white me-4 md:me-6'>
                  Licensing
                </a>
              </li>
              <li>
                <a href='#' className='hover:underline text-white'>
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <span className='block text-white text-sm mt-[1em]  sm:text-center dark:text-gray-400'>
            © 2023{" "}
            <a href='https://flowbite.com/' className='hover:underline'>
              Flowbite™
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </>
  );
};

export default Footer;
