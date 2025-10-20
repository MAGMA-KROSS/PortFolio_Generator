'use client'; // Required for hooks and animations

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';

// --- TypeScript Interface for the 'about' data structure ---
interface AboutData {
  title: string;
  subtitle: string;
  description: string;
  skills: string[];
  profileImage: string;
}

const AboutSection = () => {
  // --- State for storing fetched data ---
  const [aboutData, setAboutData] = useState<AboutData | null>(null);

  // --- Data fetching logic ---
  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await fetch('/data/user.json');
        const data = await response.json();
        setAboutData(data.about);
      } catch (error) {
        console.error("Failed to fetch about data:", error);
      }
    };
    fetchAboutData();
  }, []);

  // --- Animation Variants for scroll-triggered reveal ---
  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
        staggerChildren: 0.2, // Animate children sequentially
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  if (!aboutData) {
    // You can return a loading skeleton here if you want
    return null;
  }

  return (
    <motion.section
      id="about"
      className="min-h-screen py-20 overflow-hidden bg-[#0a0a0a] text-gray-200"
      // Animation props for scroll reveal
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 30% is visible
    >
      <div className="max-w-6xl px-4 mx-auto">
        {/* Section Title */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <p className="text-lg font-semibold text-neon-cyan">{aboutData.subtitle}</p>
          <h2 className="text-4xl font-bold text-white md:text-5xl">{aboutData.title}</h2>
          <div className="w-24 h-1 mx-auto mt-4 rounded-full bg-neon-cyan filter drop-shadow-neon-cyan" />
        </motion.div>

        {/* Layout breakdown: two-column grid */}
        <div className="grid items-center gap-12 md:grid-cols-5">
          
          {/* Left Column: Text Content (takes 3 of 5 columns) */}
          <motion.div variants={itemVariants} className="md:col-span-3">
            <p className="mb-8 text-lg leading-relaxed text-gray-400">
              {aboutData.description}
            </p>
            {/* Skills list with neon hover effect */}
            <h3 className="mb-4 text-2xl font-semibold text-white">My Tech Stack</h3>
            <ul className="flex flex-wrap gap-3">
              {aboutData.skills.map((skill) => (
                <li
                  key={skill}
                  className="px-4 py-2 text-sm font-medium transition-all duration-300 border-2 rounded-md cursor-default border-gray-700 text-gray-300 hover:border-neon-cyan hover:text-neon-cyan hover:shadow-[0_0_15px_#00ffff44]"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </motion.div>
          
          {/* Right Column: Image (takes 2 of 5 columns) */}
          <motion.div variants={itemVariants} className="relative w-full h-80 md:col-span-2">
            {/* Image container with glowing, pulsing shadow */}
            <motion.div
              className="absolute inset-0 rounded-lg"
              animate={{
                boxShadow: [
                  "0 0 20px #00ffff88",
                  "0 0 35px #00ffffaa",
                  "0 0 20px #00ffff88",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <Image
              src={aboutData.profileImage}
              alt="Portrait of Abi Kumar"
              fill
              className="object-cover rounded-lg"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default AboutSection;