"use client";

import { Button, useMediaQuery } from "@relume_io/relume-ui";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RxChevronDown, RxChevronRight } from "react-icons/rx";
import ButtonA from "@/components/common/buttons/ButtonA"
import ButtonC from "@/components/common/buttons/ButtonC"
import { useBanner } from '@/context/BannerContext'
import FlipText from "@/components/common/effects/FlipText"
import AimLogo from "@/components/common/AimLogo";
import FlipWaveText from "@/components/common/effects/FlipWaveText";

const useRelume = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);       // 모바일 "Link Four" 아코디언 전용
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false); // 데스크톱 More 메가메뉴 전용
  const isMobile = useMediaQuery("(max-width: 991px)");

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  const openOnMobileDropdownMenu = () => setIsDropdownOpen((prev) => !prev);
  const openOnDesktopDropdownMenu = () => { !isMobile && setIsDropdownOpen(true); };
  const closeOnDesktopDropdownMenu = () => { !isMobile && setIsDropdownOpen(false); };

  const openOnMobileMoreDropdownMenu = () => setIsMoreDropdownOpen((prev) => !prev);
  const openOnDesktopMoreDropdownMenu = () => { !isMobile && setIsMoreDropdownOpen(true); };
  const closeOnDesktopMoreDropdownMenu = () => { !isMobile && setIsMoreDropdownOpen(false); };

  {/* Lock body scroll when mobile menu is opened */}
  useEffect(() => {
    if (isMobileMenuOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    }
  }, [isMobileMenuOpen]);

  {/* Close opened menus with esc key */}
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key !== "Escape") return;
      if (isMobileMenuOpen) setIsMobileMenuOpen(false);
      if (isDropdownOpen) setIsDropdownOpen(false);
      if (isMoreDropdownOpen) setIsMoreDropdownOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen, isDropdownOpen, isMoreDropdownOpen]);

  const animateMobileMenu = isMobileMenuOpen ? "open" : "close";
  const animateMobileMenuButtonSpan = isMobileMenuOpen ? ["open", "rotatePhase"] : "closed";

  const animateDropdownMenu = isDropdownOpen ? "open" : "close";
  const animateDropdownMenuIcon = isDropdownOpen ? "rotated" : "initial";

  const animateMoreDropdownMenu = isMoreDropdownOpen ? "open" : "close";
  const animateMoreDropdownMenuIcon = isMoreDropdownOpen ? "rotated" : "initial";

  return {
    isMobileMenuOpen, isDropdownOpen, isMoreDropdownOpen,
    toggleMobileMenu,
    openOnDesktopDropdownMenu, closeOnDesktopDropdownMenu, openOnMobileDropdownMenu,
    openOnDesktopMoreDropdownMenu, closeOnDesktopMoreDropdownMenu, openOnMobileMoreDropdownMenu,
    animateMobileMenu, animateMobileMenuButtonSpan,
    animateDropdownMenu, animateDropdownMenuIcon,
    animateMoreDropdownMenu, animateMoreDropdownMenuIcon,
  };
};

gsap.registerPlugin(ScrollTrigger);

export function Navbar() {
  const { dismissed, isOpen } = useBanner()

  const [scrolled, setScrolled] = useState(false);
  const scrollTriggerRef = useRef(null);

  const visible = isOpen && !dismissed;

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: "#hero",
      start: "bottom top",
      onEnter: () => setScrolled(true),
      onLeaveBack: () => setScrolled(false),
    });
    scrollTriggerRef.current = trigger;

    return () => trigger.kill();
  }, []);


  const useActive = useRelume();

  // Freeze/unfreeze ScrollTrigger around the mobile menu's body scroll lock.
  // Locking body scroll via `position: fixed` collapses the document height,
  // which makes GSAP auto-recalculate trigger positions and misfire
  // onLeaveBack (resetting `scrolled` to false) even though the user is
  // still actually scrolled down. Disabling the trigger while the menu is
  // open, then refreshing once the lock is released, prevents that.
  useEffect(() => {
    const trigger = scrollTriggerRef.current;
    if (!trigger) return;

    if (useActive.isMobileMenuOpen) {
      trigger.disable(false); // false = don't revert/reset current state
    } else {
      trigger.enable();
      ScrollTrigger.refresh();
    }
  }, [useActive.isMobileMenuOpen]);

  return (
      <nav
          id="relume"
          className={`fixed z-48 top-4 lg:top-8 flex w-full items-center px-4 min-h-16 md:min-h-18 transition-all duration-300 ease-in-out ${scrolled ? "lg:px-8 xl:px-24 2xl:px-36" : "xl:px-12"} ${visible ? "mt-5" : "mt-0"}`}
      >
        <div className={`mx-auto flex size-full max-w-full items-center justify-between rounded-2xl px-2 lg:px-8 min-h-16 lg:min-h-auto transition-all duration-300 ease 
        ${scrolled ? "bg-beige-to-black" : "navbar--transparent"}
        `}>
          <a href="/" className="flex flex-row items-center gap-1 ml-2 lg:ml-0">
            <img
                src="/logo.png"
                alt="AIM Church"
                className="w-8 h-8 object-cover object-center"
            />
            <div className="flex flex-row items-baseline gap-1">
              <p className={scrolled ? "text-2xl text-secondary font-semibold transition-colors duration-300 ease" : "text-2xl text-white font-semibold transition-colors duration-300 ease"}>AIM</p>
              <p className={`text-xs transition-colors duration-300 ease ${scrolled ? "text-gray" : "text-gray"}`}>수영로 교회</p>
            </div>
          </a>
          <div className="absolute hidden h-screen overflow-auto px-[5%] pb-24 pt-4 md:pb-0 lg:static lg:ml-6 lg:flex lg:h-auto lg:flex-1 lg:items-center lg:justify-between lg:border-none lg:bg-none lg:px-0 lg:pt-0 lg:overflow-visible">
            <div className="flex flex-col items-center lg:flex-row">
              <FlipText href="/" className={`font-anonymous font-semibold relative block w-auto py-3 text-md lg:inline-block lg:px-2 xl:px-3 lg:py-6 text-sm xl:text-base transition-colors duration-300 ease   ${scrolled ? "text-gray-400 hover:text-foreground" : "text-white"}`}>
                ABOUT US
              </FlipText>
              <FlipText href="/" className={`font-anonymous font-semibold relative block w-auto py-3 text-md lg:inline-block lg:px-2 xl:px-3 lg:py-6 text-sm xl:text-base transition-colors duration-300 ease   ${scrolled ? "text-gray-400 hover:text-foreground" : "text-white"}`}>
                PLAN YOUR VISIT
              </FlipText>
              <FlipText href="/" className={`font-anonymous font-semibold relative block w-auto py-3 text-md lg:inline-block lg:px-2 xl:px-3 lg:py-6 text-sm xl:text-base transition-colors duration-300 ease   ${scrolled ? "text-gray-400 hover:text-foreground" : "text-white"}`}>
                SERMONS
              </FlipText>
              <FlipText href="/" className={`font-anonymous font-semibold relative block w-auto py-3 text-md lg:inline-block lg:px-2 xl:px-3 lg:py-6 text-sm xl:text-base transition-colors duration-300 ease   ${scrolled ? "text-gray-400 hover:text-foreground" : "text-white"}`}>
                JOIN
              </FlipText>
              <FlipText href="/" className={`font-anonymous font-semibold relative block w-auto py-3 text-md lg:inline-block lg:px-2 xl:px-3 lg:py-6 text-sm xl:text-base transition-colors duration-300 ease   ${scrolled ? "text-gray-400 hover:text-foreground" : "text-white"}`}>
                ANNOUNCEMENTS
              </FlipText>

              <div
                  onMouseEnter={useActive.openOnDesktopMoreDropdownMenu}
                  onMouseLeave={useActive.closeOnDesktopMoreDropdownMenu}
              >
                <button
                    className={`relative flex w-full items-center justify-between whitespace-nowrap py-3 text-md lg:w-auto lg:justify-start lg:gap-2 lg:px-2 xl:px-4 lg:py-6 text-sm xl:text-base duration-300 ease ${scrolled ? "text-gray-400 hover:text-foreground" : "text-white"}` }
                    onClick={useActive.openOnMobileMoreDropdownMenu}
                    aria-expanded={useActive.isMoreDropdownOpen}
                    aria-haspopup="true"
                    aria-controls="desktop-more-menu"
                >
                  <span className=" font-anonymous font-semibold">MORE</span>
                  <motion.span
                      animate={useActive.animateMoreDropdownMenuIcon}
                      variants={{
                        rotated: { rotate: 180 },
                        initial: { rotate: 0 },
                      }}
                      transition={{ duration: 0.3 }}
                  >
                    <RxChevronDown />
                  </motion.span>
                </button>
                <AnimatePresence>
                  <motion.nav
                      variants={{
                        open: {
                          opacity: 1,
                          display: "block",
                          height: "var(--height-open, auto)",
                        },
                        close: {
                          opacity: 0,
                          display: "none",
                          height: "var(--height-close, 0)",
                        },
                      }}
                      animate={useActive.animateMoreDropdownMenu}
                      initial="close"
                      exit="close"
                      transition={{ duration: 0.2 }}
                      className="bottom-auto left-0 top-full w-full max-w-3/4 xl:max-w-2/3 overflow-hidden bg-transparent lg:absolute lg:w-screen lg:px-8 xl:px-24 2xl:px-36  lg:[--height-close:auto]"
                      id="desktop-more-menu" aria-label="More menu"
                  >
                    <div className="flex size-full max-w-full items-center justify-start bg-beige-to-black dark:bg-background rounded-2xl px-8 mt-2 text-foreground">
                      <div className="flex w-full flex-col lg:flex-row">
                        <div className="grid flex-1 auto-cols-fr grid-cols-1 gap-x-8 gap-y-6 py-4 md:grid-cols-3 md:gap-y-0 md:py-8 lg:pr-8">
                          <div className="grid auto-cols-fr grid-cols-1 grid-rows-[max-content_max-content_max-content_max-content] gap-y-2 md:gap-y-4">
                            <h4 className="text-sm font-anonymous font-semibold ">
                              GETTING STARTED
                            </h4>
                            <a
                                href="#"
                                className="grid w-full auto-cols-fr grid-cols-[max-content_1fr] items-start gap-x-3 py-2 group/1"
                            >
                              <div className="flex size-10 flex-col items-center justify-center rounded-lg bg-white-to-dark p-1">
                                <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24">
                                  <path className="fill-foreground/80 group-hover/1:fill-foreground transition-all duration-300 ease" d="M17.25 2A2.75 2.75 0 0 1 20 4.75v14.5A2.75 2.75 0 0 1 17.25 22H6.75A2.75 2.75 0 0 1 4 19.249V4.75A2.75 2.75 0 0 1 6.75 2h.291v8.167c0 .748.79 1.014 1.319.74l.09-.055l2.093-1.197l2.14 1.23c.446.308 1.261.1 1.35-.59l.008-.128V2h3.21Zm-4.709 0v7.076l-1.621-.932a.931.931 0 0 0-.793.022l-.107.063l-1.479.846V2h4Z"/>
                                </svg>
                              </div>
                              <div className="flex flex-col items-start justify-center">
                                <FlipWaveText className="font-semibold">New member class</FlipWaveText>
                                <p className="hidden text-sm md:block">
                                  Learn what to expect on Sunday morning
                                </p>
                              </div>
                            </a>
                            <a
                                href="#"
                                className="grid w-full auto-cols-fr grid-cols-[max-content_1fr] items-start gap-x-3 py-2 group/2"
                            >
                              <div className="flex size-10 flex-col items-center justify-center rounded-lg bg-white-to-dark p-1">
                                <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 20 20">
                                  <path className="group-hover/2:fill-foreground fill-foreground/80 transition-all duration-300 ease" d="M10 6a2 2 0 1 0 0-4a2 2 0 0 0 0 4ZM5.472 4.15a1.761 1.761 0 0 0-2.317.88c-.4.882-.008 1.917.877 2.31l2.671 1.19A.5.5 0 0 1 7 8.987v1.865a.5.5 0 0 1-.036.187l-1.84 4.555a1.75 1.75 0 0 0 3.244 1.311l1.398-3.459a.25.25 0 0 1 .463 0l1.398 3.459a1.75 1.75 0 0 0 3.245-1.311l-1.836-4.544a.5.5 0 0 1-.036-.187V8.987a.5.5 0 0 1 .297-.457l2.671-1.19a1.74 1.74 0 0 0 .877-2.31a1.761 1.761 0 0 0-2.317-.88l-1.276.569a1.04 1.04 0 0 0-.52.524a3 3 0 0 1-5.463 0a1.042 1.042 0 0 0-.52-.524L5.471 4.15Z"/>
                                </svg>
                              </div>
                              <div className="flex flex-col items-start justify-center">
                                <FlipWaveText className="font-semibold">Join us</FlipWaveText>
                                <p className="hidden text-sm md:block">
                                  Explore ways to serve and connect
                                </p>
                              </div>
                            </a>
                            <a
                                href="#"
                                className="grid w-full auto-cols-fr grid-cols-[max-content_1fr] items-start gap-x-3 py-2 group/3"
                            >
                              <div className="flex size-10 flex-col items-center justify-center rounded-lg bg-white-to-dark p-1">
                                <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 28 28" fill="#000000">
                                  <path className="group-hover/3:fill-foreground fill-foreground/80 transition-all duration-300 ease" d="M14 9a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3Zm.89-6.705a1.5 1.5 0 0 0-1.78 0L3.61 9.3c-1.164.859-.557 2.707.89 2.707H5v7.242a3.25 3.25 0 0 0-2 3.001v1.5c0 .414.336.75.75.75h20.5a.75.75 0 0 0 .75-.75v-1.5a3.25 3.25 0 0 0-2-3v-7.243h.499c1.448 0 2.055-1.848.89-2.707L14.89 2.295ZM6.5 19v-6.993H9V19H6.5Zm15-6.993V19H19v-6.993h2.5Zm-4 0V19h-2.75v-6.993h2.75Zm-4.25 0V19H10.5v-6.993h2.75Zm-8.75-1.5L14 3.502l9.499 7.005H4.5Zm0 11.743c0-.966.784-1.75 1.75-1.75h15.5c.966 0 1.75.784 1.75 1.75V23h-19v-.75Z"/>
                                </svg>
                              </div>
                              <div className="flex flex-col items-start justify-center">
                                <FlipWaveText className="font-semibold">
                                  Service ministries
                                </FlipWaveText>
                                <p className="hidden text-sm md:block">
                                  Find your place in our community
                                </p>
                              </div>
                            </a>
                            <a
                                href="#"
                                className="grid w-full auto-cols-fr grid-cols-[max-content_1fr] items-start gap-x-3 py-2 group/4"
                            >
                              <div className="flex size-10 flex-col items-center justify-center rounded-lg bg-white-to-dark p-1">
                                <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24" fill="#000000">
                                  <path className="group-hover/4:fill-foreground fill-foreground/80 transition-all duration-300 ease" d="m18.492 2.33l3.179 3.18a2.25 2.25 0 0 1 0 3.182l-2.584 2.584A2.25 2.25 0 0 1 21 13.5v5.25A2.25 2.25 0 0 1 18.75 21H5.25A2.25 2.25 0 0 1 3 18.75V5.25A2.25 2.25 0 0 1 5.25 3h5.25a2.25 2.25 0 0 1 2.225 1.915L15.31 2.33a2.25 2.25 0 0 1 3.182 0ZM4.5 18.75c0 .415.336.75.75.75h5.999l.001-6.75H4.5v6Zm8.249.75h6.001a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75h-6.001v6.75ZM10.5 4.5H5.25a.75.75 0 0 0-.75.75v6h6.75v-6a.75.75 0 0 0-.75-.75Zm2.25 4.81v1.94h1.94l-1.94-1.94Zm3.62-5.918L13.193 6.57a.75.75 0 0 0 0 1.061l3.179 3.179a.75.75 0 0 0 1.06 0l3.18-3.179a.75.75 0 0 0 0-1.06l-3.18-3.18a.75.75 0 0 0-1.06 0Z"/>
                                </svg>
                              </div>
                              <div className="flex flex-col items-start justify-center">
                                <FlipWaveText className="font-semibold">Life groups</FlipWaveText>
                                <p className="hidden text-sm md:block">
                                  Discover small group gatherings
                                </p>
                              </div>
                            </a>
                          </div>
                          <div className="grid auto-cols-fr grid-cols-1 grid-rows-[max-content_max-content_max-content_max-content] gap-y-2 md:gap-y-4">
                            <h4 className="text-sm font-anonymous font-semibold">
                              INFORMATION
                            </h4>
                            <a
                                href="#"
                                className="grid w-full auto-cols-fr grid-cols-[max-content_1fr] items-start gap-x-3 py-2 group/5"
                            >
                              <div className="flex size-10 flex-col items-center justify-center rounded-lg bg-white-to-dark p-1">
                                <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 20 20" fill="#000000">
                                  <path className="group-hover/5:fill-foreground fill-foreground/80 transition-all duration-300 ease" d="m13.878.282l.348 1.071a2.2 2.2 0 0 0 1.398 1.397l1.072.348l.021.006a.423.423 0 0 1 0 .798l-1.071.348a2.2 2.2 0 0 0-1.399 1.397l-.348 1.07a.423.423 0 0 1-.798 0l-.349-1.07a2.2 2.2 0 0 0-.532-.867a2.2 2.2 0 0 0-.866-.536l-1.071-.348a.423.423 0 0 1 0-.798l1.071-.348a2.2 2.2 0 0 0 1.377-1.397l.348-1.07a.423.423 0 0 1 .799 0m4.905 7.931l-.766-.248a1.58 1.58 0 0 1-.998-.999l-.25-.764a.302.302 0 0 0-.57 0l-.248.764a1.58 1.58 0 0 1-.984.999l-.765.248a.303.303 0 0 0 0 .57l.765.249a1.58 1.58 0 0 1 1 1.002l.248.764a.302.302 0 0 0 .57 0l.249-.764a1.58 1.58 0 0 1 .999-.999l.765-.248a.303.303 0 0 0 0-.57zm-3.027 3.557c.219.149.477.229.746.23c.173 0 .341-.021.498-.079V14.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 3 14.5V7h9.136l.017.052c.09.25.25.48.52.691q.21.15.45.21c-.08.17-.12.361-.12.551c0 .27.08.531.24.752c.161.22.381.38.651.48l.761.25c.08.03.16.08.22.14c.07.061.11.141.14.221l.26.802c.1.25.26.46.481.62M11.806 6l-.013-.04c-.09-.23-.18-.36-.29-.47a1.3 1.3 0 0 0-.471-.291l-1.061-.35c-.3-.1-.54-.291-.71-.532A1.42 1.42 0 0 1 9.088 3H5.499A2.5 2.5 0 0 0 3 5.5V6z"/>
                                </svg>
                              </div>
                              <div className="flex flex-col items-start justify-center">
                                <FlipWaveText className="font-semibold">Announcements</FlipWaveText>
                                <p className="hidden text-sm md:block">
                                  Stay updated with church news
                                </p>
                              </div>
                            </a>
                            <a
                                href="#"
                                className="grid w-full auto-cols-fr grid-cols-[max-content_1fr] items-start gap-x-3 py-2 group/6"
                            >
                              <div className="flex size-10 flex-col items-center justify-center rounded-lg bg-white-to-dark p-1">
                                <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 20 20" fill="#000000">
                                  <path className="group-hover/6:fill-foreground fill-foreground/80 transition-all duration-300 ease" d="M19 4.5a3.5 3.5 0 1 1-7 0a3.5 3.5 0 0 1 7 0ZM9.172 15.595a3.502 3.502 0 0 0 6.825-1.094a3.5 3.5 0 0 0-3.085-3.476a6.009 6.009 0 0 1-3.74 4.57ZM12 10a5 5 0 1 1-10 0a5 5 0 0 1 10 0ZM7.029 7.505a.5.5 0 0 0 .304.638c.71.251 1.274.814 1.525 1.524a.5.5 0 1 0 .942-.334A3.508 3.508 0 0 0 7.667 7.2a.5.5 0 0 0-.638.305Z"/>
                                </svg>
                              </div>
                              <div className="flex flex-col items-start justify-center">
                                <FlipWaveText className="font-semibold">Events</FlipWaveText>
                                <p className="hidden text-sm md:block">
                                  See what's happening this month
                                </p>
                              </div>
                            </a>
                            <a
                                href="#"
                                className="grid w-full auto-cols-fr grid-cols-[max-content_1fr] items-start gap-x-3 py-2 group/12"
                            >
                              <div className="flex size-10 flex-col items-center justify-center rounded-lg bg-white-to-dark p-1">
                                <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24" fill="#000000">
                                  <path className="group-hover/12:fill-foreground fill-foreground/80 transition-all duration-300 ease" d="M12 2c5.523 0 10 4.477 10 10c0 .263-.01.523-.03.78a6.518 6.518 0 0 0-1.474-1.05a8.5 8.5 0 1 0-15.923 4.407l.15.27l-1.112 3.984l3.987-1.112l.27.15a8.449 8.449 0 0 0 3.862 1.067c.281.54.636 1.036 1.05 1.474a9.96 9.96 0 0 1-5.368-1.082l-3.825 1.067a1.25 1.25 0 0 1-1.54-1.54l1.068-3.823A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2Zm11 15.5a5.5 5.5 0 1 0-11 0a5.5 5.5 0 0 0 11 0Zm-5 .5l.001 2.503a.5.5 0 1 1-1 0V18h-2.505a.5.5 0 0 1 0-1H17v-2.5a.5.5 0 1 1 1 0V17h2.497a.5.5 0 0 1 0 1H18Z"/>
                                </svg>
                              </div>
                              <div className="flex flex-col items-start justify-center">
                                <FlipWaveText className="font-semibold">Contact</FlipWaveText>
                                <p className="hidden text-sm md:block">
                                  Reach out with questions
                                </p>
                              </div>
                            </a>
                            <a
                                href="#"
                                className="grid w-full auto-cols-fr grid-cols-[max-content_1fr] items-start gap-x-3 py-2 group/7"
                            >
                              <div className="flex size-10 flex-col items-center justify-center rounded-lg bg-white-to-dark p-1">
                                <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 20 20" fill="#000000">
                                  <path className="group-hover/7:fill-foreground fill-foreground/80 transition-all duration-300 ease" d="M11 10H9v5.5A1.5 1.5 0 0 1 7.5 17H5.887a1.5 1.5 0 0 1-1.423-1.974l1.234-3.7l-.74.403C3.625 12.456 2 11.491 2 9.973V5.027C2 3.509 3.625 2.544 4.958 3.27l2.5 1.364c.283.154.518.37.694.628C8.393 5.097 8.685 5 9 5h2c.315 0 .607.097.848.263c.176-.257.411-.474.694-.628l2.5-1.364C16.375 2.544 18 3.509 18 5.027v4.946c0 1.518-1.625 2.483-2.958 1.756l-.74-.404l1.234 3.7A1.5 1.5 0 0 1 14.113 17H12.5a1.5 1.5 0 0 1-1.5-1.5V10Zm6-4.973a1 1 0 0 0-1.479-.878l-2.5 1.364a1 1 0 0 0-.521.877V7h2a.5.5 0 0 1 0 1h-2v.61a1 1 0 0 0 .521.877l2.5 1.364A1 1 0 0 0 17 9.973V5.027Zm-5 4.905V15.5a.5.5 0 0 0 .5.5h1.613a.5.5 0 0 0 .474-.658l-1.561-4.684a.442.442 0 0 1-.01-.035l-.474-.258A1.997 1.997 0 0 1 12 9.932Zm-5.026.726l-1.56 4.684a.5.5 0 0 0 .473.658H7.5a.5.5 0 0 0 .5-.5V9.932c-.152.173-.334.32-.542.433l-.473.258a.5.5 0 0 1-.01.035ZM11.5 6.5A.5.5 0 0 0 11 6H9a.5.5 0 0 0-.5.5v2A.5.5 0 0 0 9 9h2a.5.5 0 0 0 .5-.5v-2ZM7.5 8h-2a.5.5 0 0 1 0-1h2v-.61a1 1 0 0 0-.521-.877l-2.5-1.364A1 1 0 0 0 3 5.027v4.946a1 1 0 0 0 1.479.878l2.5-1.364A1 1 0 0 0 7.5 8.61V8Z"/>
                                </svg>
                              </div>
                              <div className="flex flex-col items-start justify-center">
                                <FlipWaveText className="font-semibold">Giving</FlipWaveText>
                                <p className="hidden text-sm md:block">
                                  Support our mission
                                </p>
                              </div>
                            </a>
                          </div>
                          <div className="grid auto-cols-fr grid-cols-1 grid-rows-[max-content_max-content_max-content_max-content] gap-y-2 md:gap-y-4">
                            <h4 className="text-sm font-anonymous font-semibold">
                              RESOURCES
                            </h4>
                            <a
                                href="#"
                                className="grid w-full auto-cols-fr grid-cols-[max-content_1fr] items-start gap-x-3 py-2 group/8"
                            >
                              <div className="flex size-10 flex-col items-center justify-center rounded-lg bg-white-to-dark p-1">
                                <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 32 32" fill="#000000">
                                  <path className="group-hover/8:fill-foreground fill-foreground/80 transition-all duration-300 ease" d="M8.5 2a6.5 6.5 0 0 0 0 13H14a1 1 0 0 0 1-1V8.5A6.5 6.5 0 0 0 8.5 2ZM4 8.5a4.5 4.5 0 0 1 9 0V13H8.5A4.5 4.5 0 0 1 4 8.5ZM8.5 30a6.5 6.5 0 1 1 0-13H14a1 1 0 0 1 1 1v5.5A6.5 6.5 0 0 1 8.5 30ZM4 23.5a4.5 4.5 0 1 0 9 0V19H8.5A4.5 4.5 0 0 0 4 23.5Zm26-15a6.5 6.5 0 1 0-13 0V14a1 1 0 0 0 1 1h5.5A6.5 6.5 0 0 0 30 8.5ZM23.5 4a4.5 4.5 0 1 1 0 9H19V8.5A4.5 4.5 0 0 1 23.5 4Zm0 26a6.5 6.5 0 1 0 0-13H18a1 1 0 0 0-1 1v5.5a6.5 6.5 0 0 0 6.5 6.5Zm4.5-6.5a4.5 4.5 0 1 1-9 0V19h4.5a4.5 4.5 0 0 1 4.5 4.5Z"/>
                                </svg>
                              </div>
                              <div className="flex flex-col items-start justify-center">
                                <FlipWaveText className="font-semibold">Leadership</FlipWaveText>
                                <p className="hidden text-sm md:block">
                                  Meet our pastoral team
                                </p>
                              </div>
                            </a>
                            <a
                                href="#"
                                className="grid w-full auto-cols-fr grid-cols-[max-content_1fr] items-start gap-x-3 py-2 group/9"
                            >
                              <div className="flex size-10 flex-col items-center justify-center rounded-lg bg-white-to-dark p-1">
                                <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24">
                                  <path className="group-hover/9:fill-foreground fill-foreground/80 transition-all duration-300 ease" d="M11 8.018a.75.75 0 0 1-.75.732c-.75 0-.75-.751-.75-.751V7.99a1.403 1.403 0 0 1 .008-.134a2.222 2.222 0 0 1 .42-1.067c.454-.613 1.27-1.062 2.585-1.039c.95.017 1.793.415 2.321 1.07c.537.667.718 1.57.362 2.459c-.362.905-1.181 1.265-1.652 1.471l-.05.023c-.28.123-.413.187-.493.251l-.001.001v.724a.75.75 0 0 1-1.5.001V11c0-.523.252-.897.563-1.147c.25-.2.565-.338.786-.436l.038-.017c.542-.239.8-.387.917-.679a.92.92 0 0 0-.138-.96c-.222-.275-.629-.502-1.179-.511c-.935-.016-1.245.285-1.353.432a.722.722 0 0 0-.134.33v.006Zm1.25 7.482a1 1 0 1 0 0-2a1 1 0 0 0 0 2ZM4 4.5A2.5 2.5 0 0 1 6.5 2H18a2.5 2.5 0 0 1 2.5 2.5v14.25a.75.75 0 0 1-.75.75H5.5a1 1 0 0 0 1 1h13.25a.75.75 0 0 1 0 1.5H6.5A2.5 2.5 0 0 1 4 19.5v-15Zm1.5 0V18H19V4.5a1 1 0 0 0-1-1H6.5a1 1 0 0 0-1 1Z"/>
                                </svg>
                              </div>
                              <div className="flex flex-col items-start justify-center">
                                <FlipWaveText className="font-semibold">FAQ</FlipWaveText>
                                <p className="hidden text-sm md:block">
                                  Common questions answered
                                </p>
                              </div>
                            </a>
                            <a
                                href="#"
                                className="grid w-full auto-cols-fr grid-cols-[max-content_1fr] items-start gap-x-3 py-2 group/10"
                            >
                              <div className="flex size-10 flex-col items-center justify-center rounded-lg bg-white-to-dark p-1">
                                <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 16 16">
                                  <path className="group-hover/10:fill-foreground fill-foreground/80 transition-all duration-300 ease" d="M7.5 3.5A.5.5 0 0 1 8 3c.663 0 1.283.326 1.729.771c.445.446.771 1.066.771 1.729a.5.5 0 0 1-1 0c0-.337-.174-.717-.479-1.021C8.717 4.174 8.337 4 8 4a.5.5 0 0 1-.5-.5Zm1 7.458c1.016-.172 1.949-.847 2.64-1.714c.812-1.016 1.36-2.374 1.36-3.744C12.5 3.266 10.816 1 8 1S3.5 3.266 3.5 5.5c0 1.37.548 2.728 1.36 3.744c.691.867 1.624 1.542 2.64 1.714V11a2 2 0 0 0 2 2H11a1 1 0 0 1 1 1v.5a.5.5 0 0 0 1 0V14a2 2 0 0 0-2-2H9.5a1 1 0 0 1-1-1v-.042ZM8 2c2.184 0 3.5 1.734 3.5 3.5c0 1.115-.452 2.257-1.14 3.12C9.662 9.492 8.792 10 8 10c-.793 0-1.663-.508-2.36-1.38C4.953 7.757 4.5 6.615 4.5 5.5C4.5 3.734 5.816 2 8 2Z"/>
                                </svg>
                              </div>
                              <div className="flex flex-col items-start justify-center">
                                <FlipWaveText className="font-semibold">
                                  Children's ministry
                                </FlipWaveText>
                                <p className="hidden text-sm md:block">
                                  Programs for all ages
                                </p>
                              </div>
                            </a>
                            <a
                                href="#"
                                className="grid w-full auto-cols-fr grid-cols-[max-content_1fr] items-start gap-x-3 py-2 group/11"
                            >
                              <div className="flex size-10 flex-col items-center justify-center rounded-lg bg-white-to-dark p-1">
                                <AimLogo />
                              </div>
                              <div className="flex flex-col items-start justify-center">
                                <FlipWaveText className="font-semibold">
                                  Sooyoungro church
                                </FlipWaveText>
                                <p className="hidden text-sm md:block">
                                  Our parent church in Korea
                                </p>
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.nav>
                </AnimatePresence>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ButtonC>LOG IN</ButtonC>
              <ButtonA>SIGN UP</ButtonA>
            </div>
          </div>

          {/* Mobile */}
          <button
              className="flex size-12 cursor-pointer flex-col items-center justify-center lg:hidden"
              onClick={useActive.toggleMobileMenu}
              aria-expanded={useActive.isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={useActive.isMobileMenuOpen ? "Close Menu" : "Open Menu"}
          >
            <motion.span
                className={`my-[3px] h-0.5 w-6 ${scrolled ? "bg-foreground" : "bg-white"}`}
                animate={useActive.animateMobileMenuButtonSpan}
                variants={{
                  open: { translateY: 8, transition: { delay: 0.1 } },
                  rotatePhase: { rotate: -45, transition: { delay: 0.2 } },
                  closed: {
                    translateY: 0,
                    rotate: 0,
                    transition: { duration: 0.2 },
                  },
                }}
            />
            <motion.span
                className={`my-[3px] h-0.5 w-6 ${scrolled ? "bg-foreground" : "bg-white"}`}
                animate={useActive.animateMobileMenu}
                variants={{
                  open: { width: 0, transition: { duration: 0.1 } },
                  closed: {
                    width: "1.5rem",
                    transition: { delay: 0.3, duration: 0.2 },
                  },
                }}
            />
            <motion.span
                className={`my-[3px] h-0.5 w-6 ${scrolled ? "bg-foreground" : "bg-white"}`}
                animate={useActive.animateMobileMenuButtonSpan}
                variants={{
                  open: { translateY: -8, transition: { delay: 0.1 } },
                  rotatePhase: { rotate: 45, transition: { delay: 0.2 } },
                  closed: {
                    translateY: 0,
                    rotate: 0,
                    transition: { duration: 0.2 },
                  },
                }}
            />
          </button>
        </div>
        <AnimatePresence>
          <motion.div
              variants={{ open: { height: "100dvh" }, close: { height: "auto" } }}
              animate={useActive.animateMobileMenu}
              initial="close"
              exit="close"
              className="absolute left-0 right-0 top-full w-full overflow-hidden lg:hidden"
              transition={{ duration: 0.4 }}
              id="mobile-menu"
          >
            <motion.div
                variants={{ open: { y: 0 }, close: { y: "-100%" } }}
                animate={useActive.animateMobileMenu}
                initial="close"
                exit="close"
                transition={{ duration: 0.4 }}
                className="absolute left-0 right-0 top-0 block h-dvh overflow-auto overscroll-y-contain px-4 pb-32 pt-4"
            >
              <div className="flex flex-col bg-beige-to-black p-8 rounded-2xl">
                <a
                    href="#"
                    className="relative block w-auto py-3 text-md lg:inline-block lg:px-4 lg:py-6 lg:text-base text-foreground font-semibold"
                >
                  ABOUT US
                </a>
                <a
                    href="#"
                    className="relative block w-auto py-3 text-md lg:inline-block lg:px-4 lg:py-6 lg:text-base text-foreground font-semibold"
                >
                  PLAN YOUR VISIT
                </a>
                <a
                    href="#"
                    className="relative block w-auto py-3 text-md lg:inline-block lg:px-4 lg:py-6 lg:text-base text-foreground font-semibold"
                >
                  JOIN
                </a>
                <a
                    href="#"
                    className="relative block w-auto py-3 text-md lg:inline-block lg:px-4 lg:py-6 lg:text-base text-foreground font-semibold"
                >
                  ANNOUNCEMENTS
                </a>
                <div>
                  <button
                      className="relative flex w-full items-center justify-between whitespace-nowrap py-3 text-md lg:w-auto lg:justify-start lg:gap-2 lg:px-4 lg:py-6 lg:text-base text-foreground font-semibold"
                      onClick={useActive.openOnMobileDropdownMenu}
                      aria-expanded={useActive.isMoreDropdownOpen}
                      aria-haspopup="true"
                      aria-controls="mobile-more-menu"
                  >
                    <span>MORE</span>
                    <motion.span
                        animate={useActive.animateDropdownMenuIcon}
                        variants={{
                          rotated: { rotate: 180 },
                          initial: { rotate: 0 },
                        }}
                        transition={{ duration: 0.3 }}
                    >
                      <RxChevronDown />
                    </motion.span>
                  </button>
                  <AnimatePresence>
                    <motion.nav
                        variants={{
                          open: {
                            opacity: 1,
                            display: "block",
                            height: "var(--height-open, auto)",
                          },
                          close: {
                            opacity: 0,
                            display: "none",
                            height: "var(--height-close, 0)",
                          },
                        }}
                        animate={useActive.animateDropdownMenu}
                        initial="close"
                        exit="close"
                        transition={{ duration: 0.2 }}
                        className="bottom-auto left-0 top-full w-full min-w-full max-w-full overflow-hidden bg-beige-to-black lg:absolute lg:w-screen lg:border-b lg:border-border-primary lg:px-[5%] lg:[--height-close:auto] text-foreground"
                        id="mobile-more-menu" aria-label="More menu"
                    >
                      <div className="mx-auto flex size-full max-w-full items-center justify-between">
                        <div className="flex w-full flex-col lg:flex-row">
                          <div className="grid flex-1 auto-cols-fr grid-cols-1 gap-x-8 gap-y-6 py-4 md:grid-cols-3 md:gap-y-0 md:py-8 lg:pr-8">
                            <div className="grid auto-cols-fr grid-cols-1 grid-rows-[max-content_max-content_max-content_max-content] gap-y-2 md:gap-y-4">
                              <h4 className="text-sm font-semibold ">
                                GETTING STARTED
                              </h4>
                              <a
                                  href="#"
                                  className="grid w-full auto-cols-fr grid-cols-[max-content_1fr] items-center gap-x-3 py-2 group/1"
                              >
                                <div className="flex size-8 flex-col items-center justify-center rounded-lg bg-white-to-dark p-1">
                                  <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24">
                                    <path className="fill-foreground/80 group-hover/1:fill-foreground transition-all duration-300 ease" d="M17.25 2A2.75 2.75 0 0 1 20 4.75v14.5A2.75 2.75 0 0 1 17.25 22H6.75A2.75 2.75 0 0 1 4 19.249V4.75A2.75 2.75 0 0 1 6.75 2h.291v8.167c0 .748.79 1.014 1.319.74l.09-.055l2.093-1.197l2.14 1.23c.446.308 1.261.1 1.35-.59l.008-.128V2h3.21Zm-4.709 0v7.076l-1.621-.932a.931.931 0 0 0-.793.022l-.107.063l-1.479.846V2h4Z"/>
                                  </svg>
                                </div>
                                <div className="flex flex-col items-start justify-center">
                                  <h5 className="font-semibold">
                                    New member class
                                  </h5>
                                  <p className="hidden text-sm md:block">
                                    Learn what to expect on Sunday morning
                                  </p>
                                </div>
                              </a>
                              <a
                                  href="#"
                                  className="grid w-full auto-cols-fr grid-cols-[max-content_1fr] items-center gap-x-3 py-2 group/2"
                              >
                                <div className="flex size-8 flex-col items-center justify-center rounded-lg bg-white-to-dark p-1">
                                  <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 20 20">
                                    <path className="group-hover/2:fill-foreground fill-foreground/80 transition-all duration-300 ease" d="M10 6a2 2 0 1 0 0-4a2 2 0 0 0 0 4ZM5.472 4.15a1.761 1.761 0 0 0-2.317.88c-.4.882-.008 1.917.877 2.31l2.671 1.19A.5.5 0 0 1 7 8.987v1.865a.5.5 0 0 1-.036.187l-1.84 4.555a1.75 1.75 0 0 0 3.244 1.311l1.398-3.459a.25.25 0 0 1 .463 0l1.398 3.459a1.75 1.75 0 0 0 3.245-1.311l-1.836-4.544a.5.5 0 0 1-.036-.187V8.987a.5.5 0 0 1 .297-.457l2.671-1.19a1.74 1.74 0 0 0 .877-2.31a1.761 1.761 0 0 0-2.317-.88l-1.276.569a1.04 1.04 0 0 0-.52.524a3 3 0 0 1-5.463 0a1.042 1.042 0 0 0-.52-.524L5.471 4.15Z"/>
                                  </svg>
                                </div>
                                <div className="flex flex-col items-start justify-center">
                                  <h5 className="font-semibold">Join us</h5>
                                  <p className="hidden text-sm md:block">
                                    Explore ways to serve and connect
                                  </p>
                                </div>
                              </a>
                              <a
                                  href="#"
                                  className="grid w-full auto-cols-fr grid-cols-[max-content_1fr] items-center gap-x-3 py-2 group/3"
                              >
                                <div className="flex size-8 flex-col items-center justify-center rounded-lg bg-white-to-dark p-1">
                                  <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 28 28" fill="#000000">
                                    <path className="group-hover/3:fill-foreground fill-foreground/80 transition-all duration-300 ease" d="M14 9a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3Zm.89-6.705a1.5 1.5 0 0 0-1.78 0L3.61 9.3c-1.164.859-.557 2.707.89 2.707H5v7.242a3.25 3.25 0 0 0-2 3.001v1.5c0 .414.336.75.75.75h20.5a.75.75 0 0 0 .75-.75v-1.5a3.25 3.25 0 0 0-2-3v-7.243h.499c1.448 0 2.055-1.848.89-2.707L14.89 2.295ZM6.5 19v-6.993H9V19H6.5Zm15-6.993V19H19v-6.993h2.5Zm-4 0V19h-2.75v-6.993h2.75Zm-4.25 0V19H10.5v-6.993h2.75Zm-8.75-1.5L14 3.502l9.499 7.005H4.5Zm0 11.743c0-.966.784-1.75 1.75-1.75h15.5c.966 0 1.75.784 1.75 1.75V23h-19v-.75Z"/>
                                  </svg>
                                </div>
                                <div className="flex flex-col items-start justify-center">
                                  <h5 className="font-semibold">
                                    Service ministries
                                  </h5>
                                  <p className="hidden text-sm md:block">
                                    Find your place in our community
                                  </p>
                                </div>
                              </a>
                              <a
                                  href="#"
                                  className="grid w-full auto-cols-fr grid-cols-[max-content_1fr] items-center gap-x-3 py-2 group/4"
                              >
                                <div className="flex size-8 flex-col items-center justify-center rounded-lg bg-white-to-dark p-1">
                                  <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24" fill="#000000">
                                    <path className="group-hover/4:fill-foreground fill-foreground/80 transition-all duration-300 ease" d="m18.492 2.33l3.179 3.18a2.25 2.25 0 0 1 0 3.182l-2.584 2.584A2.25 2.25 0 0 1 21 13.5v5.25A2.25 2.25 0 0 1 18.75 21H5.25A2.25 2.25 0 0 1 3 18.75V5.25A2.25 2.25 0 0 1 5.25 3h5.25a2.25 2.25 0 0 1 2.225 1.915L15.31 2.33a2.25 2.25 0 0 1 3.182 0ZM4.5 18.75c0 .415.336.75.75.75h5.999l.001-6.75H4.5v6Zm8.249.75h6.001a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75h-6.001v6.75ZM10.5 4.5H5.25a.75.75 0 0 0-.75.75v6h6.75v-6a.75.75 0 0 0-.75-.75Zm2.25 4.81v1.94h1.94l-1.94-1.94Zm3.62-5.918L13.193 6.57a.75.75 0 0 0 0 1.061l3.179 3.179a.75.75 0 0 0 1.06 0l3.18-3.179a.75.75 0 0 0 0-1.06l-3.18-3.18a.75.75 0 0 0-1.06 0Z"/>
                                  </svg>
                                </div>
                                <div className="flex flex-col items-start justify-center">
                                  <h5 className="font-semibold">Life groups</h5>
                                  <p className="hidden text-sm md:block">
                                    Discover small group gatherings
                                  </p>
                                </div>
                              </a>
                            </div>
                            <div className="grid auto-cols-fr grid-cols-1 grid-rows-[max-content_max-content_max-content_max-content] gap-y-2 md:gap-y-4">
                              <h4 className="text-sm font-semibold ">
                                INFORMATION
                              </h4>
                              <a
                                  href="#"
                                  className="grid w-full auto-cols-fr grid-cols-[max-content_1fr] items-center gap-x-3 py-2 group/5"
                              >
                                <div className="flex size-8 flex-col items-center justify-center rounded-lg bg-white-to-dark p-1">
                                  <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 20 20" fill="#000000">
                                    <path className="group-hover/5:fill-foreground fill-foreground/80 transition-all duration-300 ease" d="m13.878.282l.348 1.071a2.2 2.2 0 0 0 1.398 1.397l1.072.348l.021.006a.423.423 0 0 1 0 .798l-1.071.348a2.2 2.2 0 0 0-1.399 1.397l-.348 1.07a.423.423 0 0 1-.798 0l-.349-1.07a2.2 2.2 0 0 0-.532-.867a2.2 2.2 0 0 0-.866-.536l-1.071-.348a.423.423 0 0 1 0-.798l1.071-.348a2.2 2.2 0 0 0 1.377-1.397l.348-1.07a.423.423 0 0 1 .799 0m4.905 7.931l-.766-.248a1.58 1.58 0 0 1-.998-.999l-.25-.764a.302.302 0 0 0-.57 0l-.248.764a1.58 1.58 0 0 1-.984.999l-.765.248a.303.303 0 0 0 0 .57l.765.249a1.58 1.58 0 0 1 1 1.002l.248.764a.302.302 0 0 0 .57 0l.249-.764a1.58 1.58 0 0 1 .999-.999l.765-.248a.303.303 0 0 0 0-.57zm-3.027 3.557c.219.149.477.229.746.23c.173 0 .341-.021.498-.079V14.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 3 14.5V7h9.136l.017.052c.09.25.25.48.52.691q.21.15.45.21c-.08.17-.12.361-.12.551c0 .27.08.531.24.752c.161.22.381.38.651.48l.761.25c.08.03.16.08.22.14c.07.061.11.141.14.221l.26.802c.1.25.26.46.481.62M11.806 6l-.013-.04c-.09-.23-.18-.36-.29-.47a1.3 1.3 0 0 0-.471-.291l-1.061-.35c-.3-.1-.54-.291-.71-.532A1.42 1.42 0 0 1 9.088 3H5.499A2.5 2.5 0 0 0 3 5.5V6z"/>
                                  </svg>
                                </div>
                                <div className="flex flex-col items-start justify-center">
                                  <h5 className="font-semibold">Announcements</h5>
                                  <p className="hidden text-sm md:block">
                                    Stay updated with church news
                                  </p>
                                </div>
                              </a>
                              <a
                                  href="#"
                                  className="grid w-full auto-cols-fr grid-cols-[max-content_1fr] items-center gap-x-3 py-2 group/6"
                              >
                                <div className="flex size-8 flex-col items-center justify-center rounded-lg bg-white-to-dark p-1">
                                  <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 20 20" fill="#000000">
                                    <path className="group-hover/6:fill-foreground fill-foreground/80 transition-all duration-300 ease" d="M19 4.5a3.5 3.5 0 1 1-7 0a3.5 3.5 0 0 1 7 0ZM9.172 15.595a3.502 3.502 0 0 0 6.825-1.094a3.5 3.5 0 0 0-3.085-3.476a6.009 6.009 0 0 1-3.74 4.57ZM12 10a5 5 0 1 1-10 0a5 5 0 0 1 10 0ZM7.029 7.505a.5.5 0 0 0 .304.638c.71.251 1.274.814 1.525 1.524a.5.5 0 1 0 .942-.334A3.508 3.508 0 0 0 7.667 7.2a.5.5 0 0 0-.638.305Z"/>
                                  </svg>
                                </div>
                                <div className="flex flex-col items-start justify-center">
                                  <h5 className="font-semibold">Events</h5>
                                  <p className="hidden text-sm md:block">
                                    See what's happening this month
                                  </p>
                                </div>
                              </a>
                              <a
                                  href="#"
                                  className="grid w-full auto-cols-fr grid-cols-[max-content_1fr] items-center gap-x-3 py-2 group/12"
                              >
                                <div className="flex size-8 flex-col items-center justify-center rounded-lg bg-white-to-dark p-1">
                                  <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24" fill="#000000">
                                    <path className="group-hover/12:fill-foreground fill-foreground/80 transition-all duration-300 ease" d="M12 2c5.523 0 10 4.477 10 10c0 .263-.01.523-.03.78a6.518 6.518 0 0 0-1.474-1.05a8.5 8.5 0 1 0-15.923 4.407l.15.27l-1.112 3.984l3.987-1.112l.27.15a8.449 8.449 0 0 0 3.862 1.067c.281.54.636 1.036 1.05 1.474a9.96 9.96 0 0 1-5.368-1.082l-3.825 1.067a1.25 1.25 0 0 1-1.54-1.54l1.068-3.823A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2Zm11 15.5a5.5 5.5 0 1 0-11 0a5.5 5.5 0 0 0 11 0Zm-5 .5l.001 2.503a.5.5 0 1 1-1 0V18h-2.505a.5.5 0 0 1 0-1H17v-2.5a.5.5 0 1 1 1 0V17h2.497a.5.5 0 0 1 0 1H18Z"/>
                                  </svg>
                                </div>
                                <div className="flex flex-col items-start justify-center">
                                  <h5 className="font-semibold">Contact</h5>
                                  <p className="hidden text-sm md:block">
                                    Reach out with questions
                                  </p>
                                </div>
                              </a>
                              <a
                                  href="#"
                                  className="grid w-full auto-cols-fr grid-cols-[max-content_1fr] items-center gap-x-3 py-2 group/7"
                              >
                                <div className="flex size-8 flex-col items-center justify-center rounded-lg bg-white-to-dark p-1">
                                  <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 20 20" fill="#000000">
                                    <path className="group-hover/7:fill-foreground fill-foreground/80 transition-all duration-300 ease" d="M11 10H9v5.5A1.5 1.5 0 0 1 7.5 17H5.887a1.5 1.5 0 0 1-1.423-1.974l1.234-3.7l-.74.403C3.625 12.456 2 11.491 2 9.973V5.027C2 3.509 3.625 2.544 4.958 3.27l2.5 1.364c.283.154.518.37.694.628C8.393 5.097 8.685 5 9 5h2c.315 0 .607.097.848.263c.176-.257.411-.474.694-.628l2.5-1.364C16.375 2.544 18 3.509 18 5.027v4.946c0 1.518-1.625 2.483-2.958 1.756l-.74-.404l1.234 3.7A1.5 1.5 0 0 1 14.113 17H12.5a1.5 1.5 0 0 1-1.5-1.5V10Zm6-4.973a1 1 0 0 0-1.479-.878l-2.5 1.364a1 1 0 0 0-.521.877V7h2a.5.5 0 0 1 0 1h-2v.61a1 1 0 0 0 .521.877l2.5 1.364A1 1 0 0 0 17 9.973V5.027Zm-5 4.905V15.5a.5.5 0 0 0 .5.5h1.613a.5.5 0 0 0 .474-.658l-1.561-4.684a.442.442 0 0 1-.01-.035l-.474-.258A1.997 1.997 0 0 1 12 9.932Zm-5.026.726l-1.56 4.684a.5.5 0 0 0 .473.658H7.5a.5.5 0 0 0 .5-.5V9.932c-.152.173-.334.32-.542.433l-.473.258a.5.5 0 0 1-.01.035ZM11.5 6.5A.5.5 0 0 0 11 6H9a.5.5 0 0 0-.5.5v2A.5.5 0 0 0 9 9h2a.5.5 0 0 0 .5-.5v-2ZM7.5 8h-2a.5.5 0 0 1 0-1h2v-.61a1 1 0 0 0-.521-.877l-2.5-1.364A1 1 0 0 0 3 5.027v4.946a1 1 0 0 0 1.479.878l2.5-1.364A1 1 0 0 0 7.5 8.61V8Z"/>
                                  </svg>
                                </div>
                                <div className="flex flex-col items-start justify-center">
                                  <h5 className="font-semibold">Giving</h5>
                                  <p className="hidden text-sm md:block">
                                    Support our mission
                                  </p>
                                </div>
                              </a>
                            </div>
                            <div className="grid auto-cols-fr grid-cols-1 grid-rows-[max-content_max-content_max-content_max-content] gap-y-2 md:gap-y-4">
                              <h4 className="text-sm font-semibold ">
                                RESOURCES
                              </h4>
                              <a
                                  href="#"
                                  className="grid w-full auto-cols-fr grid-cols-[max-content_1fr] items-center gap-x-3 py-2 group/8"
                              >
                                <div className="flex size-8 flex-col items-center justify-center rounded-lg bg-white-to-dark p-1">
                                  <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 32 32" fill="#000000">
                                    <path className="group-hover/8:fill-foreground fill-foreground/80 transition-all duration-300 ease" d="M8.5 2a6.5 6.5 0 0 0 0 13H14a1 1 0 0 0 1-1V8.5A6.5 6.5 0 0 0 8.5 2ZM4 8.5a4.5 4.5 0 0 1 9 0V13H8.5A4.5 4.5 0 0 1 4 8.5ZM8.5 30a6.5 6.5 0 1 1 0-13H14a1 1 0 0 1 1 1v5.5A6.5 6.5 0 0 1 8.5 30ZM4 23.5a4.5 4.5 0 1 0 9 0V19H8.5A4.5 4.5 0 0 0 4 23.5Zm26-15a6.5 6.5 0 1 0-13 0V14a1 1 0 0 0 1 1h5.5A6.5 6.5 0 0 0 30 8.5ZM23.5 4a4.5 4.5 0 1 1 0 9H19V8.5A4.5 4.5 0 0 1 23.5 4Zm0 26a6.5 6.5 0 1 0 0-13H18a1 1 0 0 0-1 1v5.5a6.5 6.5 0 0 0 6.5 6.5Zm4.5-6.5a4.5 4.5 0 1 1-9 0V19h4.5a4.5 4.5 0 0 1 4.5 4.5Z"/>
                                  </svg>
                                </div>
                                <div className="flex flex-col items-start justify-center">
                                  <h5 className="font-semibold">Leadership</h5>
                                  <p className="hidden text-sm md:block">
                                    Meet our pastoral team
                                  </p>
                                </div>
                              </a>
                              <a
                                  href="#"
                                  className="grid w-full auto-cols-fr grid-cols-[max-content_1fr] items-center gap-x-3 py-2 group/9"
                              >
                                <div className="flex size-8 flex-col items-center justify-center rounded-lg bg-white-to-dark p-1">
                                  <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24">
                                    <path className="group-hover/9:fill-foreground fill-foreground/80 transition-all duration-300 ease" d="M11 8.018a.75.75 0 0 1-.75.732c-.75 0-.75-.751-.75-.751V7.99a1.403 1.403 0 0 1 .008-.134a2.222 2.222 0 0 1 .42-1.067c.454-.613 1.27-1.062 2.585-1.039c.95.017 1.793.415 2.321 1.07c.537.667.718 1.57.362 2.459c-.362.905-1.181 1.265-1.652 1.471l-.05.023c-.28.123-.413.187-.493.251l-.001.001v.724a.75.75 0 0 1-1.5.001V11c0-.523.252-.897.563-1.147c.25-.2.565-.338.786-.436l.038-.017c.542-.239.8-.387.917-.679a.92.92 0 0 0-.138-.96c-.222-.275-.629-.502-1.179-.511c-.935-.016-1.245.285-1.353.432a.722.722 0 0 0-.134.33v.006Zm1.25 7.482a1 1 0 1 0 0-2a1 1 0 0 0 0 2ZM4 4.5A2.5 2.5 0 0 1 6.5 2H18a2.5 2.5 0 0 1 2.5 2.5v14.25a.75.75 0 0 1-.75.75H5.5a1 1 0 0 0 1 1h13.25a.75.75 0 0 1 0 1.5H6.5A2.5 2.5 0 0 1 4 19.5v-15Zm1.5 0V18H19V4.5a1 1 0 0 0-1-1H6.5a1 1 0 0 0-1 1Z"/>
                                  </svg>
                                </div>
                                <div className="flex flex-col items-start justify-center">
                                  <h5 className="font-semibold">FAQ</h5>
                                  <p className="hidden text-sm md:block">
                                    Common questions answered
                                  </p>
                                </div>
                              </a>
                              <a
                                  href="#"
                                  className="grid w-full auto-cols-fr grid-cols-[max-content_1fr] items-center gap-x-3 py-2 group/10"
                              >
                                <div className="flex size-8 flex-col items-center justify-center rounded-lg bg-white-to-dark p-1">
                                  <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 16 16">
                                    <path className="group-hover/10:fill-foreground fill-foreground/80 transition-all duration-300 ease" d="M7.5 3.5A.5.5 0 0 1 8 3c.663 0 1.283.326 1.729.771c.445.446.771 1.066.771 1.729a.5.5 0 0 1-1 0c0-.337-.174-.717-.479-1.021C8.717 4.174 8.337 4 8 4a.5.5 0 0 1-.5-.5Zm1 7.458c1.016-.172 1.949-.847 2.64-1.714c.812-1.016 1.36-2.374 1.36-3.744C12.5 3.266 10.816 1 8 1S3.5 3.266 3.5 5.5c0 1.37.548 2.728 1.36 3.744c.691.867 1.624 1.542 2.64 1.714V11a2 2 0 0 0 2 2H11a1 1 0 0 1 1 1v.5a.5.5 0 0 0 1 0V14a2 2 0 0 0-2-2H9.5a1 1 0 0 1-1-1v-.042ZM8 2c2.184 0 3.5 1.734 3.5 3.5c0 1.115-.452 2.257-1.14 3.12C9.662 9.492 8.792 10 8 10c-.793 0-1.663-.508-2.36-1.38C4.953 7.757 4.5 6.615 4.5 5.5C4.5 3.734 5.816 2 8 2Z"/>
                                  </svg>
                                </div>
                                <div className="flex flex-col items-start justify-center">
                                  <h5 className="font-semibold">
                                    Children's ministry
                                  </h5>
                                  <p className="hidden text-sm md:block">
                                    Programs for all ages
                                  </p>
                                </div>
                              </a>
                              <a
                                  href="#"
                                  className="grid w-full auto-cols-fr grid-cols-[max-content_1fr] items-center gap-x-3 py-2 group/11"
                              >
                                <div className="flex size-8 flex-col items-center justify-center rounded-lg bg-white-to-dark p-1">
                                  <AimLogo />
                                </div>
                                <div className="flex flex-col items-start justify-center">
                                  <h5 className="font-semibold">
                                    Sooyoungro church
                                  </h5>
                                  <p className="hidden text-sm md:block">
                                    Our parent church in Korea
                                  </p>
                                </div>
                              </a>
                            </div>
                          </div>

                        </div>
                      </div>
                    </motion.nav>
                  </AnimatePresence>
                </div>
                <div className="mt-6 flex flex-col gap-4">
                  <Button title="Button" size="sm" className="button bg-white rounded-full py-4 border-none">
                    LOG IN
                  </Button>
                  <Button title="Button" variant="secondary" size="sm" className="button bg-accent rounded-full py-4   border-none">
                    SIGN UP
                  </Button>

                </div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </nav>
  );
}