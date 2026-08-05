"use client"

import React, {useEffect, useState, useRef} from 'react'
import ServiceAccordionItem from "@/features/home/components/ServiceAccordionItem";
import LinkButton from "@/components/common/buttons/LinkButton";
import SponsoredBanner from "@/components/common/SponsoredBanner";
import Label from "@/components/common/Label";

const ServiceSection = () => {
    const [openItem, setOpenItem] = useState("sunday-morning");

    const toggleItem = (id) => (next) => setOpenItem(next ? id : null);

    const CARD_IDS = ["sunday-morning", "location", "welcoming-space", "childrens-ministry"];

  return (
    <section className="w-full xl:h-[120vh] relative flex flex-col bg-white-to-dark px-4 lg:px-24 2xl:px-36 pt-24 xl:pt-46 2xl:pt-80">
        <div className="w-full xl:h-full flex flex-col xl:flex-row justify-start xl:justify-between items-start">
            {/* Left Banner */}
            <div className="w-full xl:w-1/2 h-auto flex flex-col items-start mb-12 xl:mb-0 gap-4 xl:gap-12">
                <h1 className=" text-4xl lg:text-6xl xl:text-8xl text-foreground text-center xl:text-start">Join us for Sunday worship</h1>
                <p className="text-gray text-lg xl:text-xl text-center xl:text-start">
                    We gather each Sunday morning for worship, teaching, and community.
                    <br/>
                    Believers from every nation and language come together as one family to serve and worship.
                </p>
                <div className="w-full h-auto flex flex-row items-start justify-start gap-12">
                    <div className="w-fit h-auto flex flex-row items-center justify-start gap-4">
                        <div className="w-16 h-16 rounded-full flex flex-col justify-center items-center bg-accent">
                            <p className="leading-[0.9] text-center font-semibold font-anonymous">11<br/>AM</p>
                        </div>
                        <p className="font-semibold">
                            Every Sunday <br/> Ellev Building, 2F
                        </p>
                    </div>

                    <div className="w-fit h-auto flex flex-row items-center justify-start gap-4">
                        <div className="w-16 h-16 rounded-full flex flex-col justify-center items-center bg-accent">
                            <p className="leading-[0.9] text-center font-semibold font-anonymous">10<br/>AM</p>
                        </div>
                        <p className="font-semibold">
                            Children's Ministry <br/> Ellev Building, 15F
                        </p>
                    </div>
                </div>
                <div className="w-full h-fit">
                    <SponsoredBanner />
                </div>
            </div>

            {/* Right Banner*/}
            <div className="w-full xl:w-5/12 xl:h-auto flex flex-col justify-start items-stretch gap-2">
                <div className="card-wrapper w-full">
                    <div className="card w-full">
                        {/* Box 1 */}
                        <ServiceAccordionItem
                            title="Sunday Service"
                            bgClassName="bg-tertiary"
                            notchSize={90}
                            notchPosition="bottom-left"
                            isOpen={openItem === "sunday-morning"}
                            onToggle={toggleItem("sunday-morning")}
                        >
                            <p className=" text-lg xl:text-xl text-black pb-2" style={{ fontWeight: "500" }}>
                                We meet at 11 AM every Sunday B2. Come as you are and bring your friends.
                            </p>
                            <LinkButton href="/" iconColor="fill-primary" borderColor="border-transparent" bgColor="bg-secondary" positionClass="relative" />
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
                            notchSize={90}
                            notchPosition="bottom-left"
                        >
                            <div className="flex flex-col -mt-1">
                                <p className=" text-lg xl:text-xl text-black" style={{ fontWeight: "500" }}>27 Suyeong-ro 725beon gil, Ellev B2 Suyeong-Gu, Busan</p>
                                <p className=" text-lg xl:text-xl text-black pb-2" style={{ fontWeight: "500" }}>
                                    We're located in central Busan, easily accessible by public transportation and parking available.
                                </p>
                            </div>
                            <LinkButton href="/" iconColor="fill-primary" borderColor="border-transparent" bgColor="bg-secondary" positionClass="relative" />
                        </ServiceAccordionItem>
                    </div>
                </div>

                <div className="card-wrapper w-full">
                    <div className="card w-full">
                        {/* Box 3 */}
                        <ServiceAccordionItem
                            title="Welcoming Space"
                            bgClassName="bg-accent"
                            isOpen={openItem === "welcoming-space"}
                            onToggle={toggleItem("welcoming-space")}
                            notchSize={90}
                            notchPosition="bottom-left"
                        >
                            <p className="text-lg xl:text-xl text-black pb-2" style={{ fontWeight: "500" }}>
                                Join us for lunch and coffee after the service on the 2nd floor.
                            </p>
                            <LinkButton href="/" iconColor="fill-primary" borderColor="border-transparent" bgColor="bg-secondary" positionClass="relative" />
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
                            notchSize={90}
                            notchPosition="bottom-left"
                        >
                            <p className="text-lg xl:text-xl  text-primary pb-2" style={{ fontWeight: "500" }}>
                                15th floor before the 11:00am service.
                                <br/>
                                Pastor Will is serving ICM.
                            </p>
                            <LinkButton href="/" iconColor="fill-primary" borderColor="border-transparent" bgColor="bg-secondary" positionClass="relative" />
                        </ServiceAccordionItem>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default ServiceSection