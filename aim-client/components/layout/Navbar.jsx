"use client";

import { Button, useMediaQuery } from "@relume_io/relume-ui";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RxChevronDown, RxChevronRight } from "react-icons/rx";
import ButtonA from "@/components/common/buttons/ButtonA"
import ButtonC from "@/components/common/buttons/ButtonC"

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

  const animateMobileMenu = isMobileMenuOpen ? "open" : "close";
  const animateMobileMenuButtonSpan = isMobileMenuOpen ? ["open", "rotatePhase"] : "closed";

  const animateDropdownMenu = isDropdownOpen ? "open" : "close";
  const animateDropdownMenuIcon = isDropdownOpen ? "rotated" : "initial";

  const animateMoreDropdownMenu = isMoreDropdownOpen ? "open" : "close";
  const animateMoreDropdownMenuIcon = isMoreDropdownOpen ? "rotated" : "initial";

  return {
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: "#hero",
      start: "bottom top",
      onEnter: () => setScrolled(true),
      onLeaveBack: () => setScrolled(false),
    });

    return () => trigger.kill();
  }, []);


  const useActive = useRelume();
  return (
      <section
          id="relume"
          className="fixed z-50 top-4 flex w-full items-center px-4 lg:px-12 min-h-16 md:min-h-18"
      >
        <div className={scrolled ? "navbar--solid mx-auto flex size-full max-w-full items-center justify-between rounded-2xl px-8 min-h-16 lg:min-h-auto transition-colors duration-300 ease"
            : "navbar--transparent mx-auto flex size-full max-w-full items-center justify-between rounded-2xl px-8 min-h-16 lg:min-h-auto transition-colors duration-300 ease"}>
          <a href="/" className="flex flex-row items-center gap-1">
            <img
                src="/logo.png"
                alt="Logo image"
                className="w-8 h-8 object-cover object-center"
            />
            <div className="flex flex-row items-baseline gap-1">
              <p className={scrolled ? "text-2xl text-foreground font-semibold transition-colors duration-300 ease" : "text-2xl text-white font-semibold transition-colors duration-300 ease"}>AIM</p>
              <p className={`text-xs transition-colors duration-300 ease ${scrolled ? "text-gray" : "text-white"}`}>수영로 교회</p>
            </div>
          </a>
          <div className="absolute hidden h-screen overflow-auto px-[5%] pb-24 pt-4 md:pb-0 lg:static lg:ml-6 lg:flex lg:h-auto lg:flex-1 lg:items-center lg:justify-between lg:border-none lg:bg-none lg:px-0 lg:pt-0 lg:overflow-visible">
            <div className="flex flex-col items-center lg:flex-row">
              <a
                  href="#"
                  className={`relative block w-auto py-3 text-md lg:inline-block lg:px-4 lg:py-6 lg:text-base transition-colors duration-300 ease ${scrolled ? "text-foreground" : "text-white"}`}
              >
                About us
              </a>
              <a
                  href="#"
                  className={`relative block w-auto py-3 text-md lg:inline-block lg:px-4 lg:py-6 lg:text-base transition-colors duration-300 ease ${scrolled ? "text-foreground" : "text-white"}`}
              >
                Plan your visit
              </a>
              <a
                  href="#"
                  className={`relative block w-auto py-3 text-md lg:inline-block lg:px-4 lg:py-6 lg:text-base transition-colors duration-300 ease ${scrolled ? "text-foreground" : "text-white"}`}
              >
                Sermons
              </a>
              <a
                  href="#"
                  className={`relative block w-auto py-3 text-md lg:inline-block lg:px-4 lg:py-6 lg:text-base transition-colors duration-300 ease ${scrolled ? "text-foreground" : "text-white"}`}
              >
                Join
              </a>
              <a
                  href="#"
                  className={`relative block w-auto py-3 text-md lg:inline-block lg:px-4 lg:py-6 lg:text-base transition-colors duration-300 ease ${scrolled ? "text-foreground" : "text-white"}`}
              >
                Announcements
              </a>

              <div
                  onMouseEnter={useActive.openOnDesktopMoreDropdownMenu}
                  onMouseLeave={useActive.closeOnDesktopMoreDropdownMenu}
              >
                <button
                    className={`relative flex w-full items-center justify-between whitespace-nowrap py-3 text-md lg:w-auto lg:justify-start lg:gap-2 lg:px-4 lg:py-6 lg:text-base duration-300 ease ${scrolled ? "text-foreground" : "text-white"}` }
                    onClick={useActive.openOnMobileMoreDropdownMenu}
                >
                  <span>More</span>
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
                      className="bottom-auto left-0 top-full w-full max-w-3/4 xl:max-w-2/3 overflow-hidden bg-transparent lg:absolute lg:w-screen px-12 lg:[--height-close:auto]"
                  >
                    <div className="flex size-full max-w-full items-center justify-start bg-background rounded-2xl px-8 mt-2">
                      <div className="flex w-full flex-col lg:flex-row">
                        <div className="grid flex-1 auto-cols-fr grid-cols-1 gap-x-8 gap-y-6 py-4 md:grid-cols-3 md:gap-y-0 md:py-8 lg:pr-8">
                          <div className="grid auto-cols-fr grid-cols-1 grid-rows-[max-content_max-content_max-content_max-content] gap-y-2 md:gap-y-4">
                            <h4 className="text-sm font-semibold leading-[1.3]">
                              Getting started
                            </h4>
                            <a
                                href="#"
                                className="grid w-full auto-cols-fr grid-cols-[max-content_1fr] items-start gap-x-3 py-2"
                            >
                              <div className="flex size-6 flex-col items-center justify-center">
                                <img
                                    src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                                    alt="Icon 1"
                                    className="shrink-0"
                                />
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
                                className="grid w-full auto-cols-fr grid-cols-[max-content_1fr] items-start gap-x-3 py-2"
                            >
                              <div className="flex size-6 flex-col items-center justify-center">
                                <img
                                    src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                                    alt="Icon 2"
                                    className="shrink-0"
                                />
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
                                className="grid w-full auto-cols-fr grid-cols-[max-content_1fr] items-start gap-x-3 py-2"
                            >
                              <div className="flex size-6 flex-col items-center justify-center">
                                <img
                                    src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                                    alt="Icon 3"
                                    className="shrink-0"
                                />
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
                                className="grid w-full auto-cols-fr grid-cols-[max-content_1fr] items-start gap-x-3 py-2"
                            >
                              <div className="flex size-6 flex-col items-center justify-center">
                                <img
                                    src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                                    alt="Icon 4"
                                    className="shrink-0"
                                />
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
                            <h4 className="text-sm font-semibold leading-[1.3]">
                              Information
                            </h4>
                            <a
                                href="#"
                                className="grid w-full auto-cols-fr grid-cols-[max-content_1fr] items-start gap-x-3 py-2"
                            >
                              <div className="flex size-6 flex-col items-center justify-center">
                                <img
                                    src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                                    alt="Icon 5"
                                    className="shrink-0"
                                />
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
                                className="grid w-full auto-cols-fr grid-cols-[max-content_1fr] items-start gap-x-3 py-2"
                            >
                              <div className="flex size-6 flex-col items-center justify-center">
                                <img
                                    src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                                    alt="Icon 6"
                                    className="shrink-0"
                                />
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
                                className="grid w-full auto-cols-fr grid-cols-[max-content_1fr] items-start gap-x-3 py-2"
                            >
                              <div className="flex size-6 flex-col items-center justify-center">
                                <img
                                    src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                                    alt="Icon 7"
                                    className="shrink-0"
                                />
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
                                className="grid w-full auto-cols-fr grid-cols-[max-content_1fr] items-start gap-x-3 py-2"
                            >
                              <div className="flex size-6 flex-col items-center justify-center">
                                <img
                                    src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                                    alt="Icon 8"
                                    className="shrink-0"
                                />
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
                            <h4 className="text-sm font-semibold leading-[1.3]">
                              Resources
                            </h4>
                            <a
                                href="#"
                                className="grid w-full auto-cols-fr grid-cols-[max-content_1fr] items-start gap-x-3 py-2"
                            >
                              <div className="flex size-6 flex-col items-center justify-center">
                                <img
                                    src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                                    alt="Icon 9"
                                    className="shrink-0"
                                />
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
                                className="grid w-full auto-cols-fr grid-cols-[max-content_1fr] items-start gap-x-3 py-2"
                            >
                              <div className="flex size-6 flex-col items-center justify-center">
                                <img
                                    src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                                    alt="Icon 10"
                                    className="shrink-0"
                                />
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
                                className="grid w-full auto-cols-fr grid-cols-[max-content_1fr] items-start gap-x-3 py-2"
                            >
                              <div className="flex size-6 flex-col items-center justify-center">
                                <img
                                    src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                                    alt="Icon 11"
                                    className="shrink-0"
                                />
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
                                className="grid w-full auto-cols-fr grid-cols-[max-content_1fr] items-start gap-x-3 py-2"
                            >
                              <div className="flex size-6 flex-col items-center justify-center">
                                <img
                                    src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                                    alt="Icon 12"
                                    className="shrink-0"
                                />
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
            </div>
            <div className="flex items-center gap-4">
              <ButtonA>Sign Up</ButtonA>
              <ButtonC>Log In</ButtonC>
            </div>
          </div>

          {/* Mobile */}
          <button
              className="-mr-2 flex size-12 cursor-pointer flex-col items-center justify-center lg:hidden"
              onClick={useActive.toggleMobileMenu}
          >
            <motion.span
                className={`my-[3px] h-0.5 w-6 ${scrolled ? "bg-black" : "bg-white"}`}
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
                className={`my-[3px] h-0.5 w-6 ${scrolled ? "bg-black" : "bg-white"}`}
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
                className={`my-[3px] h-0.5 w-6 ${scrolled ? "bg-black" : "bg-white"}`}
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
          >
            <motion.div
                variants={{ open: { y: 0 }, close: { y: "-100%" } }}
                animate={useActive.animateMobileMenu}
                initial="close"
                exit="close"
                transition={{ duration: 0.4 }}
                className="absolute left-0 right-0 top-0 block h-dvh overflow-auto px-4 pb-8 pt-4"
            >
              <div className="flex flex-col bg-background p-8 rounded-2xl">
                <a
                    href="#"
                    className="relative block w-auto py-3 text-md lg:inline-block lg:px-4 lg:py-6 lg:text-base"
                >
                  Link One
                </a>
                <a
                    href="#"
                    className="relative block w-auto py-3 text-md lg:inline-block lg:px-4 lg:py-6 lg:text-base"
                >
                  Link Two
                </a>
                <a
                    href="#"
                    className="relative block w-auto py-3 text-md lg:inline-block lg:px-4 lg:py-6 lg:text-base"
                >
                  Link Three
                </a>
                <div>
                  <button
                      className="relative flex w-full items-center justify-between whitespace-nowrap py-3 text-md lg:w-auto lg:justify-start lg:gap-2 lg:px-4 lg:py-6 lg:text-base"
                      onClick={useActive.openOnMobileDropdownMenu}
                  >
                    <span>Link Four</span>
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
                        className="bottom-auto left-0 top-full w-full min-w-full max-w-full overflow-hidden bg-background lg:absolute lg:w-screen lg:border-b lg:border-border-primary lg:px-[5%] lg:[--height-close:auto]"
                    >
                      <div className="mx-auto flex size-full max-w-full items-center justify-between">
                        <div className="flex w-full flex-col lg:flex-row">
                          <div className="grid flex-1 auto-cols-fr grid-cols-1 gap-x-8 gap-y-6 py-4 md:grid-cols-3 md:gap-y-0 md:py-8 lg:pr-8">
                            <div className="grid auto-cols-fr grid-cols-1 grid-rows-[max-content_max-content_max-content_max-content] gap-y-2 md:gap-y-4">
                              <h4 className="text-sm font-semibold leading-[1.3]">
                                Page group one
                              </h4>
                              <a
                                  href="#"
                                  className="grid w-full auto-cols-fr grid-cols-[max-content_1fr] items-start gap-x-3 py-2"
                              >
                                <div className="flex size-6 flex-col items-center justify-center">
                                  <img
                                      src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                                      alt="Icon 1"
                                      className="shrink-0"
                                  />
                                </div>
                                <div className="flex flex-col items-start justify-center">
                                  <h5 className="font-semibold">Page One</h5>
                                  <p className="hidden text-sm md:block">
                                    Lorem ipsum dolor sit amet consectetur elit
                                  </p>
                                </div>
                              </a>
                              <a
                                  href="#"
                                  className="grid w-full auto-cols-fr grid-cols-[max-content_1fr] items-start gap-x-3 py-2"
                              >
                                <div className="flex size-6 flex-col items-center justify-center">
                                  <img
                                      src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                                      alt="Icon 2"
                                      className="shrink-0"
                                  />
                                </div>
                                <div className="flex flex-col items-start justify-center">
                                  <h5 className="font-semibold">Page Two</h5>
                                  <p className="hidden text-sm md:block">
                                    Lorem ipsum dolor sit amet consectetur elit
                                  </p>
                                </div>
                              </a>
                              <a
                                  href="#"
                                  className="grid w-full auto-cols-fr grid-cols-[max-content_1fr] items-start gap-x-3 py-2"
                              >
                                <div className="flex size-6 flex-col items-center justify-center">
                                  <img
                                      src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                                      alt="Icon 3"
                                      className="shrink-0"
                                  />
                                </div>
                                <div className="flex flex-col items-start justify-center">
                                  <h5 className="font-semibold">Page Three</h5>
                                  <p className="hidden text-sm md:block">
                                    Lorem ipsum dolor sit amet consectetur elit
                                  </p>
                                </div>
                              </a>
                              <a
                                  href="#"
                                  className="grid w-full auto-cols-fr grid-cols-[max-content_1fr] items-start gap-x-3 py-2"
                              >
                                <div className="flex size-6 flex-col items-center justify-center">
                                  <img
                                      src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                                      alt="Icon 4"
                                      className="shrink-0"
                                  />
                                </div>
                                <div className="flex flex-col items-start justify-center">
                                  <h5 className="font-semibold">Page Four</h5>
                                  <p className="hidden text-sm md:block">
                                    Lorem ipsum dolor sit amet consectetur elit
                                  </p>
                                </div>
                              </a>
                            </div>
                            <div className="grid auto-cols-fr grid-cols-1 grid-rows-[max-content_max-content_max-content_max-content] gap-y-2 md:gap-y-4">
                              <h4 className="text-sm font-semibold leading-[1.3]">
                                Page group two
                              </h4>
                              <a
                                  href="#"
                                  className="grid w-full auto-cols-fr grid-cols-[max-content_1fr] items-start gap-x-3 py-2"
                              >
                                <div className="flex size-6 flex-col items-center justify-center">
                                  <img
                                      src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                                      alt="Icon 5"
                                      className="shrink-0"
                                  />
                                </div>
                                <div className="flex flex-col items-start justify-center">
                                  <h5 className="font-semibold">Page Five</h5>
                                  <p className="hidden text-sm md:block">
                                    Lorem ipsum dolor sit amet consectetur elit
                                  </p>
                                </div>
                              </a>
                              <a
                                  href="#"
                                  className="grid w-full auto-cols-fr grid-cols-[max-content_1fr] items-start gap-x-3 py-2"
                              >
                                <div className="flex size-6 flex-col items-center justify-center">
                                  <img
                                      src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                                      alt="Icon 6"
                                      className="shrink-0"
                                  />
                                </div>
                                <div className="flex flex-col items-start justify-center">
                                  <h5 className="font-semibold">Page Six</h5>
                                  <p className="hidden text-sm md:block">
                                    Lorem ipsum dolor sit amet consectetur elit
                                  </p>
                                </div>
                              </a>
                              <a
                                  href="#"
                                  className="grid w-full auto-cols-fr grid-cols-[max-content_1fr] items-start gap-x-3 py-2"
                              >
                                <div className="flex size-6 flex-col items-center justify-center">
                                  <img
                                      src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                                      alt="Icon 7"
                                      className="shrink-0"
                                  />
                                </div>
                                <div className="flex flex-col items-start justify-center">
                                  <h5 className="font-semibold">Page Seven</h5>
                                  <p className="hidden text-sm md:block">
                                    Lorem ipsum dolor sit amet consectetur elit
                                  </p>
                                </div>
                              </a>
                              <a
                                  href="#"
                                  className="grid w-full auto-cols-fr grid-cols-[max-content_1fr] items-start gap-x-3 py-2"
                              >
                                <div className="flex size-6 flex-col items-center justify-center">
                                  <img
                                      src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                                      alt="Icon 8"
                                      className="shrink-0"
                                  />
                                </div>
                                <div className="flex flex-col items-start justify-center">
                                  <h5 className="font-semibold">Page Eight</h5>
                                  <p className="hidden text-sm md:block">
                                    Lorem ipsum dolor sit amet consectetur elit
                                  </p>
                                </div>
                              </a>
                            </div>
                            <div className="grid auto-cols-fr grid-cols-1 grid-rows-[max-content_max-content_max-content_max-content] gap-y-2 md:gap-y-4">
                              <h4 className="text-sm font-semibold leading-[1.3]">
                                Page group three
                              </h4>
                              <a
                                  href="#"
                                  className="grid w-full auto-cols-fr grid-cols-[max-content_1fr] items-start gap-x-3 py-2"
                              >
                                <div className="flex size-6 flex-col items-center justify-center">
                                  <img
                                      src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                                      alt="Icon 9"
                                      className="shrink-0"
                                  />
                                </div>
                                <div className="flex flex-col items-start justify-center">
                                  <h5 className="font-semibold">Page Nine</h5>
                                  <p className="hidden text-sm md:block">
                                    Lorem ipsum dolor sit amet consectetur elit
                                  </p>
                                </div>
                              </a>
                              <a
                                  href="#"
                                  className="grid w-full auto-cols-fr grid-cols-[max-content_1fr] items-start gap-x-3 py-2"
                              >
                                <div className="flex size-6 flex-col items-center justify-center">
                                  <img
                                      src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                                      alt="Icon 10"
                                      className="shrink-0"
                                  />
                                </div>
                                <div className="flex flex-col items-start justify-center">
                                  <h5 className="font-semibold">Page Ten</h5>
                                  <p className="hidden text-sm md:block">
                                    Lorem ipsum dolor sit amet consectetur elit
                                  </p>
                                </div>
                              </a>
                              <a
                                  href="#"
                                  className="grid w-full auto-cols-fr grid-cols-[max-content_1fr] items-start gap-x-3 py-2"
                              >
                                <div className="flex size-6 flex-col items-center justify-center">
                                  <img
                                      src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                                      alt="Icon 11"
                                      className="shrink-0"
                                  />
                                </div>
                                <div className="flex flex-col items-start justify-center">
                                  <h5 className="font-semibold">Page Eleven</h5>
                                  <p className="hidden text-sm md:block">
                                    Lorem ipsum dolor sit amet consectetur elit
                                  </p>
                                </div>
                              </a>
                              <a
                                  href="#"
                                  className="grid w-full auto-cols-fr grid-cols-[max-content_1fr] items-start gap-x-3 py-2"
                              >
                                <div className="flex size-6 flex-col items-center justify-center">
                                  <img
                                      src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                                      alt="Icon 12"
                                      className="shrink-0"
                                  />
                                </div>
                                <div className="flex flex-col items-start justify-center">
                                  <h5 className="font-semibold">Page Twelve</h5>
                                  <p className="hidden text-sm md:block">
                                    Lorem ipsum dolor sit amet consectetur elit
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
                  <Button title="Button" variant="secondary" size="sm">
                    Button
                  </Button>
                  <Button title="Button" size="sm">
                    Button
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </section>
  );
}