"use client"

import React from 'react'
import Link from "next/link";

const LinkButton = ({ href, iconColor = "fill-foreground", borderColor="border-foreground", bgColor="bg-transparent" }) => {
    return (
            <Link href={href} className={`h-8 w-8 xl:h-10 xl:w-10 flex justify-center items-center rounded-full ${bgColor} hover:scale-105 transition-all duration-300 ease-in-out border ${borderColor} border-2`}>
                <svg xmlns="http://www.w3.org/2000/svg" className={`w-5 h-5 xl:w-6 xl:h-6 ${iconColor}`} viewBox="0 0 16 16">
                    <path fill="current"  d="M7.5 3a.5.5 0 0 1 0-1h6a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V3.707L2.854 13.854a.5.5 0 0 1-.708-.708L12.293 3H7.5Z"/>
                </svg>
            </Link>

    )
}

export default LinkButton