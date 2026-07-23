"use client"

import React from 'react'
import { useRef, useState, useEffect } from "react"
import PlayPauseButton from "@/components/common/buttons/PlayPauseButton"
import Image from "next/image"
import Link from "next/link"
import ButtonC from "@/components/common/buttons/ButtonC"
import ButtonB from "@/components/common/buttons/ButtonB"
import CrossGrid from "@/components/CrossGrid";
import CircleGrid from "@/components/CircleGrid";

const HeroSection = () => {
    const videoRef = useRef(null);
    const [paused, setPaused] = useState(false);
    const [videoError, setVideoError] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleError = () => setVideoError(true);
        video.addEventListener("error", handleError);

        // Event Listener comes first before the src specification. - to prevent race condition
        video.src = "/main_intro.mp4";

        return () => video.removeEventListener("error", handleError);
    }, []);

    const togglePlay = () => {
        if (paused) {
            videoRef.current.play();
        } else {
            videoRef.current.pause();
        }
        setPaused(!paused);
    }

  return (
      <section id="hero" className="relative w-full h-screen bg-background">
          <div className="w-full h-full relative overflow-hidden">
              {videoError ? (
                      <Image
                        src="/main_intro_fallback.jpg"
                        alt="Members of Antioch International Ministry gathered in worship in Busan, South Korea"
                        fill
                        className="object-cover"
                        priority
                      />
                  ) : (
                      <>
                          <video ref={videoRef} loop autoPlay muted preload="auto"
                                 poster="/main_intro_poster.png"
                                 aria-label="Introduction video of Antioch International Ministry, an English-speaking international church in Busan, South Korea"
                                 className="w-full h-full z-0 object-cover"
                                 onError={(e) => {
                                     console.log("video error!", e);
                                     setVideoError(true);
                                 }}
                          />
                          <button
                              onClick={togglePlay}
                              aria-label={paused ? "Play background video" : "Pause background video"}
                              aria-pressed={!paused}
                              className="absolute bottom-12 right-8 xl:bottom-16 xl:right-14 2xl:bottom-16 2xl:right-32 z-20"
                          >
                              <PlayPauseButton paused={paused} />
                          </button>

                          {/* Black Layover */}
                          <div className="absolute top-0 left-0 w-full h-full z-4 bg-black/30"></div>
                      </>
              )}
          </div>

          {/* Flipping Motion Card */}
          <div className="hidden absolute bottom-3/5 left-0 w-full h-1/2 z-10 translate-y-1/2 xl:flex justify-between items-end pb-24
          xl:pb-8 pr-46 2xl:pr-56 pl-18 2xl:pl-34">
              <CircleGrid className="xl:w-46 xl:h-46 w-32 h-40" />
              <CrossGrid className="xl:w-48 xl:h-60 w-32 h-40" />
          </div>

          {/* Banners */}
          <div className="absolute bottom-0 left-0 w-full h-auto z-10 flex flex-col xl:flex-row items-start justify-between xl:px-16 2xl:px-32 py-16 xl:py-24 gap-6 xl:gap-0">
              { /* Left Banners */}
              <div className="
              w-autoflex flex-col items-center xl:items-start px-8 xl:px-0
              ">
                  <h1 className="text-6xl xl:text-7xl text-white font-roman text-start">
                      Antioch
                      <br/>
                      International
                      <br/>
                      Ministry
                  </h1>
              </div>

              {/* Right Banner*/}
              <div className="w-full xl:max-w-2xl flex flex-col items-start xl:items-end justify-end gap-6 px-8 xl:px-0">
                  <p className="text-start xl:text-end text-white text-lg xl:text-xl">
                      We are an English-speaking international church in Busan, South Korea.
                      Whether you're a student, expat, military family, or traveler, you'll find a warm community here.
                  </p>
                  <div className="flex flex-row gap-4">
                      <ButtonC href="/">PLAN YOUR VISIT</ButtonC>
                      <ButtonB href="/">LEARN MORE</ButtonB>
                  </div>
              </div>
          </div>
      </section>
  )
}

export default HeroSection