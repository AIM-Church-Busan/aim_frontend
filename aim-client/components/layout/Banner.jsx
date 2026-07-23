"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useBanner } from '@/context/BannerContext'
import { useEvents } from "@/features/announcements/hooks/api/useEvents";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger);

const Banner = () => {
    const { isOpen, closeBanner, openBanner } = useBanner() // scroll control
    const [ dismissed, setDismissed] = useState(false) // Button Control
    const [ isRemoved, setIsRemoved ] = useState(false)

    const visible = isOpen && !dismissed;

    useEffect(() => {
        if (visible) setIsRemoved(false);
    }, [visible]);

    const { data, isLoading, isError } = useEvents(1);

    const bannerEvents = data?.data?.filter((e) => e.is_banner) ?? [];

    {/* Carousel index */}
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (bannerEvents.length === 0) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % bannerEvents.length);
        }, 8000);

        return () => clearInterval(interval);
    }, [bannerEvents.length]);

    useEffect(() => {
        const trigger = ScrollTrigger.create({
            trigger: "#hero",
            start: "bottom top",
            onEnter: () => closeBanner(),
            onLeaveBack: () => openBanner(),
        });

        return () => trigger.kill();
    }, []);

    if (isLoading) return <p>...</p>
    if (isError) return <p>Error loading events</p>

    const formatMonthDay = (isoString) => {
        const [, month, day] = isoString.split('T')[0].split('-');
        return `(${month}/${day})`;
    }

    const current = bannerEvents[currentIndex];

    if (!current) return null;

    {/* Banner Colors */}
    const banners = [
        { bg: "bg-accent", text: "text-black" },
        { bg: "bg-tertiary", text: "text-white" },
        { bg: "bg-[#f7f6f5]", text: "text-black" },
        { bg: "bg-[#222222]", text: "text-white" },
    ];

    const { bg: currentColor, text: currentTextColor } = banners[currentIndex % banners.length];

    return (
        <div className={`fixed top-0 left-0 z-50 w-full ${currentColor} ${currentTextColor} px-2 lg:px-8 py-2 flex flex-row justify-between items-center text-xs lg:text-sm
        ${visible ? "" : "slide-up"} ${isRemoved ? "hidden" : "block"}`}
             onAnimationEnd={() => {
                 if (!visible) setIsRemoved(true);
             }}
        >
            <Link href="/" className="flex flex-row w-auto max-h-full gap-1 lg:gap-2">
                <p key={current.id} className="underline">{current.title}</p>
                <p>{formatMonthDay(current.starts_at)} &gt;</p>
            </Link>
            <div className="w-auto max-h-full flex flex-row gap-4">
                <div className="w-auto max-h-full flex flex-row gap-2 lg:gap-4">
                    {current.external_link && (
                        <Link href={current.external_link} className="underline">
                            Sign Up
                        </Link>
                    )}
                </div>
                <button onClick={() => setDismissed(true)} className="cursor-pointer"> X </button>
            </div>
        </div>
    )
}

export default Banner