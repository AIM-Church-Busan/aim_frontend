"use client"

import React, { useRef } from 'react'
import gsap from 'gsap'
import { SplitText } from "gsap/SplitText"
import Link from "next/link"

gsap.registerPlugin(SplitText);

const WaveText = ({ children, href, className }) => {
    const textRef = useRef(null);

    const handleHover = () => {
        const split = SplitText.create(textRef.current, { type: "chars" });

        gsap.to(split.chars, {
            y: -10,
            duration: 0.2,
            ease: "sine.inOut",
            stagger: {
                each: 0.01,
                yoyo: true,
                repeat: 1,
            },
            onComplete: () => split.revert(),
        });
    };

  return (
    <Link href={href} className={className} onMouseEnter={handleHover}
    >
        <span ref={textRef}>{children}</span>
    </Link>
  )
}

export default WaveText