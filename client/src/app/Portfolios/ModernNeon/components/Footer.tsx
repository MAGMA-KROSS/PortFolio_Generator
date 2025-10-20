'use client'; // Required for the useEffect hook

import React, { useState, useEffect } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

// --- TypeScript Interface for the data we need ---
interface FooterData {
  name: string;
  socialLinks: {
    github: string;
    linkedin: string;
  };
}

const Footer = () => {
  // --- State for storing the fetched data ---
  const [footerData, setFooterData] = useState<FooterData | null>(null);

  // --- Fetch data from the JSON file ---
  useEffect(() => {
    fetch('/data/user.json')
      .then((res) => res.json())
      .then((data) => {
        // We only need the name and social links for the footer
        setFooterData({
          name: data.name,
          socialLinks: data.socialLinks,
        });
      });
  }, []);

  const currentYear = new Date().getFullYear();

  // Don't render the component until the data has been fetched
  if (!footerData) return null;

  return (
    <footer className="bg-[#0a0a0a] border-t-2 border-neon-cyan/20 py-8 text-gray-400">
      <div className="max-w-6xl px-4 mx-auto">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          
          {/* Copyright Notice */}
          <div className="text-sm text-center sm:text-left">
            <p>&copy; {currentYear} {footerData.name}. All Rights Reserved.</p>
          </div>
          
          {/* Social Media Icons */}
          <div className="flex items-center space-x-6">
            <a 
              href={footerData.socialLinks.github} 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="GitHub Profile"
              className="transition-transform duration-300 hover:text-neon-cyan hover:scale-125"
            >
              <FaGithub size={24} />
            </a>
            <a 
              href={footerData.socialLinks.linkedin} 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="LinkedIn Profile"
              className="transition-transform duration-300 hover:text-neon-cyan hover:scale-125"
            >
              <FaLinkedin size={24} />
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;