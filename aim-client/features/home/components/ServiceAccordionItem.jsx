"use client"
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import OpenCloseButton from "@/components/common/buttons/OpenCloseButton";
import LiquidBox from "@/components/LiquidBox";

const ServiceAccordionItem = ({
                                  title,
                                  bgClassName = "bg-accent",
                                  textClassName = "text-black",
                                  notchSize = 48,
                                  notchPosition = "bottom-right",
                                  notchOpenDelay = 0,
                                  notchCloseDelay = 0,
                                  children,
                                  isOpen: controlledOpen,
                                  onToggle
                              }) => {
    const [isDesktop, setIsDesktop] = useState(false);
    const [internalOpen, setInternalOpen] = useState(false);
    const [showNotch, setShowNotch] = useState(false);
    const timeoutRef = useRef(null);

    const isControlled = controlledOpen !== undefined;
    const isOpen = isControlled ? controlledOpen : internalOpen;

    useEffect(() => {
        const mq = window.matchMedia("(min-width: 1280px)");
        setIsDesktop(mq.matches);
        const handler = (e) => setIsDesktop(e.matches);
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, []);

    useEffect(() => {
        clearTimeout(timeoutRef.current);
        const delay = isOpen ? notchOpenDelay : notchCloseDelay;
        timeoutRef.current = setTimeout(() => {
            setShowNotch(isOpen);
        }, delay);
        return () => clearTimeout(timeoutRef.current);
    }, [isOpen, notchOpenDelay, notchCloseDelay]);

    const closeHeight = isDesktop ? "6rem" : "4rem";

    const handleToggle = (next) => {
        if (!isControlled) setInternalOpen(next);
        onToggle?.(next);
    };

    const innerClassName = `w-full h-full flex flex-col justify-between items-start px-4 rounded-lg xl:rounded-2xl ${bgClassName}`;

    const header = (
        <div
            className="w-full h-fit shrink-0 flex flex-row justify-between items-center py-4 xl:py-7"
            onMouseEnter={() => handleToggle(true)}
        >
            <h4 className={`font-vietnam text-xl xl:text-4xl ${textClassName}`}>{title}</h4>
            <OpenCloseButton isOpen={isOpen} onToggle={handleToggle} />
        </div>
    );

    const body = (
        <div className="w-full flex flex-col gap-6">
            {children}
        </div>
    );

    return (
        <motion.div
            initial={false}
            animate={{ height: isOpen ? "16rem" : closeHeight }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="w-full rounded-lg xl:rounded-2xl"
        >
            <LiquidBox
                className={innerClassName}
                notchSize={notchSize}
                position={notchPosition}
                showNotch={showNotch}
            >
                {header}
                {body}
            </LiquidBox>
        </motion.div>
    );
};

export default ServiceAccordionItem;