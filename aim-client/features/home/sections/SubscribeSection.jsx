"use client"

import React, { useState, useMemo } from 'react'
import { useBulletins} from "@/features/home/hooks/api/useBulletins";
import { useEvents } from "@/features/announcements/hooks/api/useEvents";
import { useAnnouncements } from "@/features/announcements/hooks/api/useAnnouncement";
import GradientButton from "@/components/common/buttons/GradientButton";
import Image from "next/image";
import DOMPurify from "dompurify";
import LiquidBox from "@/components/LiquidBox";
import LinkButton from "@/components/common/buttons/LinkButton";

const SubscribeSection = () => {
    const [ email, setEmail ] = useState("");
    const bulletins = useBulletins();
    const announcements = useAnnouncements();
    const events = useEvents();

    /* Banner Data */
    const queries = [bulletins, announcements, events];
    const isLoading = queries.some(q => q.isLoading);
    const isError = queries.some(q => q.isError);

    // Using useMemo to make sure it doesn't get sorted again everytime it re-renders.
    const banners = useMemo(() => {
        if (isLoading || isError) return [];

        const combined = [
            ...bulletins.data.map(b => ({ ...b, type: "bulletin" })),
            ...announcements.data.data.map( a => ({ ...a, type: "announcement" })),
            ...events.data.data.map( e => ({ ...e, type: "event" })),
        ];

        return combined.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
    }, [ bulletins, announcements.data, events.data, isLoading, isError ]);

    console.log(banners);

    if (isLoading) return <p>Loading...</p>
    if (isError) return <p>Error!</p>;

    /* Subscribe form submit */
    const subscribe = (e) => {
        e.preventDefault();
        console.log(email);
    }

    return (
        <section className="w-auto h-screen relative flex flex-col md:flex-row bg-white-to-dark px-8 xl:px-12 pt-30 xl:pt-40 pb-20 xl:pb-26">
            {/* Left Banner */}
            <div className="w-full md:w-1/2 xl:w-1/4 h-fit md:h-full flex md:items-end mr-0 md:mr-14">
                <div className="w-full h-full md:h-10/12 xl:h-full 2xl:h-10/12 flex flex-col justify-between items-start gap-4 md:gap-8 xl:gap-0">
                    <div className="w-full h-auto flex flex-col gap-4 xl:gap-6">
                        <h1 className="font-vietnam text-4xl text-secondary">
                            Join Us.
                            <br/>
                            Come Along.
                            <br/>
                            Stay Close.
                        </h1>
                        <p className="font-vietnam text-gray dark:text-white text-lg">
                            Subscribe to our newsletter and never miss what's happening in our church family. From upcoming events to announcements and weekly bulletins, we'll keep you in the loop.
                        </p>
                    </div>
                    <form
                        onSubmit={subscribe}
                        className="w-full h-auto flex flex-col justify-between items-stretch gap-3"
                    >
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-beige py-2 text-lg font-anonymous placeholder:text-gray-400 dark:placeholder:text-gray-200 text-secondary rounded-lg px-4"
                            placeholder="Email Adress"
                        />
                        <div className="w-full inline-flex gap-3">
                            <GradientButton type="subsribe" className="w-full">Subscribe</GradientButton>
                            <button type="button" className="aspect-square p-2 rounded-full bg-gray-200 transition-all duration-300 hover:scale-105 ease-in-out active:scale-97">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="fill-black"><path fill="current" fillRule="evenodd" d="M3.172 5.172C2 6.343 2 8.229 2 12c0 3.771 0 5.657 1.172 6.828C4.343 20 6.229 20 10 20h4c3.771 0 5.657 0 6.828-1.172C22 17.657 22 15.771 22 12c0-3.771 0-5.657-1.172-6.828C19.657 4 17.771 4 14 4h-4C6.229 4 4.343 4 3.172 5.172ZM18.576 7.52a.75.75 0 0 1-.096 1.056l-2.196 1.83c-.887.74-1.605 1.338-2.24 1.746c-.66.425-1.303.693-2.044.693c-.741 0-1.384-.269-2.045-.693c-.634-.408-1.352-1.007-2.239-1.745L5.52 8.577a.75.75 0 0 1 .96-1.153l2.16 1.799c.933.777 1.58 1.315 2.128 1.667c.529.34.888.455 1.233.455c.345 0 .704-.114 1.233-.455c.547-.352 1.195-.89 2.128-1.667l2.159-1.8a.75.75 0 0 1 1.056.097Z" clipRule="evenodd"/></svg>
                            </button>
                        </div>

                    </form>
                </div>
            </div>

            {/* List Banner */}
            <div className="flex-1 flex gap-4 overflow-x-auto">
                {banners && banners.map(b => {
                    const thumbnail = (b) => {
                        if (b.thumbnail_url) return b.thumbnail_url;
                        if (b.thumbnail_path) return `https://aim-backend-cbiu.onrender.com/storage/${b.thumbnail_path}`;
                        return "/logo.png";
                    };

                    const content = (b) => {
                        if (b.type === "bulletin") return b.content;
                        if (b.type === "announcement") return b.description;
                        if (b.type === "event") return b.description;
                    }

                    return (
                        <div
                            className="w-full xl:w-auto xl:aspect-square shrink-0 h-full xl:h-3/4 flex flex-col items-start gap-4"
                            key={`${b.type}-${b.id}`}
                        >
                            {/* Thumbnail*/}
                            <LiquidBox
                                position="top-right"
                                className="flex-1 w-full relative rounded-2xl overflow-hidden"
                                backgroundImage={thumbnail(b)}
                                notchSize={90}
                            >
                                <LinkButton href="/" position="top-right" />
                            </LiquidBox>

                            {/* Body */}
                            <div className="flex-1 w-full flex flex-col justify-start gap-4">
                                <h1 className="text-2xl font-vietnam text-secondary">{b.title}</h1>
                                <div
                                    className="font-vietnam text-secondary"
                                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content(b)) }}
                                />
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

export default SubscribeSection