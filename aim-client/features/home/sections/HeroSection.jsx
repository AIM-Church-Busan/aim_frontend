"use client"

import React from 'react'
import { useRef, useState, useEffect } from "react"
import PlayPauseButton from "@/components/common/buttons/PlayPauseButton"
import Image from "next/image"

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
      <section className="w-full h-full bg-background relative overflow-hidden">
          <div className="w-full h-full relative overflow-hidden">
              {videoError ? (
                      <Image
                        src="/main_intro_fallback.jpg"
                        alt="fallback"
                        fill
                        className="object-cover"
                        priority
                      />
                  ) : (
                      <>
                          <video ref={videoRef} loop autoPlay muted
                                 className="w-full h-full z-0 object-cover"
                                 onError={(e) => {
                                     console.log("video error!", e);
                                     setVideoError(true);
                                 }}
                          />
                          <button
                              onClick={togglePlay}
                              className="absolute bottom-10 right-16 z-10"
                          >
                              <PlayPauseButton paused={paused} />
                          </button>
                      </>
              )}
          </div>
      </section>
  )
}

export default HeroSection