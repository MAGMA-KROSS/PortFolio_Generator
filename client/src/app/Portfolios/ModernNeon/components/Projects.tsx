'use client'; // Required for client-side hooks and animations

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

// --- TypeScript Interfaces for project data ---
interface Project {
  title: string;
  description: string;
  tags: string[];
  image: string;
  liveUrl: string;
  githubUrl: string;
}

interface ProjectsData {
  title: string;
  description: string;
  items: Project[];
}

const ProjectsSection = () => {
  // --- State for storing fetched projects data ---
  const [projectsData, setProjectsData] = useState<ProjectsData | null>(null);

  // --- Data fetching from local JSON ---
  useEffect(() => {
    const fetchProjectsData = async () => {
      try {
        const response = await fetch('/data/user.json');
        const data = await response.json();
        setProjectsData(data.projects);
      } catch (error) {
        console.error("Failed to fetch projects data:", error);
      }
    };
    fetchProjectsData();
  }, []);

  // --- Animation Variants for Framer Motion ---
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };
  
  // Render a loading state or nothing while data is fetching
  if (!projectsData) return null;

  return (
    <section id="projects" className="min-h-screen py-20 overflow-hidden bg-[#0a0a0a] text-gray-200">
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
            {projectsData.title}
          </h2>
          <p className="max-w-2xl mx-auto mt-4 text-lg text-gray-400">
            {projectsData.description}
          </p>
        </motion.div>

        {/* Layout structure: Grid for project cards */}
        <motion.div
          className="grid gap-10 md:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {projectsData.items.map((project, index) => (
            // Each project card is an article and a motion item
            <motion.article
              key={index}
              className="flex flex-col overflow-hidden transition-all duration-300 ease-out rounded-lg bg-gray-900/50 border-2 border-gray-700/50 hover:border-neon-cyan/50 hover:shadow-[0_0_30px_#00ffff44] hover:-translate-y-2"
              variants={cardVariants}
            >
              <div className="relative w-full h-56">
                <Image src={project.image} alt={project.title} fill className="object-cover" />
              </div>

              <div className="flex flex-col flex-grow p-6">
                <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                <p className="mt-3 text-gray-400 grow">{project.description}</p>
                
                {/* Data mapping: List of tech tags */}
                <ul className="flex flex-wrap gap-2 mt-4">
                  {project.tags.map((tag) => (
                    <li key={tag} className="px-3 py-1 text-xs rounded-full bg-gray-800 text-neon-cyan">
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card Footer: Links */}
              <div className="flex items-center justify-end p-4 space-x-4 bg-gray-900/70">
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label={`GitHub for ${project.title}`} className="flex items-center space-x-2 text-gray-300 transition-colors hover:text-neon-cyan">
                  <FaGithub className="w-6 h-6" />
                  <span>Code</span>
                </a>
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`Live demo for ${project.title}`} className="flex items-center space-x-2 text-gray-300 transition-colors hover:text-neon-cyan">
                  <FaExternalLinkAlt className="w-5 h-5" />
                  <span>Live Demo</span>
                </a>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;