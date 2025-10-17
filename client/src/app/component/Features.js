// components/Features.js
'use client';

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { LayoutTemplate, Wand2, MonitorSmartphone } from "lucide-react";

// An array to hold the feature data, making it easy to manage
const features = [
  {
    icon: <LayoutTemplate size={40} className="text-white" />,
    title: "Beautiful Templates",
    description: "Start with a professionally designed template. Choose from a variety of styles to find the perfect fit for your work.",
  },
  {
    icon: <Wand2 size={40} className="text-white" />,
    title: "Simple Customization",
    description: "Easily change colors, fonts, and layouts with our intuitive no-code editor. Make the design truly your own.",
  },
  {
    icon: <MonitorSmartphone size={40} className="text-white" />,
    title: "Fully Responsive",
    description: "Your portfolio will look stunning on any device. From desktops to smartphones, your work is always presented perfectly.",
  },
];

export default function Features() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeInOut" } },
  };

  return (
    <motion.section
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      id="features"
      className="py-24 px-6"
    >
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          variants={itemVariants}
          className="text-4xl md:text-5xl font-extrabold text-white"
        >
          Everything You Need to Shine Online
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="mt-4 text-lg md:text-xl text-gray-400"
        >
          MagmaBuilder provides the tools to create a professional online presence with ease.
        </motion.p>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white/5 p-8 rounded-2xl border border-white/10 text-left"
            >
              <div className="p-4 bg-white/10 rounded-full w-fit mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white">{feature.title}</h3>
              <p className="mt-2 text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}