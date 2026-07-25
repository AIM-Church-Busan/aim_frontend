"use client"
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import OpenCloseButton from "@/components/common/buttons/OpenCloseButton";

const ServiceAccordionItem = ({ title, bgClassName = "bg-accent", textClassName = "text-black", children, isOpen: controlledOpen, onToggle}) => {
    const [isDesktop, setIsDesktop] = useState(false);
    const [internalOpen, setInternalOpen] = useState(false);
    const isControlled = controlledOpen !== undefined;
    const isOpen = isControlled ? controlledOpen : internalOpen;

    useEffect(() => {
        const mq = window.matchMedia("(min-width: 1280px)");
        setIsDesktop(mq.matches);
        const handler = (e) => setIsDesktop(e.matches);
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, []);

    const closeHeight = isDesktop ? "6rem" : "4rem";

    const handleToggle = (next) => {
        if (!isControlled) setInternalOpen(next);
        onToggle?.(next);
    };

    return (
        <motion.div
            initial={false}
            animate={{ height: isOpen ? "20rem" : closeHeight }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className={`w-full flex flex-col justify-between items-start px-4 rounded-lg xl:rounded-2xl overflow-hidden ${bgClassName}`}
        >
            <div className="w-full h-fit shrink-0 flex flex-row justify-between items-center py-4 xl:py-7"
                 onMouseEnter={() => handleToggle(true)}
            >
                <h4 className={`font-vietnam text-xl xl:text-4xl ${textClassName}`}>{title}</h4>
                <OpenCloseButton isOpen={isOpen} onToggle={handleToggle} />
            </div>

            <div className="w-full flex flex-col gap-6">
                {children}
            </div>
        </motion.div>
    );
};

export default ServiceAccordionItem;