"use client";

import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PricingCardPropsType {
  title: string;
  desc: string;
  price: string[];
  options: {
    icon: React.ReactNode;
    info: string;
  }[];
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

const PricingCard = ({ title, desc, price, options }: PricingCardPropsType) => {
  return (
    <Card>
      <CardHeader color='transparent' className='!m-0 p-6'>
        <h6 color='blue-gray' className='capitalize font-bold mb-1'>
          {title}
        </h6>
        <span className='font-normal text-base !text-gray-500'>{desc}</span>
        <h3 color='blue-gray' className='!mt-4 flex gap-1 !text-4xl'>
          {price[0]}
          {price[1]}
          <span
            color='blue-gray'
            className='-translate-y-0.5 self-end opacity-70 text-lg font-bold'
          >
            /{price[2]}
          </span>
        </h3>
      </CardHeader>
      <CardDescription className='px-[1em] py-2'>
        <ul className='flex flex-col gap-3 mb-6'>
          {options.map((option, key) => (
            <li key={key} className='flex items-center gap-3 text-gray-700'>
              {option.icon}
              <span className='font-normal text-inherit'>{option.info}</span>
            </li>
          ))}
        </ul>
        <Button className='bg-[#4E31AA] mt-[1em] mb-[1em] w-full'>
          get started
        </Button>
      </CardDescription>
    </Card>
  );
};

export default PricingCard;
