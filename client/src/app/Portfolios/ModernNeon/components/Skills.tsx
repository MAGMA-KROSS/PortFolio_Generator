'use client'; // Required for client-side hooks and animations

import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';

// --- TypeScript Interfaces for skills data ---
interface SkillItem {
  name: string;
  items: string[];
}

interface SkillsData {
  title: string;
  description: string;
  categories: SkillItem[];
}

const SkillsSection = () => {
  // --- State for storing fetched skills data ---
  const [skillsData, setSkillsData] = useState<SkillsData | null>(null);

  // --- Data fetching from local JSON ---
  useEffect(() => {
    const fetchSkillsData = async () => {
      try {
        const response = await fetch('/data/user.json');
        const data = await response.json();
        setSkillsData(data.skills);
      } catch (error) {
        console.error("Failed to fetch skills data:", error);
      }
    };
    fetchSkillsData();
  }, []);

  // --- Animation Variants for Framer Motion ---
  // Staggered animation for the container of cards
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  // Animation for each individual card
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  // Show a loading state or nothing while data is being fetched
  if (!skillsData) {
    return null;
  }

  return (
    <section id="skills" className="min-h-screen py-20 overflow-hidden bg-[#0a0a0a] text-gray-200">
      <div className="max-w-6xl px-4 mx-auto">
        
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-white uppercase md:text-5xl filter text-neon-cyan drop-shadow-neon-cyan">
            {skillsData.title}
          </h2>
          <p className="max-w-2xl mx-auto mt-4 text-lg text-gray-400">
            {skillsData.description}
          </p>
        </motion.div>

        {/* Layout structure: Grid for skill categories */}
        <motion.div
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {skillsData.categories.map((category) => (
            // Each category is a motion-enabled card
            <motion.div
              key={category.name}
              className="p-6 transition-all duration-300 border-2 rounded-lg bg-gray-900/50 border-gray-700/50 hover:border-neon-cyan/50 hover:shadow-[0_0_25px_#00ffff44]"
              variants={cardVariants}
            >
              <h3 className="mb-4 text-2xl font-bold text-center text-white">
                {category.name}
              </h3>
              {/* Data mapping: List of skills within the category */}
              <ul className="flex flex-wrap justify-center gap-3">
                {category.items.map((skill) => (
                  <li
                    key={skill}
                    className="px-4 py-2 text-sm font-medium transition-all duration-300 border rounded-full cursor-default bg-gray-800/60 border-gray-600 text-gray-300 hover:bg-neon-cyan/10 hover:text-neon-cyan hover:border-neon-cyan"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default SkillsSection;