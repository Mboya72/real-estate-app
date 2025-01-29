import React from 'react'
import Navbar from './navbar'
import Hero from './hero'

const Homepage = () => {
  return (
    <div className="bg-[url('/1.jpg')] bg-scroll bg-cover bg-center h-screen w-full">
      <Navbar/>
      <Hero/>
    </div>
  )
}

export default Homepage
