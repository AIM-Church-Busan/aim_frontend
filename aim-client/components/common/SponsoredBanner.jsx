"use client"

import React from 'react'
import Image from "next/image";
import Link from "next/link";

const SponsoredBanner = () => {
  return (
    <div className="w-full h-auto grid-rows-2 xl:relative xl:flex xl:flex-row xl:justify-between items-center gap-4 sm:gap-8 xl:gap-0 mt-8 sm:mt-0 border border-blue-500">
        <Link
            href="https://www.sooyoungro.org/main.jsp"
            className="order-1 border border-red-500"
        >
            <Image
                src="/SooyounroChurchLogo.png"
                alt="Sooyoungro Church"
                width={200}
                height={40}
                className="w-full h-full"
            />
        </Link>
        <Link
            href="https://www.sooyoungro.org/main/new-layout/syrteam/department7.jsp"
            className="font-vietnam font-bold text-foreground/60 order-2 flex flex-col justify-center items-center xl:items-start w-auto"
        >
            <p className="text-lg sm:text-2xl font-black">SIM </p>
            <p className="text-sm sm:text-base">International Ministry</p>
        </Link>
        <Link
            href="https://www.sooyoungro.org/main/new-layout/syrteam/department5.jsp"
            className="font-vietnam font-bold text-lg order-3 text-foreground/60"
        >
            통일 비전 공동체
        </Link>
        <Link
            href="https://gapck.org/"
            className="order-4 w-full"
        >
            <Image
                src="/PCKLogo.svg"
                alt="PCK 대한 예수교 장로회"
                width={200}
                height={40}
                className="col-span-1"
            />
        </Link>
    </div>
  )
}

export default SponsoredBanner