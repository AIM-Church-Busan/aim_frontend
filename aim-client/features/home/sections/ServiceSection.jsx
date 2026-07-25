"use client"

import React, {useEffect, useState, useRef} from 'react'
import OpenCloseButton from "@/components/common/buttons/OpenCloseButton";
import ServiceAccordionItem from "@/features/home/components/ServiceAccordionItem";
import LinkButton from "@/components/common/buttons/LinkButton";
import SponsoredBanner from "@/components/common/SponsoredBanner";
import Label from "@/components/common/Label";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ServiceSection = () => {
    const sectionRef = useRef(null);
    const stackTriggerRef = useRef(null);
    const mobileTriggerRef = useRef(null);
    const sectionPinTriggerRef = useRef(null);
    const hasPlayedRef = useRef(false);

    const [openItem, setOpenItem] = useState("sunday-morning");

    const toggleItem = (id) => (next) => setOpenItem(next ? id : null);

    const CARD_IDS = ["sunday-morning", "location", "welcoming-space", "childrens-ministry"];

    {/* gsap animation - section pinning */}
    useEffect(() => {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 1280px)", () => {
            if (hasPlayedRef.current) return;

            const trigger = ScrollTrigger.create({
                trigger: sectionRef.current,
                start: "top top",
                end: "bottom top",
                pin: true,
                pinSpacing: true,
            });
            sectionPinTriggerRef.current = trigger;

            return () => {
                trigger.kill();
                sectionPinTriggerRef.current = null;
            };
        });

        return () => mm.revert();
    }, []);

    {/* gsap animation - card stack (desktop only) */}
    useEffect(() => {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 1280px)", () => {
            const cardWrappers = gsap.utils.toArray(".card-wrapper");
            const maxIndex = CARD_IDS.length - 1;

            if (hasPlayedRef.current) {
                gsap.set(cardWrappers, { y: 0 });
                if (sectionPinTriggerRef.current) {
                    sectionPinTriggerRef.current.kill();
                    sectionPinTriggerRef.current = null;
                }
                return; // 이번 마운트에서는 이미 봤으니 다시 안 함
            }

            gsap.set(cardWrappers.slice(1), { yPercent: 430 });

            // ---- 데스크톱: 휠 한 번(제스처 단위) = 카드 한 장 ----
            const tl = gsap.timeline({ paused: true });
            cardWrappers.forEach((wrapper, i) => {
                tl.to(wrapper, { yPercent: 0, ease: "none" }, i - 1);
            });

            let currentIndex = 0;
            let isAnimating = false;
            let gestureLocked = false;
            let wheelIdleTimer = null;

            const goTo = (idx) => {
                isAnimating = true;
                currentIndex = idx;
                setOpenItem(CARD_IDS[idx]);

                gsap.to(tl, {
                    progress: (idx + 1) / CARD_IDS.length,
                    duration: 0.7,
                    ease: "power2.inOut",
                    onComplete: () => {
                        isAnimating = false;
                        if (idx === maxIndex) {
                            hasPlayedRef.current = true;
                            window.removeEventListener("wheel", handleWheel); // 더 이상 가로채지 않음 → 자연스럽게 스크롤 진행
                        }
                    },
                });
            };

            const handleWheel = (e) => {
                if (!sectionPinTriggerRef.current?.isActive) return;

                // 이벤트 크기와 상관없이 항상 먼저 갱신 — "아직 제스처 진행 중"임을 표시
                clearTimeout(wheelIdleTimer);
                wheelIdleTimer = setTimeout(() => {
                    gestureLocked = false;
                }, 150);

                if (Math.abs(e.deltaY) < 4) {
                    e.preventDefault();
                    return;
                }

                if (isAnimating) {
                    e.preventDefault();
                    return;
                }

                if (!gestureLocked) {
                    if (e.deltaY > 0 && currentIndex < maxIndex) {
                        e.preventDefault();
                        gestureLocked = true;
                        goTo(currentIndex + 1);
                    } else if (e.deltaY < 0 && currentIndex > 0) {
                        e.preventDefault();
                        gestureLocked = true;
                        goTo(currentIndex - 1);
                    }
                } else {
                    e.preventDefault();
                }
            };

            window.addEventListener("wheel", handleWheel, { passive: false });

            return () => {
                window.removeEventListener("wheel", handleWheel);
                clearTimeout(wheelIdleTimer);
            };
        });

        return () => mm.revert();
    }, []);

  return (
    <section className="w-full xl:h-screen relative flex flex-col bg-white-to-dark px-8 xl:px-12 py-24 xl:py-32" ref={sectionRef}>
        <div className="w-full xl:h-full flex flex-col xl:flex-row justify-start xl:justify-between items-start xl:gap-0" ref={mobileTriggerRef}>
            {/* Left Banner */}
            <div className="w-full h-auto xl:h-10/12 flex flex-col justify-start xl:justify-between items-start pt-8 md:pt-36 xl:pt-12 xl:pr-12 mb-12 xl:mb-0">
                <div className="w-full h-auto xl:h-full flex flex-col gap-4 xl:gap-12">
                    <Label>SUNDAY SERVICE</Label>
                    <h1 className="font-roman font-semibold text-5xl xl:text-8xl text-foreground">Join us for <br/> Sunday worship</h1>
                    <p className="text-gray font-vietnam text-lg xl:text-xl">
                        We gather each Sunday morning for worship, teaching, and community.
                        <br/>
                        All are welcome.
                    </p>
                </div>
                <div className="w-full h-auto">
                    <SponsoredBanner />
                </div>
            </div>

            {/* Right Banner*/}
            <div className="w-full xl:h-full flex flex-col justify-start items-stretch gap-2 pt-0 xl:pt-12" ref={stackTriggerRef}>
                <div className="card-wrapper w-full">
                    <div className="card w-full">
                        {/* Box 1 */}
                        <ServiceAccordionItem
                            title="Sunday Morning"
                            bgClassName="bg-accent"
                            isOpen={openItem === "sunday-morning"}
                            onToggle={toggleItem("sunday-morning")}
                        >
                            <p className="font-vietnam text-base xl:text-xl text-black">
                                We meet at 11 AM every Sunday B2. Come as you are and bring your friends.
                            </p>
                            <LinkButton href="/" iconColor="fill-white" borderColor="border-black" bgColor="bg-black"/>
                        </ServiceAccordionItem>
                    </div>
                </div>

                <div className="card-wrapper w-full">
                    <div className="card w-full">
                        {/* Box 2 */}
                        <ServiceAccordionItem
                            title="Location"
                            bgClassName="bg-beige-to-gray"
                            isOpen={openItem === "location"}
                            onToggle={toggleItem("location")}
                        >
                            <div className="flex flex-col gap-2">
                                <p className="font-vietnam text-base xl:text-xl text-black">27 Suyeong-ro 725beon gil, Ellev B2 Suyeong-Gu, Busan</p>
                                <p className="font-vietnam text-base xl:text-xl text-black">
                                    We're located in central Busan, easily accessible by public transportation and parking available.
                                </p>
                            </div>
                            <LinkButton href="/" iconColor="fill-black" borderColor="border-black" />
                        </ServiceAccordionItem>
                    </div>
                </div>

                <div className="card-wrapper w-full">
                    <div className="card w-full">
                        {/* Box 3 */}
                        <ServiceAccordionItem
                            title="Welcoming Space"
                            bgClassName="bg-tertiary"
                            isOpen={openItem === "welcoming-space"}
                            onToggle={toggleItem("welcoming-space")}
                        >
                            <p className="font-vietnam text-base xl:text-xl text-black">
                                Join us for lunch and coffee after the service on the 2nd floor.
                            </p>
                            <LinkButton href="/" iconColor="fill-black" borderColor="border-black" />
                        </ServiceAccordionItem>
                    </div>
                </div>

                <div className="card-wrapper w-full">
                    <div className="card w-full">
                        {/* Box 4 */}
                        <ServiceAccordionItem
                            title="Children's Ministry"
                            bgClassName="bg-foreground"
                            textClassName="text-primary"
                            isOpen={openItem === "childrens-ministry"}
                            onToggle={toggleItem("childrens-ministry")}
                        >
                            <p className="font-vietnam text-base xl:text-xl text-primary">
                                15th floor before the 11:00am service.
                                <br/>
                                Pastor Will is serving ICM.
                            </p>
                            <LinkButton href="/" iconColor="fill-primary" borderColor="border-primary"/>
                        </ServiceAccordionItem>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default ServiceSection