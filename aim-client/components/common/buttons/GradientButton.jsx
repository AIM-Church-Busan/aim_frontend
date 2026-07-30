"use client"

import React from "react"

const GradientButton = ({
                              children = "Continue",
                              onClick,
                              type = "button",
                              className = "",
                          }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`apple-gradient-btn text-white font-medium text-lg rounded-full px-8 py-3 transition-transform duration-100 active:scale-97 ${className}`}
        >
            {children}
            <style>{`
                .apple-gradient-btn {
                    background: linear-gradient(
                        135deg,
                        #000000,
                        #4a4a4a,
                        #000000
                    );
                    background-size: 300% 300%;
                    background-position: 0% 50%;
                    transition: background-position 0.8s ease;
                }
                .apple-gradient-btn:hover {
                    animation: appleGradientMove 2.5s ease infinite;
                }
                @keyframes appleGradientMove {
                    0% {
                        background-position: 0% 50%;
                    }
                    50% {
                        background-position: 100% 50%;
                    }
                    100% {
                        background-position: 0% 50%;
                    }
                }
            `}</style>
        </button>
    )
}

export default GradientButton