"use client"
import { motion } from "framer-motion";
import { useState } from "react";

const OpenCloseButton = ({ isOpen: controlledOpen, onToggle, defaultOpen = false, className = "" }) => {
    const [internalOpen, setInternalOpen] = useState(defaultOpen);
    const isControlled = controlledOpen !== undefined;
    const isOpen = isControlled ? controlledOpen : internalOpen;

    const handleClick = () => {
        const next = !isOpen;
        if (!isControlled) setInternalOpen(next);
        onToggle?.(next);
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close" : "Open"}
            className={`relative flex items-center justify-center size-8 xl:size-10 cursor-pointer bg-primary rounded-full ${className}`}
        >
            {/* 가로 바 — 0deg에서 45deg로 회전 */}
            <motion.span
                className="absolute h-0.5 w-3 xl:w-4 bg-secondary"
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.45, ease: "easeInOut" }}
            />
            {/* 세로 바 — -90deg에서 45deg로 회전 (같은 duration, 같은 timing으로 동시 재생) */}
            <motion.span
                className="absolute h-0.5 w-3 xl:w-4 bg-secondary"
                animate={{ rotate: isOpen ? 180 : 90 }}
                transition={{ duration: 0.45, ease: "easeInOut" }}
            />
        </button>
    );
};

export default OpenCloseButton;