import { SignUp } from "@clerk/nextjs";
import { SignupImage } from "@/assets";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

export default function Page() {

  return (
    <>
      <div
        className='container relative h-[800px] items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0'
      >
        <div   
         className='relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex'>
                   <Image 
            src={SignupImage} 
            layout="fill" 
            objectFit="cover" 
            alt="Login background" 
            priority
          />
          <div className='absolute inset-0 bg-zinc-900 bg-opacity-50' />
          <div className='relative z-20 flex items-center text-lg font-medium'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='mr-2 h-6 w-6'
            >
              <path d='M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3' />
            </svg>
            MindFlash
          </div>
          <div className='relative z-20 mt-auto'>
            <blockquote className='space-y-2'>
              <p className='text-lg'>
                “Thanks to MindFlash, I can finally study smarter, not harder.
                The personalized flashcards and progress tracking have
                completely transformed my learning process.”
              </p>
              <footer className='text-sm'>Sofia Davis</footer>
            </blockquote>
          </div>
        </div>
        <div className='lg:p-8 flex items-center justify-center'>
          <SignUp />
        </div>
      </div>
    </>
  );
}
