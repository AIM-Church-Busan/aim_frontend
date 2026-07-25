"use client"

import React from 'react'
import HeroSection from './sections/HeroSection'
import ServiceSection from './sections/ServiceSection'
import SermonSection from './sections/SermonSection'

const HomePage = () => {
  return (
      <div className="w-full h-auto bg-background overflow-x-hidden">
          <HeroSection />
          <ServiceSection />
          <SermonSection />
      </div>
  )
}

export default HomePage