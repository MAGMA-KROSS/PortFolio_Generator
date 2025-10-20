'use client'; // This component uses client-side hooks

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import portfolioData from '../data/data.json';
// Define the structure for social links
interface SocialLinks {
  github: string;
  linkedin: string;
}

// Navigation links data
const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const data = portfolioData;
  // State for mobile menu visibility
  const [isOpen, setIsOpen] = useState(false);
  // State to track if the page has been scrolled
  const [isScrolled, setIsScrolled] = useState(false);
  // State for social links fetched from JSON
  const [socials, setSocials] = useState<SocialLinks | null>(null);
  const menuVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
  };
  // --- Effect for Scroll Detection ---
  useEffect(() => {
    const handleScroll = () => {
      // Set isScrolled to true if user has scrolled more than 10px
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    // Cleanup function to remove the event listener
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- Effect for Data Fetching ---
  useEffect(() => {
    // Fetch social links from the local JSON file
    fetch('/data/user.json')
      .then((res) => res.json())
      .then((data) => setSocials(data.socialLinks));
  }, []);

  // Framer Motion variants for the mobile menu

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#0a0a0a]/80 backdrop-blur-sm shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* --- Logo / Name --- */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold uppercase transition-all duration-300 text-gray-50 hover:text-neon-cyan hover:drop-shadow-neon-cyan">
              {data.name}
            </Link>
          </div>

          {/* --- Desktop Navigation Links --- */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-gray-300 transition-colors duration-300 rounded-md hover:text-neon-cyan"
              >
                {link.name}
              </Link>
            ))}
          </div>
          
          {/* --- Social Icons (Desktop) --- */}
          {socials && (
            <div className="hidden md:flex md:items-center md:space-x-5">
              <Link href={socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
                <FaGithub className="w-6 h-6 text-gray-300 transition-colors duration-300 hover:text-neon-cyan" />
              </Link>
              <Link href={socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
                <FaLinkedin className="w-6 h-6 text-gray-300 transition-colors duration-300 hover:text-neon-cyan" />
              </Link>
            </div>
          )}

          {/* --- Mobile Menu Button --- */}
          <div className="flex -mr-2 md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {/* Animated Hamburger/Close Icon */}
              <div className="w-6 h-6">
                <motion.div
                  animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 6 : 0 }}
                  className="w-6 h-0.5 bg-gray-300"
                />
                <motion.div
                  animate={{ opacity: isOpen ? 0 : 1 }}
                  className="w-6 h-0.5 bg-gray-300 my-1.5"
                />
                <motion.div
                  animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -6 : 0 }}
                  className="w-6 h-0.5 bg-gray-300"
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* --- Mobile Menu --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            className="md:hidden bg-[#0a0a0a]/95 backdrop-blur-md"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)} // Close menu on link click
                  className="block px-3 py-2 text-base font-medium text-center text-gray-300 rounded-md hover:bg-gray-800 hover:text-white"
                >
                  {link.name}
                </Link>
              ))}
              {/* Social Icons for Mobile Menu */}
              {socials && (
                <div className="flex justify-center pt-4 space-x-6 border-t border-gray-700">
                  <Link href={socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
                    <FaGithub className="w-8 h-8 text-gray-300" />
                  </Link>
                  <Link href={socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
                    <FaLinkedin className="w-8 h-8 text-gray-300" />
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;