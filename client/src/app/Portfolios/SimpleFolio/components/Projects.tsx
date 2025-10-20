// src/components/Projects.tsx
"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { Project } from '../types';

interface ProjectsProps {
  projects: Project[];
}

const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Projects</h2>
        <div className="grid ... gap-4">
          {projects.map((project, index) => ( // <-- notice the 'index' here
            <motion.div
              key={index} // <--- Change project.name to index
              initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.2 }} className="bg-slate-800/50 p-6 rounded-lg shadow-lg hover:shadow-cyan-500/20 transition-shadow duration-300 flex flex-col">
              <h3 className="text-2xl font-bold mb-2 text-cyan-400">{project.name}</h3>
              <p className="text-slate-300 mb-4 flex-grow">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech) => (
                  <span key={tech} className="bg-slate-700 text-sm px-2 py-1 rounded">{tech}</span>
                ))}
              </div>
              <div className="mt-auto flex gap-4">
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-white hover:text-cyan-400 rounded-md bg-slate-500 p-1.5 transition-all shadow-lg hover:shadow-cyan-500/20  duration-300">GitHub</a>
                <a href={project.demo} target="_blank" rel="noopener noreferrer" className="text-white hover:text-cyan-400 rounded-md bg-slate-500 p-1.5 transition-all shadow-lg hover:shadow-cyan-500/20 duration-300">Demo</a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;