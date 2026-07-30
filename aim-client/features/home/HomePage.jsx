"use client"

import React from 'react'
import HeroSection from './sections/HeroSection'
import ServiceSection from './sections/ServiceSection'
import SermonSection from './sections/SermonSection'
import SubscribeSection from "@/features/home/sections/SubscribeSection";

const HomePage = () => {
  return (
      <div className="w-full h-auto bg-background overflow-x-hidden">
          <HeroSection />
          <ServiceSection />
          <SermonSection />
          <SubscribeSection />
      </div>
  )
}

export default HomePage