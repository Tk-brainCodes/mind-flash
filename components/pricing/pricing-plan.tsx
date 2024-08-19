"use client";

import React from "react";
import PricingCard from "./pricing-card";

import { Check, Minus } from "lucide-react";

const PricingSection = () => {
  const cards = [
    {
      title: "Free Plan",
      desc: "Free access plan",
      price: ["$", "0", "month"],
      options: [
        {
          icon: <Check className='h-5 w-5 text-blue-gray-900 text-[#3795BD]' />,
          info: "Access to AI-Powered Flashcards",
        },
        {
          icon: <Check className='h-5 w-5 text-blue-gray-900 text-[#3795BD]' />,
          info: "Basic Spaced Repetition",
        },
        {
          icon: (
            <Minus
              strokeWidth={2.5}
              className='h-5 w-5 text-blue-gray-900 text-[#3795BD]'
            />
          ),
          info: "Custom Flashcard Sets",
        },
        {
          icon: (
            <Minus
              strokeWidth={2.5}
              className='h-5 w-5 text-blue-gray-900 text-[#3795BD]'
            />
          ),
          info: "Detailed Progress Analytics",
        },
        {
          icon: (
            <Minus
              strokeWidth={2.5}
              className='h-5 w-5 text-blue-gray-900 text-[#3795BD]'
            />
          ),
          info: "Community Flashcards",
        },
      ],
    },
    {
      title: "Pro Plan",
      desc: "Pro plan access",
      price: ["$", "9.99", "year"],
      options: [
        {
          icon: <Check className='h-5 w-5 text-blue-gray-900 text-[#3795BD]' />,
          info: "Unlimited AI-Powered Flashcards",
        },
        {
          icon: <Check className='h-5 w-5 text-blue-gray-900 text-[#3795BD]' />,
          info: "Detailed Progress Analytics",
        },
        {
          icon: (
            <Check
              strokeWidth={2.5}
              className='h-5 w-5 text-blue-gray-900 text-[#3795BD]'
            />
          ),
          info: "Advanced Spaced Repetition",
        },
        {
          icon: (
            <Check
              strokeWidth={2.5}
              className='h-5 w-5 text-blue-gray-900 text-[#3795BD]'
            />
          ),
          info: "Custom Flashcard Sets",
        },
        {
          icon: (
            <Check
              strokeWidth={2.5}
              className='h-5 w-5 text-blue-gray-900 text-[#3795BD]'
            />
          ),
          info: "Community Flashcards",
        },
      ],
    },
  ];

  return (
    <section className='py-24 px-8'>
      <div className='container mx-auto'>
        <span className='mb-4 font-bold text-lg text-[#4E31AA]'>
          Pricing Plans
        </span>
        <h1
          color='blue-gray'
          className='mb-4 !leading-snug lg:!text-4xl !text-2xl max-w-2xl'
        >
          Invest in a plan that&apos;s as ambitious as your corporate goals.
        </h1>
        <span className='font-normal !text-gray-500 max-w-xl '>
          Compare the benefits and features of each plan below to find the ideal
          match for your business&apos;s budget and ambitions.
        </span>
        <div className='grid gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mt-[1em]'>
          {cards.map(({ title, desc, options, price }, key) => (
            <PricingCard
              key={key}
              title={title}
              desc={desc}
              price={price}
              options={options}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
