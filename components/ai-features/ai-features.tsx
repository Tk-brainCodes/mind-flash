"use client";
import React from "react";
import { StickyScroll } from "../ui/sticky-scroll-reveal";
import Image from "next/image";

const content = [
  {
    title: "AI-Powered Flashcards",
    description:
      "Transform your learning experience with AI-driven flashcards that automatically generate from any text, article, or document you provide. MindFlash adapts to your unique learning style, ensuring you get the most relevant and effective content for your study sessions.",
    content: (
      <div className='h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white'>
        Collaborative Editing
      </div>
    ),
  },
  {
    title: "Spaced Repetition for Maximum Retention",
    description:
      "Say goodbye to cramming and hello to long-term retention. MindFlash uses advanced spaced repetition algorithms to schedule your reviews at optimal intervals, helping you retain information more effectively and efficiently over time.",
    content: (
      <div className='h-full w-full  flex items-center justify-center text-white'>
        <Image
          src='https://images.unsplash.com/photo-1721332155484-5aa73a54c6d2?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
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
      <div className='h-full w-full bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] flex items-center justify-center text-white'>
        Version control
      </div>
    ),
  },
  {
    title: "Fully Customizable Flashcards",
    description:
      "Take control of your learning by customizing your flashcards. Whether you want to edit AI-generated content, add your own notes, or create entirely new flashcards, MindFlash gives you the flexibility to tailor your study experience to your specific needs and preferences.",
    content: (
      <div className='h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white'>
        Running out of content
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
