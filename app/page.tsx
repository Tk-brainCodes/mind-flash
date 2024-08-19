"use client";

import Image from "next/image";
import getStripe from "@/lib/stripe";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import HeroSection from "@/components/hero-section/hero-section";
import AIFeatures from "@/components/ai-features/ai-features";
import PricingSection from "@/components/pricing/pricing-plan";
import Footer from "@/components/footer/footer";
import { redirect, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export default function Home() {
  const { user } = useUser();
  const router = useRouter();

  if (!user?.id) {
    return redirect("/sign-in");
  }

  return (
    <>
      <div className='flex flex-col items-center justify-start overflow-hidden h-full flex-1 md:flex'>
        <div className='flex items-center justify-between p-6 rounded-full fixed z-40 w-[80vw] mt-[1em] h-[60px] bg-blue-400 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>MindFlash</h2>
          </div>
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

        <HeroSection />
      </div>
      <AIFeatures />
      <PricingSection />
      <Footer />
    </>
  );
}
