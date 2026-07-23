"use client"

import React, { useRef } from 'react'
import gsap from 'gsap'

const FlipWaveText = ({ children, className }) => {
    const containerRef = useRef(null);

    const handleHover = () => {
        const wrappers = containerRef.current.querySelectorAll(".char-wrapper");
        gsap.to(wrappers, {
            yPercent: -50,
            duration: 0.3,
            ease: "power2.inOut",
            stagger: 0.03,
        });
    };

    const handleLeave = () => {
        const wrappers = containerRef.current.querySelectorAll(".char-wrapper");
        gsap.to(wrappers, {
            yPercent: 0,
            duration: 0.3,
            ease: "power2.inOut",
            stagger: 0.03,
        });
    };

    const text = typeof children === "string" ? children : "";

    return (
        <h4
            className={className}
            ref={containerRef}
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
        >
            {text.split("").map((char, i) => (
                <span key={i} className="relative inline-block overflow-hidden h-[1em] align-bottom">
                    <span className="char-wrapper flex flex-col">
                        <span className="block leading-none">{char === " " ? "\u00A0" : char}</span>
                        <span className="block leading-none">{char === " " ? "\u00A0" : char}</span>
                    </span>
                </span>
            ))}
        </h4>
    );
};

export default FlipWaveText;