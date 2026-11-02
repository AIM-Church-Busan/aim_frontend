'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LuChevronDown } from 'react-icons/lu';
import { withBasePath } from '@/lib/basePath';
import ButtonE from '@/components/common/buttons/ButtonE';
import DropdownContent from './navigation/DropdownContent';
import { navigationMenus } from './navigation/menus';
import styles from './navigation/Navbar.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef(null);
  const toggleRef = useRef(null);
  const triggerRefs = useRef({});
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  const activeMenu = navigationMenus.find((menu) => menu.id === openMenu);
  const menuOpen = Boolean(activeMenu || mobileOpen);
  const transition = {
    duration: reducedMotion ? 0 : 0.35,
    ease: [0.4, 0, 0.2, 1],
  };

  const closeMenus = () => {
    setOpenMenu(null);
    setMobileOpen(false);
  };

  useEffect(() => {
    if (!document.querySelector('#hero')) return;
    const trigger = ScrollTrigger.create({
      trigger: '#hero',
      start: 'bottom top',
      onEnter: () => setScrolled(true),
      onLeaveBack: () => setScrolled(false),
    });
    return () => trigger.kill();
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const scrollY = window.scrollY;
    const body = document.body;
    const previous = {
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
    };
    Object.assign(body.style, {
      position: 'fixed',
      top: `-${scrollY}px`,
      width: '100%',
    });
    return () => {
      Object.assign(body.style, previous);
      window.scrollTo(0, scrollY);
    };
  }, [mobileOpen]);

  useEffect(() => {
    const breakpoint = window.matchMedia('(min-width: 1024px)');
    const reset = () => {
      setOpenMenu(null);
      setMobileOpen(false);
    };
    breakpoint.addEventListener('change', reset);
    return () => breakpoint.removeEventListener('change', reset);
  }, []);

  useEffect(() => {
    const outside = (event) => {
      if (!navRef.current?.contains(event.target)) {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    const keyboard = (event) => {
      if (event.key === 'Escape') {
        if (mobileOpen) toggleRef.current?.focus();
        else if (openMenu) triggerRefs.current[openMenu]?.focus();
        setOpenMenu(null);
        setMobileOpen(false);
      }
      if (event.key === 'Tab' && mobileOpen) {
        const focusable = [
          ...navRef.current.querySelectorAll('a[href], button:not([disabled])'),
        ].filter((element) => element.getClientRects().length);
        const first = focusable[0];
        const last = focusable.at(-1);
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener('pointerdown', outside);
    document.addEventListener('keydown', keyboard);
    return () => {
      document.removeEventListener('pointerdown', outside);
      document.removeEventListener('keydown', keyboard);
    };
  }, [mobileOpen, openMenu]);

  const handleTriggerKey = (event, index) => {
    const menu = navigationMenus[index];
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setOpenMenu(menu.id);
      requestAnimationFrame(() =>
        navRef.current.querySelector(`#desktop-${menu.id} a`)?.focus(),
      );
    } else if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      const direction = event.key === 'ArrowRight' ? 1 : -1;
      const next =
        navigationMenus[
          (index + direction + navigationMenus.length) % navigationMenus.length
        ];
      setOpenMenu(next.id);
      triggerRefs.current[next.id]?.focus();
    }
  };

  return (
    <>
      {(activeMenu || mobileOpen) && (
        <div className={styles.backdrop} aria-hidden="true" />
      )}
      <nav
        ref={navRef}
        aria-label="Main navigation"
        className={`${styles.nav} ${scrolled || menuOpen ? styles.solid : ''} ${menuOpen ? styles.expanded : ''}`}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget))
            setOpenMenu(null);
        }}
      >
        <div className={styles.shell}>
          <div className={styles.header}>
            <Link
              href="/"
              className={styles.brand}
              onClick={closeMenus}
              aria-label="AIM Church home"
            >
              <Image
                src={withBasePath('/logo.png')}
                alt=""
                width={32}
                height={32}
              />
              <span className={styles.brandCopy}>
                <span className={styles.brandName}>AIM</span>
                <span className={styles.brandSubtitle}>수영로 교회</span>
              </span>
            </Link>
            <div className={styles.desktopNav}>
              {navigationMenus.map((menu, index) => (
                <button
                  key={menu.id}
                  ref={(element) => {
                    triggerRefs.current[menu.id] = element;
                  }}
                  id={`trigger-${menu.id}`}
                  type="button"
                  className={`rounded-full ${styles.trigger} ${openMenu === menu.id ? styles.active : ''}`}
                  aria-expanded={openMenu === menu.id}
                  aria-controls={`desktop-${menu.id}`}
                  onPointerEnter={(event) => {
                    if (event.pointerType === 'mouse') {
                      setOpenMenu(menu.id);
                    }
                  }}
                  onClick={(event) => {
                    setOpenMenu(
                      event.detail === 0 && openMenu === menu.id
                        ? null
                        : menu.id,
                    );
                  }}
                  onKeyDown={(event) => handleTriggerKey(event, index)}
                >
                  <span className={styles.triggerLabel}>
                    <span className={styles.triggerText}>
                      <span>{menu.label}</span>
                      <span aria-hidden="true">{menu.label}</span>
                    </span>
                  </span>
                  {menu.id === 'more' && <LuChevronDown aria-hidden="true" />}
                </button>
              ))}
            </div>
            <div className={styles.desktopAuth}>
              <button type="button" className={`rounded-full ${styles.login}`}>
                Log In
              </button>
              <ButtonE
                type="button"
                className={`rounded-full ${styles.signup}`}
                aria-label="Sign Up"
              >
                Sign Up
              </ButtonE>
            </div>
            <button
              ref={toggleRef}
              type="button"
              className={`rounded-full ${styles.menuToggle}`}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
              onClick={() => {
                setMobileOpen((value) => !value);
                setOpenMenu(null);
              }}
            >
              <motion.span
                className={styles.toggleLine}
                animate={{ y: menuOpen ? 3.5 : 0, rotate: menuOpen ? 45 : 0 }}
                transition={transition}
              />
              <motion.span
                className={styles.toggleLine}
                animate={{ y: menuOpen ? -3.5 : 0, rotate: menuOpen ? -45 : 0 }}
                transition={transition}
              />
            </button>
          </div>
          {activeMenu && (
            <motion.div
              className={styles.desktopPanel}
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              transition={transition}
            >
              <motion.div
                key={activeMenu.id}
                id={`desktop-${activeMenu.id}`}
                aria-labelledby={`trigger-${activeMenu.id}`}
                initial={{ opacity: 0, y: reducedMotion ? 0 : 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={transition}
              >
                <DropdownContent menu={activeMenu} onNavigate={closeMenus} />
              </motion.div>
            </motion.div>
          )}
          {mobileOpen && (
            <div id="mobile-navigation" className={styles.mobilePanel}>
              {navigationMenus.map((menu) => (
                <div key={menu.id} className={styles.mobileSection}>
                  <button
                    id={`mobile-trigger-${menu.id}`}
                    type="button"
                    className={`rounded-full ${styles.mobileTrigger}`}
                    aria-expanded={openMenu === menu.id}
                    aria-controls={`mobile-${menu.id}`}
                    onClick={() =>
                      setOpenMenu((current) =>
                        current === menu.id ? null : menu.id,
                      )
                    }
                  >
                    {menu.label}
                    <LuChevronDown aria-hidden="true" />
                  </button>
                  {openMenu === menu.id && (
                    <motion.div
                      id={`mobile-${menu.id}`}
                      aria-labelledby={`mobile-trigger-${menu.id}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={transition}
                    >
                      <DropdownContent
                        menu={menu}
                        onNavigate={closeMenus}
                        mobile
                      />
                    </motion.div>
                  )}
                </div>
              ))}
              <div className={styles.mobileAuth}>
                <button
                  type="button"
                  className={`rounded-full ${styles.login}`}
                >
                  Log In
                </button>
                <button
                  type="button"
                  className={`rounded-full ${styles.signup}`}
                >
                  Sign Up
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
