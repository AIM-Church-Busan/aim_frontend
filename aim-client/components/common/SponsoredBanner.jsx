"use client"

import React from 'react'
import Image from "next/image";
import Link from "next/link";

const SponsoredBanner = () => {
    return (
        <div className="w-full h-auto grid grid-cols-2 grid-rows-2 xl:flex xl:flex-row xl:justify-between xl:items-center gap-4 sm:gap-8 xl:gap-0 mt-8 sm:mt-0">
            <Link
                href="https://www.sooyoungro.org/main.jsp"
                className="flex items-center justify-center xl:justify-start"
            >
                <Image
                    src="/SooyounroChurchLogo.png"
                    alt="Sooyoungro Church"
                    width={200}
                    height={40}
                    className="w-auto h-auto max-w-full"
                />
            </Link>

            <Link
                href="https://www.sooyoungro.org/main/new-layout/syrteam/department7.jsp"
                className="font-vietnam font-bold text-foreground/60 flex flex-col justify-center items-center xl:items-start"
            >
                <p className="text-lg sm:text-2xl font-black">SIM</p>
                <p className="text-sm sm:text-base">International Ministry</p>
            </Link>

            <Link
                href="https://www.sooyoungro.org/main/new-layout/syrteam/department5.jsp"
                className="font-vietnam font-bold text-lg text-foreground/60 flex items-center justify-center xl:justify-start"
            >
                통일 비전 공동체
            </Link>

            <Link
                href="https://gapck.org/"
                className="flex items-center justify-center xl:justify-start"
            >
                <Image
                    src="/PCKLogo.svg"
                    alt="PCK 대한 예수교 장로회"
                    width={200}
                    height={40}
                    className="w-auto h-auto max-w-full"
                />
            </Link>
        </div>
    )
}

export default SponsoredBanner