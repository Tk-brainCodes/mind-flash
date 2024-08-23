"use client";

import getStripe from "@/lib/stripe";
import HeroSection from "@/components/hero-section/hero-section";
import AIFeatures from "@/components/ai-features/ai-features";
import PricingSection from "@/components/pricing/pricing-plan";
import Footer from "@/components/footer/footer";
import { redirect } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import Header from "@/components/header/header";

export default function Home() {
  const { user } = useUser();

  if (!user?.id) {
    return redirect("/sign-in");
  }

  return (
    <div className="overflow-x-hidden">
      <div className='flex flex-col items-center justify-start overflow-hidden h-full flex-1 md:flex'>
       <Header />
        <HeroSection />
      </div>
      <AIFeatures />
      <PricingSection />
      <Footer />
    </div>
  );
}
