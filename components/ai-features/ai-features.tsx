"use client";
import React from "react";
import { StickyScroll } from "../ui/sticky-scroll-reveal";
import { Edit, Statistics, Card } from "@/assets";
import Image from "next/image";

const content = [
  {
    title: "AI-Powered Flashcards",
    description:
      "Transform your learning experience with AI-driven flashcards that automatically generate from any text, article, or document you provide. MindFlash adapts to your unique learning style, ensuring you get the most relevant and effective content for your study sessions.",
    content: (
      <div className='h-full w-full  flex items-center justify-center text-white'>
        <Image
          src={Card}
          width={300}
          height={300}
          className='h-full w-full object-cover'
          alt='linear board demo'
        />
      </div>
    ),
  },
  {
    title: "Detailed Progress Tracking",
    description:
      "Stay on top of your learning journey with comprehensive progress tracking. MindFlash provides detailed insights into your strengths and areas that need improvement, allowing you to focus your efforts where they matter most. Track your mastery of subjects and watch your knowledge grow with every session.",
    content: (
      <div className='h-full w-full  flex items-center justify-center text-white'>
        <Image
          src={Statistics}
          width={300}
          height={300}
          className='h-full w-full object-cover'
          alt='linear board demo'
        />
      </div>
    ),
  },
  {
    title: "Fully Customizable Flashcards",
    description:
      "Take control of your learning by customizing your flashcards. Whether you want to edit AI-generated content, add your own notes, or create entirely new flashcards, MindFlash gives you the flexibility to tailor your study experience to your specific needs and preferences.",
    content: (
      <div className='h-full w-full  flex items-center justify-center text-white'>
        <Image
          src={Edit}
          width={300}
          height={300}
          className='h-full w-full object-cover'
          alt='linear board demo'
        />
      </div>
    ),
  },
];
export default function AIFeatures() {
  return (
    <div className='p-10  bg-[#3A1078] bg-gradient-to-r from-blue-700 to-indigo-800'>
      <StickyScroll content={content} contentClassName='overflow-y-hidden' />
    </div>
  );
}
