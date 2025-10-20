'use client'; // This component requires client-side interactivity (hooks)

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

// --- TypeScript Interfaces for Type Safety ---
interface NavLink {
  name: string;
  href: string;
}

interface SocialLinks {
  github: string;
  linkedin: string;
}

interface NavbarData {
  logo: string;
  navLinks: NavLink[];
  socialLinks: SocialLinks;
}

const Navbar = () => {
  // --- State Management ---
  const [isOpen, setIsOpen] = useState(false); // Mobile menu visibility
  const [isScrolled, setIsScrolled] = useState(false); // Navbar background on scroll
  const [navData, setNavData] = useState<NavbarData | null>(null); // Data from JSON

  // --- Data Fetching Effect ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/user.json');
        const data = await response.json();
        setNavData({
          logo: data.logo,
          navLinks: data.navLinks,
          socialLinks: data.socialLinks,
        });
      } catch (error) {
        console.error("Failed to fetch navbar data:", error);
      }
    };
    fetchData();
  }, []);

  // --- Scroll Detection Effect ---
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- Animation Logic (Framer Motion) ---
  const mobileMenuVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.2, ease: 'easeOut' } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.15, ease: 'easeIn' } },
  };

  // Render a loading skeleton or null while data is fetching
  if (!navData) return null;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#0a0a0a]/80 backdrop-blur-lg shadow-lg shadow-neon-cyan/5' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold uppercase transition-all duration-300 filter text-neon-cyan drop-shadow-neon-cyan hover:drop-shadow-[0_0_15px_#00ffff]">
            {navData.logo}
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center space-x-8">
            {navData.navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="font-medium text-gray-300 transition-all duration-300 hover:text-neon-cyan hover:drop-shadow-[0_0_8px_#00ffff]">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          
          {/* Social Icons (Desktop) */}
          <div className="hidden md:flex items-center space-x-5">
            <a href={navData.socialLinks.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FaGithub className="w-6 h-6 text-gray-300 transition-colors duration-300 hover:text-neon-cyan" />
            </a>
            <a href={navData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin className="w-6 h-6 text-gray-300 transition-colors duration-300 hover:text-neon-cyan" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
              className="z-50 p-2 text-gray-300 rounded-md focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {/* Animated Hamburger Icon */}
              <div className="w-6 h-6">
                  <motion.div animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 6 : 0 }} className="w-6 h-0.5 bg-gray-300" />
                  <motion.div animate={{ opacity: isOpen ? 0 : 1 }} className="w-6 h-0.5 my-1.5 bg-gray-300" />
                  <motion.div animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -6 : 0 }} className="w-6 h-0.5 bg-gray-300" />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute top-0 left-0 w-full pt-20 bg-[#0a0a0a] md:hidden"
          >
            <ul className="flex flex-col items-center px-2 pt-2 pb-8 space-y-6">
              {navData.navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} onClick={() => setIsOpen(false)} className="block text-xl font-semibold text-center text-gray-300">
                    {link.name}
                  </a>
                </li>
              ))}
              {/* Social Icons (Mobile) */}
              <li className="flex items-center pt-6 space-x-8 border-t border-gray-700/50">
                  <a href={navData.socialLinks.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <FaGithub className="w-8 h-8 text-gray-300" />
                  </a>
                  <a href={navData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <FaLinkedin className="w-8 h-8 text-gray-300" />
                  </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;