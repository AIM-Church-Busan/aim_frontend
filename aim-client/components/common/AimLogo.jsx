"use client"
import { useId } from "react";

const AimLogo = ({ className }) => {
    const maskId = useId();

    return (
        <svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" className={className}>
            <mask id={maskId}>
                <rect x="0" y="0" width="300" height="300" fill="white"/>
                <path
                    d="M155 70 H175 V110 H205 V130 H175 V230 H155 V130 H125 V110 H155 Z"
                    fill="black"
                />
                <circle cx="118" cy="178" r="16" fill="black"/>
            </mask>

            <g mask={`url(#${maskId})`}>
                <rect
                    x="60" y="60" width="180" height="180" rx="40"
                    transform="rotate(45 150 150)"
                    className="group-hover/11:fill-foreground fill-foreground/80 transition-all duration-300 ease"
                />
            </g>
        </svg>
    );
};

export default AimLogo;