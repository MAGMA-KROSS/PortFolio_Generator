// components/Hero.js

// 1. Add 'use client' to enable hooks
'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function Hero() {
  // 2. useInView hook to detect when the component is visible
  const { ref, inView } = useInView({
    triggerOnce: true, // Animation triggers only once
    threshold: 0.1,    // Trigger when 10% of the component is visible
  });

  // 3. Animation variants for the container to orchestrate children animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // Adds a 0.3s delay between each child's animation
      },
    },
  };

  // 4. Animation variants for the child elements (h1, p, button)
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeInOut",
      },
    },
  };

  return (
    // 5. Attach the ref and apply motion properties
    <motion.section
      id="Hero"
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"} // Animate when in view
      className="relative flex flex-col items-center justify-center text-center py-28 px-6 overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 blur-3xl" />

      {/* 6. Convert each element to a motion component and apply variants */}
      <motion.h1
        variants={itemVariants}
        className="text-5xl max-w-5xl cursor-default md:text-6xl font-extrabold text-white leading-tight relative z-10"
      >
        Craft Your Perfect Portfolio with MagmaBuilder
      </motion.h1>

      <motion.p
        variants={itemVariants}
        className="mt-6 text-lg cursor-default md:text-xl text-gray-300 max-w-2xl relative z-10"
      >
        Showcase your skills and projects with a beautiful portfolio. Select a template, customize it to your style, and go live in minutes.
      </motion.p>

      <motion.div variants={itemVariants} className="mt-10 relative z-10">
        <Link
          href="/Portfolios"
          className="px-8 py-4 text-lg font-semibold rounded-xl bg-gradient-to-r from-white to-gray-200 text-black shadow-lg hover:shadow-gray-500/50 cursor-pointer hover:scale-105 transition-all duration-600"
        >
          Start Building for Free
        </Link>
      </motion.div>
    </motion.section>
  );
}