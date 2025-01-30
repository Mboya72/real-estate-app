'use client';

import Image from 'next/image';

const teamMembers = [
  {
    name: 'Ronald Odhiambo',
    role: 'Founder',
    image: '/ronald-odhiambo.jpg',
  },
  {
    name: 'George Adabioro',
    role: 'Co-Founder & CEO',
    image: '/george-adabioro.jpg',
  },
  {
    name: 'Essy Maloba',
    role: 'Sales Executive',
    image: '/essy-maloba.jpg',
  },
  {
    name: 'Sam Obisanya',
    role: 'Photographer',
    image: '/sam-obisanya.jpg',
  },
];

export default function AboutUs() {
  return (
    <div className="bg-[#603749] text-white py-16 px-8">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-8">About Us</h1>
        <Image src="/HUGO BOSS will equip the German record champions 1.svg" width={800} height={400} alt="About Us Banner" className="mx-auto rounded-lg" />
        <p className="mt-6 text-lg">
          Welcome to Shelter, your trusted partner in finding your dream property. Whether you&apos;re searching for a cozy home, a luxurious estate, or a profitable investment property, we've got you covered.
        </p>
        <p className="mt-4 text-lg">
          At Shelter, we combine technology, market expertise, and a passion for exceptional service to deliver a seamless real estate experience. Our platform is designed to connect buyers, sellers, and renters with the right opportunities.
        </p>
        <button className="mt-6 px-6 py-3 bg-white text-[#603749] font-semibold rounded-lg shadow-md">Contact Us</button>
      </div>

      <div className="mt-16 flex justify-center gap-12 text-center">
        <div>
          <h2 className="text-4xl font-bold">20+</h2>
          <p>Years of Experience</p>
        </div>
        <div>
          <h2 className="text-4xl font-bold">1,000+</h2>
          <p>Projects Done</p>
        </div>
      </div>

      <div className="mt-16 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center">Why Choose Us?</h2>
        <ul className="mt-6 text-lg space-y-3 list-disc list-inside">
          <li><strong>Extensive Listings:</strong> Explore a wide range of properties, from residential to commercial, all in one place.</li>
          <li><strong>Personalized Search:</strong> Our smart filters make it easy to find properties that match your preferences and budget.</li>
          <li><strong>Local Expertise:</strong> With a team of experienced real estate professionals, we provide insights into market trends and neighborhood details.</li>
          <li><strong>Trusted Partners:</strong> We work with top agents and agencies to ensure quality service and reliable transactions.</li>
        </ul>
      </div>

      <div className="mt-16 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold">Meet The Brains</h2>
        <p className="mt-2 text-lg">These people work on making us the best!</p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <div key={member.name} className="text-center">
              <Image src={member.image} width={150} height={150} alt={member.name} className="mx-auto rounded-full border-4 border-white" />
              <h3 className="mt-4 text-xl font-semibold">{member.name}</h3>
              <p className="text-gray-300">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
