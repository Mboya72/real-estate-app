import Link from "next/link";
import React from "react";
import { AnimatedTestimonials } from "./ui/animated-testimonials";

const Hero = () => {
  return (
    <div className="max-w-[95vw] mx-auto pt-40">
      <div className="">
  <p className="text-6xl sm:text-8xl md:text-9xl lg:text-10xl font-extrabold font-afacad lg:leading-tight sm:leading-tight md:leading-tight">
    You imagine it.
  </p>
  <p className="text-6xl sm:text-8xl md:text-9xl lg:text-10xl font-extrabold font-afacad lg:leading-tight sm:leading-tight md:leading-tight">
    We Find it.
  </p>
</div>

<div>
  <p className="mt-3 sm:text-xl md:text-2xl lg:text-3xl">
    Discover exceptional properties, personalized service, and a
  </p>
  <p className=" sm:text-xl md:text-2xl lg:text-3xl">
    seamless journey to finding the perfect place to call home. Let’s
  </p>
  <p className=" sm:text-xl md:text-2xl lg:text-3xl">
    make it happen, together.
  </p>
</div>

      <div className="mt-20">
      <Link href="/Rent" className="font-medium sm:text-2xl lg:text-3xl md:text-2xl text-white hover:bg-[#6E4559] py-4 px-4 border lg:bg-transparent md:bg-[#6E4559] border-white transition duration-300">
            Discover More
          </Link>
          </div>
          <div>
            <AnimatedTestimonials/>
          </div>
    </div>
  );
};

export default Hero;
