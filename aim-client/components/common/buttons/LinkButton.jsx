"use client"
import React from 'react'
import Link from "next/link";

const POSITION_CLASS = {
    "bottom-left": "-left-2 bottom-2",
    "bottom-right": "-right-2 bottom-2",
    "top-left": "-left-2 top-2",
    "top-right": "right-2 top-2",
}

const LinkButton = ({
                        href,
                        iconColor = "fill-primary",
                        borderColor = "border-foreground",
                        bgColor = "bg-secondary",
                        position = "bottom-left",
                        positionClass = "absolute"
                    }) => {
    return (
        <div className={`${POSITION_CLASS[position]} ${positionClass} flex justify-start items-end overflow-visible`}>
            <Link href={href} className={`z-20 h-12 w-12 flex justify-center items-center rounded-full hover:scale-110 transition-all duration-300 ease-in-out border ${borderColor} ${bgColor}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className={`w-6 h-6 ${iconColor}`} viewBox="0 0 16 16">
                    <path fill="current" d="M7.5 3a.5.5 0 0 1 0-1h6a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V3.707L2.854 13.854a.5.5 0 0 1-.708-.708L12.293 3H7.5Z"/>
                </svg>
            </Link>
        </div>
    )
}

export default LinkButton