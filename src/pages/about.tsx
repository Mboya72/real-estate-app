import Image from 'next/image';
import { JSX } from 'react';

const About = (): JSX.Element => {
  return (
    <div className="bg-[#F5F5DC] min-h-screen py-12 px-6"> {/* Update background to Beige */}
      {/* Main Container */}
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header Section */}
        <header className="text-center">
          <h1 className="text-4xl font-bold text-[#6E4559] mb-4">About Us</h1>
          <p className="text-xl text-[#000] max-w-3xl mx-auto">
            Discover our expertise in real estate, specializing in Toronto Stock Exchange (TSX) properties. Our passion for investment, experience, and commitment drives us to provide unparalleled opportunities for both investors and homebuyers.
          </p>
        </header>
        
        {/* Who We Are Section */}
        <section className="bg-white p-8 rounded-xl shadow-xl space-y-6">
          <h2 className="text-2xl font-semibold text-[#6E4559]">Who We Are</h2>
          <p className="text-lg text-[#000]">
            TSX Real Estate is a trusted real estate company with a focus on offering high-value investment opportunities through properties listed on the Toronto Stock Exchange (TSX). Our mission is to bridge the gap between the stock market and real estate investing, enabling our clients to diversify their portfolios while securing their future.
          </p>
          <p className="text-lg text-[#000]">
            We are a team of experienced real estate professionals and financial analysts dedicated to helping our clients make informed investment decisions. Our vision is to simplify the real estate process and make top-tier TSX properties accessible to all types of investors.
          </p>
        </section>

        {/* Image Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative rounded-lg overflow-hidden shadow-xl">
            <Image
              src="/images/real-estate-office.jpg"
              alt="Real Estate Office"
              width={600}
              height={400}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="relative rounded-lg overflow-hidden shadow-xl">
            <Image
              src="/images/city-skyline.jpg"
              alt="Toronto Skyline"
              width={600}
              height={400}
              className="object-cover w-full h-full"
            />
          </div>
        </section>

        {/* Our Services Section */}
        <section className="bg-white p-8 rounded-xl shadow-xl space-y-6">
          <h2 className="text-2xl font-semibold text-[#6E4559]">Our Services</h2>
          <p className="text-lg text-[#000]">
            At TSX Real Estate, we offer a variety of services tailored to help you navigate the real estate landscape and make smart investment choices. Whether you’re interested in residential, commercial, or mixed-use properties, we provide you with the insights and resources to grow your portfolio.
          </p>
          <ul className="list-disc pl-6 space-y-3 text-lg text-[#000]">
            <li>Real Estate Investment Consulting</li>
            <li>TSX-Listed Property Opportunities</li>
            <li>Real Estate Market Research & Analysis</li>
            <li>Property Leasing & Management</li>
            <li>Investment Portfolio Diversification</li>
          </ul>
        </section>

        {/* Our Mission Section */}
        <section className="bg-white p-8 rounded-xl shadow-xl space-y-6">
          <h2 className="text-2xl font-semibold text-[#6E4559]">Our Mission</h2>
          <p className="text-lg text-[#000]">
            Our mission is to provide our clients with high-quality, transparent investment opportunities. We are committed to making TSX real estate a powerful addition to your portfolio, offering you access to exclusive properties and a pathway to financial growth.
          </p>
          <p className="text-lg text-[#000]">
            By blending deep financial expertise with a passion for real estate, we deliver comprehensive solutions that empower our clients to achieve their goals and create lasting wealth.
          </p>
        </section>

        {/* Contact Us Section */}
        <section className="text-center">
          <h2 className="text-2xl font-semibold text-[#6E4559] mb-4">Contact Us</h2>
          <p className="text-lg text-[#000] mb-4">
            If you have any questions, would like to discuss investment opportunities, or simply want to learn more, feel free to reach out to us. We&apos;re here to help you make informed real estate decisions and maximize your investment potential.
          </p>
          <div className="inline-flex space-x-4">
            <a
              href="/contact"
              className="px-6 py-3 bg-[#6E4559] text-white rounded-lg hover:bg-[#5a3c47] transition"
            >
              Contact Us
            </a>
            <a
              href="mailto:info@tsxrealestate.com"
              className="px-6 py-3 bg-gray-300 text-[#6E4559] rounded-lg hover:bg-gray-200 transition"
            >
              Email Us
            </a>
          </div>
        </section>

        {/* Footer Section */}
        <footer className="bg-[#6E4559] text-white text-center py-6 mt-12">
          <p className="text-lg">
            &copy; 2025 TSX Real Estate. All rights reserved.
          </p>
          <p className="text-sm">
            Built with care and dedication to bring the best real estate investment opportunities to you.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default About;
