// components/HowItWorks.js
'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Layers, PenTool, Rocket } from 'lucide-react';

// Data for the steps, making it clean and scalable
const steps = [
  {
    icon: <Layers size={32} />,
    title: 'Select a Template',
    description: 'Browse our library of stunning, professionally designed portfolio templates to find the one that fits your style.',
  },
  {
    icon: <PenTool size={32} />,
    title: 'Customize Your Content',
    description: 'Add your projects, skills, and personal info. Our intuitive editor makes it simple to change anything you see.',
  },
  {
    icon: <Rocket size={32} />,
    title: 'Publish & Go Live',
    description: 'Launch your portfolio with a single click. Your new site is optimized for speed, security, and a great user experience.',
  },
];

export default function HowItWorks() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="how-it-works" className="py-24 px-6 text-white">
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-extrabold"
          >
            Create Your Portfolio in 3 Simple Steps
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto"
          >
            From template to live site in minutes. Here’s how you can get started.
          </motion.p>
        </motion.div>

        {/* Steps container */}
        <motion.div
          ref={ref} // Re-using the ref works fine for orchestrating the animation
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="mt-16 flex flex-col md:flex-row justify-center items-stretch gap-8"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex-1 p-8 bg-white/5 rounded-2xl border border-white/10 flex flex-col items-center"
            >
              <div className="p-4 bg-white/10 rounded-full w-fit mb-6">
                {step.icon}
              </div>
              <h3 className="text-2xl font-bold">{step.title}</h3>
              <p className="mt-2 text-gray-400">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}