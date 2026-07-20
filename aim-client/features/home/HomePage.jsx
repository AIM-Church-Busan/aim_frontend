"use client"

import React from 'react'
import HeroSection from './sections/HeroSection'
import ServiceSection from './sections/ServiceSection'

const HomePage = () => {
  return (
      <div className="w-full h-auto bg-background overflow-x-hidden">
          <HeroSection />
          <ServiceSection />
      </div>
  )
}

export default HomePage