"use client"

import React, { useState, useMemo, useEffect, useRef } from 'react'
import { useBulletins} from "@/features/home/hooks/api/useBulletins";
import { useEvents } from "@/features/announcements/hooks/api/useEvents";
import { useAnnouncements } from "@/features/announcements/hooks/api/useAnnouncement";
import GradientButton from "@/components/common/buttons/GradientButton";
import DOMPurify from "dompurify";
import LiquidBox from "@/components/LiquidBox";
import LinkButton from "@/components/common/buttons/LinkButton";
import PrevNextButton from "@/components/common/buttons/PrevNextButton";

const SubscribeSection = () => {
    /* Data */
    const [ email, setEmail ] = useState("");
    const bulletins = useBulletins();
    const announcements = useAnnouncements();
    const events = useEvents();

    /* Scroll Action - refs/state만 먼저 선언 */
    const containerRef = useRef(null);
    const [isAtStart, setIsAtStart] = useState(true);
    const [isAtEnd, setIsAtEnd] = useState(false);
    const [thumb, setThumb] = useState({ width: 0, left: 0 });
    const isDraggingThumb = useRef(false);
    const dragStartX = useRef(0);
    const dragStartScrollLeft = useRef(0);

    const scrollNext = () => {
        containerRef.current?.scrollBy({ left: 450, behavior: "smooth" });
    };

    const scrollPrev = () => {
        containerRef.current?.scrollBy({ left: -450, behavior: "smooth" });
    };

    const handleThumbMouseDown = (e) => {
        e.preventDefault();
        isDraggingThumb.current = true;
        dragStartX.current = e.clientX;
        dragStartScrollLeft.current = containerRef.current.scrollLeft;

        const handleMouseMove = (e) => {
            if (!isDraggingThumb.current || !containerRef.current) return;
            const { scrollWidth, clientWidth } = containerRef.current;
            const deltaX = e.clientX - dragStartX.current;
            const scrollRatio = scrollWidth / clientWidth;
            containerRef.current.scrollLeft = dragStartScrollLeft.current + deltaX * scrollRatio;
        };

        const handleMouseUp = () => {
            isDraggingThumb.current = false;
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
    };

    /* Banner Data */
    const queries = [bulletins, announcements, events];
    const isLoading = queries.some(q => q.isLoading);
    const isError = queries.some(q => q.isError);

    const banners = useMemo(() => {
        if (isLoading || isError) return [];

        const combined = [
            ...bulletins.data.map(b => ({ ...b, type: "bulletin" })),
            ...announcements.data.data.map( a => ({ ...a, type: "announcement" })),
            ...events.data.data.map( e => ({ ...e, type: "event" })),
        ];

        return combined.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at)).slice(0, 16);
    }, [ bulletins, announcements.data, events.data, isLoading, isError ]);

    /* banners 선언 이후에 위치시킨 스크롤 리스너 useEffect */
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const handleScroll = () => {
            const { scrollWidth, clientWidth, scrollLeft } = el;
            setIsAtStart(scrollLeft <= 0);
            setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 1);
            setThumb({
                width: (clientWidth / scrollWidth) * 100,
                left: (scrollLeft / scrollWidth) * 100,
            });
        };

        handleScroll();
        el.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleScroll);
        return () => {
            el.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleScroll);
        };
    }, [banners]);

    if (isLoading) return <p>Loading...</p>
    if (isError) return <p>Error!</p>;

    /* Subscribe form submit */
    const subscribe = (e) => {
        e.preventDefault();
        console.log(email);
    }

    return (
        <section className="w-auto h-auto lg:h-[90vh] xl:h-[80vh] relative flex flex-col md:flex-row xl:items-center bg-white-to-dark pb-26 2xl:pb-34 gap-12 xl:gap-0 pt-24 xl:pt-0 px-4 lg:px-0">
            {/* Left Banner */}
            <div className="w-full md:w-1/2 xl:w-1/3 h-fit md:h-full flex md:items-start mr-0 lg:mr-14 pl-4 lg:pl-8 xl:pl-24 2xl:pl-36">
                <div className="w-full h-full md:h-10/12 xl:h-full flex flex-col items-start gap-4 md:gap-8 xl:gap-22">
                    <div className="w-full h-auto flex flex-col gap-4 xl:gap-6">
                        <h1 className="text-5xl md:text-6xl text-secondary">
                            Join Us.
                            <br/>
                            Come Along.
                            <br/>
                            Stay Close.
                        </h1>
                        <p className=" text-gray dark:text-white text-lg xl:text-xl">
                            Subscribe to our newsletter and never miss what's happening in our church family. From upcoming events to announcements and weekly bulletins, we'll keep you in the loop.
                        </p>
                    </div>
                    <form
                        onSubmit={subscribe}
                        className="w-full h-auto flex flex-col lg:flex-row gap-2 lg:gap-0"
                    >
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full h-14 bg-beige border-gray-400 border py-2 text-sm md:text-lg font-anonymous placeholder:text-gray-400 dark:placeholder:text-gray-200 text-secondary rounded-full px-6"
                            placeholder="Email Adress"
                        />
                        <GradientButton type="subsribe" className="w-full lg:w-40 h-14">Subscribe</GradientButton>
                    </form>
                </div>
            </div>

            {/* List Banner */}
            <div className="flex-1 xl:h-11/12 flex gap-4 overflow-x-auto scrollbar-none" ref={containerRef}>
                {banners && banners.map(b => {
                    const thumbnail = (b) => {
                        if (b.thumbnail_url) return b.thumbnail_url;
                        if (b.thumbnail_path) return `https://aim-backend-cbiu.onrender.com/storage/${b.thumbnail_path}`;
                        return "/logo.png";
                    };

                    const content = (b) => {
                        let text;
                        if (b.type === "bulletin") text = b.content;
                        else if (b.type === "announcement") text = b.description;
                        else if (b.type === "event") text = b.description;

                        if (!text) return text;

                        return text.length >= 100 ? text.slice(0, 100) + " ..." : text;
                    }

                    const label = (b) => {
                        if (b.type === "bulletin") return "Bulletin";
                        if (b.type === "announcement") return "Announcement";
                        if (b.type === "event") return "Event";
                    }

                    const createdAt = (b) => {
                        const date = b.updated_at;
                        const formatted = date.slice(0,10).replaceAll("-", ".");

                        return formatted;
                    }

                    return (
                        <div
                            className="w-full xl:w-auto xl:aspect-square shrink-0 h-full xl:h-3/4 flex flex-col items-start"
                            key={`${b.type}-${b.id}`}
                        >
                            {/* Thumbnail*/}
                            <LiquidBox
                                position="top-right"
                                className="w-full  min-h-60 lg:min-h-50 2xl:min-h-60 relative rounded-2xl overflow-hidden"
                                backgroundImage={thumbnail(b)}
                                notchSize={90}
                            >
                                <LinkButton href="/" position="top-right" />
                            </LiquidBox>

                            {/* Body */}
                            <div className="flex-1 w-full flex flex-col justify-start gap-4">
                                <div className="w-fit px-3 py-1 text-secondary rounded-md bg-beige-to-black mb-2 mt-6">
                                    <p className="font-anonymous font-semibold tracking-wider">{label(b)}</p>
                                </div>
                                <h1 className="text-2xl text-secondary" style={{ fontWeight: "500" }}>{b.title}</h1>
                                <div
                                    className=" text-secondary text-sm md:text-lg 2xl:text-xl"
                                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content(b)) }}
                                />
                                <p className="text-gray-400">{createdAt(b)}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
            {/* Draggable Scrollbar */}
            <div className="absolute right-0 bottom-12 lg:bottom-26 xl:bottom-16 2xl:bottom-40 w-1/2 xl:w-2/3 px-20 xl:px-12 xl:pr-24 2xl:pr-36">
                <div className="relative w-full h-1.5 bg-gray-200 rounded-full mt-4 xl:mt-6">
                    <div
                        className="absolute top-1/2 -translate-y-1/2 h-2 bg-secondary rounded-full cursor-grab active:cursor-grabbing"
                        style={{ width: `${thumb.width}%`, left: `${thumb.left}%` }}
                        onMouseDown={handleThumbMouseDown}
                    />
                </div>
            </div>
        </section>
    )
}

export default SubscribeSection