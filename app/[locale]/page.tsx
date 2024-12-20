import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import Blog from "@/components/Blog";
import Brands from "@/components/Brands";
import ScrollUp from "@/components/Common/ScrollUp";
import Contact from "@/components/Contact";
import Features from "@/components/Features";
import Partners from "../partners/page";
import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import Video from "@/components/Video";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Associació Formació I Sensibilització Barcelona",
  description: "Associació Formació I Sensibilització Barcelona",
  // other metadata
 
};

export default async function Home({ params: { lang } }: { params: { lang: string } }) {
  
  return (
    <>
      <ScrollUp />
      <Hero />
      <Features />
      <Video />
      {/* <Brands /> */}
      {/* <AboutSectionOne /> */}
      {/* <AboutSectionTwo /> */}
      <Testimonials />
      {/* <Partners /> */}
      {/* <Pricing /> */}
      {/* <Blog /> */}
      
      {/* <Contact /> */}
    </>
  );
}
