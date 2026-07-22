"use client"

import React, { createContext, useContext, useState } from 'react'

const BannerContext = createContext(null);

export function BannerProvider({ children }) {
    const [isOpen, setIsOpen] = useState(true);

    const closeBanner = () => setIsOpen(false);
    const toggleBanner = () => setIsOpen((prev) => !prev);

    return (
        <BannerContext.Provider value={{ isOpen, setIsOpen, closeBanner, toggleBanner }}>{ children }</BannerContext.Provider>
    )
}

export function useBanner() {
    const context = useContext(BannerContext);

    if (!context) {
        throw new Error("useBanner must be used within a BannerProvider");
    }

    return context;
}