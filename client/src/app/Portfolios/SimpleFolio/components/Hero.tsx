// src/components/Hero.tsx
"use client"
import React from 'react';
import { motion } from 'framer-motion';

interface HeroProps {
  name: string;
  role: string;
  tagline: string;
}

const Hero: React.FC<HeroProps> = ({ name, role, tagline }) => {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center text-center bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="p-4">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-5xl md:text-7xl font-extrabold text-white">
          {name}
        </motion.h1>
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-3xl md:text-5xl font-semibold text-cyan-400 mt-2">
          {role}
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="text-lg md:text-xl text-slate-300 mt-4 max-w-2xl mx-auto">
          {tagline}
        </motion.p>
      </div>
    </section>
  );
};

export default Hero;