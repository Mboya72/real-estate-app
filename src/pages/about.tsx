import React from 'react';
import './about.css'

const About = () => {
  return (
    <div className="bg-[#6E4559] p-8 min-h-screen">
      <h1 className="text-white text-3xl flex justify-center font-semibold sm:text-4xl md:text-6xl lg:text-8xl">About Us</h1>
      <div className="flex flex-col lg:flex-row items-center justify-center bg-slate-300 text-black rounded-md max-w-[80vw] mx-auto space-y-8 lg:space-y-0 lg:space-x-8">
        {/* Image container */}
        <div className=" max-w-[1000px] lg:ma-w-none">
          <img src="/HUGO BOSS will equip the German record champions 1.svg" alt="Property" className=" h-auto object-cover " />
        </div>
        
        {/* Text content */}
        <div className="text-center lg:text-left">
          
          <p className='text-2xl'><span className='text-2xl text-black font-semibold'>Welcome </span> to Sheltor, your trusted partner in finding your dream property.
          Whether you&apos;re searching for a cozy home, a luxurious estate, or a profitable investment property, we&apos;ve got you covered.</p>
          <br />
          <p className='text-2xl'>At Sheltor, we combine technology, market expertise, and a passion for exceptional service to deliver a seamless real estate experience.
          Our platform is designed to connect buyers, sellers, and renters with the right opportunities, offering a comprehensive database of properties tailored to your unique needs.</p>
        </div>
      </div>
      <div>

      </div>
      <div>
        <h2>Meet The Brains</h2>
      </div>
    </div>
  );
};

export default About;
