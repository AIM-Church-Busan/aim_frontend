"use client"

import React from 'react'

const PrevNextButton = ({ state = "", onClick, disabled = false }) => {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className="h-12 w-12 flex justify-center items-center rounded-full bg-black/60 hover:bg-black/80 hover:scale-105 transition-all duration-300 ease-in-out z-30 disabled:opacity-30 disabled:pointer-events-none disabled:hover:scale-100"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 stroke-white"
                viewBox="0 0 48 48"
                transform={state === "next" ? undefined : "scale(-1,1)"}
            >
                <path
                    stroke="current"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="4"
                    d="m19 12l12 12l-12 12"
                />
            </svg>
        </button>
    )
}

export default PrevNextButton