"use client"

import React from 'react'
import Image from "next/image";
import Link from "next/link";

const SponsoredBanner = () => {
    return (
        <div className="w-full h-auto grid grid-cols-2 grid-rows-2 xl:flex xl:flex-row xl:justify-start xl:items-center gap-2 sm:gap-4 xl:gap-2 mt-12 sm:mt-0">
            <Link
                href="https://www.sooyoungro.org/main.jsp"
                className="flex items-center justify-center rounded-full xl:bg-beige-to-black px-4 py-2 xl:hover:bg-secondary/80 transition-all duration-300 ease-in-out"
            >
                <Image
                    src="/SooyoungroChurchLogo_mono.png"
                    alt="Sooyoungro Church"
                    width={100}
                    height={20}
                    className="w-auto h-8 max-w-full"
                />
            </Link>

            <Link
                href="https://www.sooyoungro.org/main/new-layout/syrteam/department7.jsp"
                className="font-vietnam font-bold text-gray-400 flex flex-row items-center gap-1 justify-center rounded-full xl:bg-beige-to-black px-5 py-2 xl:hover:bg-secondary/80 transition-all duration-300 ease-in-out"
            >
                <div className="w-auto h-8 max-w-full inline-flex items-center justify-center">
                    <p className="font-black">SIM &nbsp;</p>
                    <p className="text-[10px]">International <br/>Ministry</p>
                </div>
            </Link>

            <Link
                href="https://www.sooyoungro.org/main/new-layout/syrteam/department5.jsp"
                className="font-vietnam text-gray-400 flex items-center justify-center rounded-full xl:bg-beige-to-black px-5 py-2 xl:hover:bg-secondary/80 transition-all duration-300 ease-in-out"
            >
                <div className="w-auto h-8 max-w-full inline-flex items-center justify-center">
                    <p>통일 비전 공동체</p>
                </div>
            </Link>

            <Link
                href="https://gapck.org/"
                className="flex items-center justify-center rounded-full xl:bg-beige-to-black px-4 py-2 xl:hover:bg-secondary/80 transition-all duration-300 ease-in-out"
            >
                <Image
                    src="/PCKLogo_mono.png"
                    alt="PCK 대한 예수교 장로회"
                    width={100}
                    height={20}
                    className="w-auto h-8 max-w-full"
                />
            </Link>
        </div>
    )
}

export default SponsoredBanner