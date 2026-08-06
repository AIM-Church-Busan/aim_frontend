"use client"

import React, { createContext, useContext, useState } from 'react'

const BannerContext = createContext(null);

export function BannerProvider({ children }) {
    const [isOpen, setIsOpen] = useState(true);
    const [dismissed, setDismissed] = useState(false);

    const closeBanner = () => setIsOpen(false);
    const openBanner   = () => setIsOpen(true);

    return (
        <BannerContext.Provider value={{ isOpen, setIsOpen, closeBanner, openBanner, dismissed, setDismissed }}>{ children }</BannerContext.Provider>
    )
}

export function useBanner() {
    const context = useContext(BannerContext);

    if (!context) {
        throw new Error("useBanner must be used within a BannerProvider");
    }

    return context;
}