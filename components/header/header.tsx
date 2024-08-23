"use client";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Logo } from "@/assets";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  const { user } = useUser();
  const router = useRouter();
  return (
    <div className='flex flex-col items-center justify-start overflow-hidden h-full flex-1 md:flex'>
      <div className='flex items-center justify-between p-6 rounded-full fixed z-40 w-[80vw] mt-[1em] h-[60px] bg-blue-400 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10'>
        <h2>
          <Link href={"/"} className='text-2xl flex items-center justify-center gap-x-2 font-bold tracking-tight'>
            <Image
              src={Logo}
              alt='mind-flash'
              loading='lazy'
              className='w-[25px] h-[25px]'
            />
            MindFlash
          </Link>
        </h2>
        <div className='flex items-center justify-center space-x-3'>
          {user && (
            <Button
              className='rounded-full hover:bg-[#3A1078] bg-[#4E31AA]'
              onClick={() => router.push("/dashboard")}
            >
              Dashboard
            </Button>
          )}
          <span className='mt-2'>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignInButton />
            </SignedOut>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
