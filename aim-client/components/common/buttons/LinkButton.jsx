"use client"

import React from 'react'
import Link from "next/link";

const LinkButton = ({ href, iconColor = "fill-foreground", borderColor="border-foreground", bgColor="bg-primary" }) => {
    return (
        <div className="w-[80px] h-[80px] -left-4 relative flex justify-start items-end overflow-visible">
            <svg id="notch" className="w-[100px] h-[100px] absolute top-[-20px] left-0 z-10 fill-white-to-dark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 693.73 688.5">
                <path className="fill-currentColor" d="M586.39,688.02v108.65H-107.34V102.94H-.2v90.28c0,57.29,46.44,103.73,103.73,103.73h152.96c79.1,0,134.37,35.5,134.37,128.41v155.72c0,59.06,47.88,106.94,106.94,106.94h88.59Z"/>
            </svg>
            <Link href={href} className={`z-20 h-12 w-12 flex justify-center items-center rounded-full hover:scale-105 transition-all duration-300 ease-in-out border ${borderColor} ${bgColor}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className={`w-6 h-6 ${iconColor}`} viewBox="0 0 16 16">
                    <path fill="current" d="M7.5 3a.5.5 0 0 1 0-1h6a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V3.707L2.854 13.854a.5.5 0 0 1-.708-.708L12.293 3H7.5Z"/>
                </svg>
            </Link>
        </div>
    )
}

export default LinkButton