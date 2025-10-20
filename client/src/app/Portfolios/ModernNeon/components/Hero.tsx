'use client'; // This component uses client-side hooks (useState, useEffect)

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion,Variants } from 'framer-motion';

// Define the structure of the user data
interface UserData {
  name: string;
  title: string;
  description: string;
  profileImage: string;
  socialLinks: {
    github: string;
    linkedin: string;
  };
}

const HeroSection = () => {
  // State to hold user data fetched from JSON
  const [userData, setUserData] = useState<UserData | null>(null);

  // --- Data Fetching ---
  // Fetch user data from the local JSON file on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/user.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: UserData = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs only once

  // --- Animation Variants (Framer Motion) ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Animate children one by one
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  // Render a loading state while data is being fetched
  if (!userData) {
    return (
      <section className="flex items-center justify-center min-h-screen bg-[#0a0a0a]">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-neon-cyan"></div>
      </section>
    );
  }

  return (
    <section id="hero" className="flex items-center min-h-screen bg-[#0a0a0a] text-white font-sans p-4 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10">
        {/* Optional: Add a subtle background grid or pattern here */}
      </div>
      
      {/* --- Main Content Grid --- */}
      <motion.div
        className="relative z-10 grid items-center max-w-6xl gap-12 mx-auto md:grid-cols-2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        
        {/* --- Left Column: Text Content --- */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <motion.h1 
            className="mb-4 text-4xl font-bold tracking-tight text-white uppercase sm:text-5xl lg:text-6xl font-orbitron filter drop-shadow-neon-cyan"
            variants={itemVariants}
          >
            {userData.name}
          </motion.h1>

          <motion.p 
            className="mb-6 text-lg text-gray-300 md:text-xl"
            variants={itemVariants}
          >
            {userData.title}
          </motion.p>
          
          <motion.p 
            className="max-w-md mb-8 text-gray-400"
            variants={itemVariants}
          >
            {userData.description}
          </motion.p>
          
          {/* --- Action Buttons --- */}
          <motion.div 
            className="flex flex-col gap-4 sm:flex-row"
            variants={itemVariants}
          >
            <a
              href="#projects"
              aria-label="View my projects"
              className="px-6 py-3 font-semibold text-center uppercase transition-all duration-300 border-2 rounded-md border-neon-cyan text-neon-cyan hover:bg-neon-cyan/20 hover:shadow-[0_0_20px_#00ffff] hover:scale-105"
            >
              View Projects
            </a>
            <a
              href="#contact"
              aria-label="Contact me"
              className="px-6 py-3 font-semibold text-center uppercase transition-all duration-300 border-2 rounded-md border-neon-magenta text-neon-magenta hover:bg-neon-magenta/20 hover:shadow-[0_0_20px_#ff00ff] hover:scale-105"
            >
              Contact Me
            </a>
          </motion.div>
        </div>
        
        {/* --- Right Column: Profile Image --- */}
        <motion.div 
          className="flex justify-center"
          variants={itemVariants}
          // Add a subtle glow pulse animation to the image container
          animate={{
            filter: [
              'drop-shadow(0 0 10px #00ffff88)',
              'drop-shadow(0 0 20px #00ffffaa)',
              'drop-shadow(0 0 10px #00ffff88)',
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80">
            <Image
              src={userData.profileImage}
              alt="A portrait of the developer"
              fill
              className="object-cover rounded-full"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority // Load image immediately as it's above the fold
            />
          </div>
        </motion.div>
        
      </motion.div>
    </section>
  );
};

export default HeroSection;