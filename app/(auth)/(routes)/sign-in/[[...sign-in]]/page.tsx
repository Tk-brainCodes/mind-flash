import { SignIn } from "@clerk/nextjs";
import { LoginImage } from "@/assets";

import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

export default function Page() {
  return (
    <>
      <div className='container relative h-[800px] items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
        <div
          className='relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex'
        >
          <Image 
            src={LoginImage} 
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
                “MindFlash has revolutionized the way I study. The AI-powered
                flashcards make learning efficient, and I’ve never felt more
                prepared for exams. It’s a game-changer!”
              </p>
              <footer className='text-sm'>Sofia Davis</footer>
            </blockquote>
          </div>
        </div>
        <div className='lg:p-8 flex items-center justify-center'>
          <SignIn />
        </div>
      </div>
    </>
  );
}
