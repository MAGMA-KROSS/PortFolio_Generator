// src/components/About.tsx
"use client";
import React from 'react';
import { motion } from 'framer-motion';

interface AboutProps {
  about: string;
  profileImage: string;
}

const About: React.FC<AboutProps> = ({ about, profileImage }) => {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">About Me</h2>
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/3">
            <img src={profileImage} alt="Profile" className="rounded-full w-64 h-64 mx-auto object-cover shadow-lg shadow-cyan-500/30" />
          </div>
          <div className="md:w-2/3">
            <p className="text-slate-300 leading-relaxed text-lg text-center md:text-left">{about}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;