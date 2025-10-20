'use client'; // This component requires client-side interactivity

import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { FaEnvelope, FaFileDownload } from 'react-icons/fa';

// --- TypeScript Interfaces for component data ---
interface ContactData {
  title: string;
  description: string;
  email: string;
  resumeUrl: string;
}

const ContactSection = () => {
  // --- State Management ---
  const [contactData, setContactData] = useState<ContactData | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  // --- Data fetching from local JSON ---
  useEffect(() => {
    const fetchContactData = async () => {
      const response = await fetch('/data/user.json');
      const data = await response.json();
      setContactData(data.contact);
    };
    fetchContactData();
  }, []);

  // --- Form Input Handler ---
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // --- Form Submission Handler ---
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');

    // --- Backend Integration Point ---
    // Replace this with your actual form submission logic (e.g., API call to Resend, Formspree, etc.)
    // For demonstration, we'll simulate a network request.
    console.log("Form Data Submitted:", formData);
    await new Promise(resolve => setTimeout(resolve, 2000)); 
    // Simulate success/error
    setStatus('success'); 
    // setStatus('error'); // Uncomment to test error state
    
    // Reset form after a successful submission
    setTimeout(() => {
        setFormData({ name: '', email: '', message: '' });
        setStatus('idle');
    }, 5000);
  };

  // --- Animation Variants ---
  const sectionVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  if (!contactData) return null; // Render nothing while loading

  return (
    <section id="contact" className="min-h-screen py-20 bg-[#0a0a0a] text-gray-200">
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
            {contactData.title}
          </h2>
          <p className="max-w-2xl mx-auto mt-4 text-lg text-gray-400">
            {contactData.description}
          </p>
        </motion.div>

        {/* Layout: two-column grid for resume CTA and contact form */}
        <motion.div
          className="grid gap-12 md:grid-cols-2"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Left Column: Resume and Info */}
          <motion.div variants={itemVariants} className="flex flex-col items-center text-center md:items-start md:text-left">
            <h3 className="text-3xl font-bold text-white">Let&apos;s Connect</h3>
            <a href={`mailto:${contactData.email}`} className="flex items-center gap-3 mt-6 text-lg transition-colors text-gray-300 group hover:text-neon-cyan">
              <FaEnvelope className="transition-transform group-hover:scale-110" />
              <span>{contactData.email}</span>
            </a>
            <p className="mt-8 text-gray-400">Or download my resume to see my full professional profile:</p>
            <a 
              href={contactData.resumeUrl}
              download
              className="flex items-center gap-3 px-8 py-4 mt-6 font-bold uppercase transition-all duration-300 border-2 rounded-md border-neon-cyan text-neon-cyan hover:bg-neon-cyan/20 hover:shadow-[0_0_20px_#00ffff] hover:scale-105"
            >
              <FaFileDownload />
              Download Resume
            </a>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.form variants={itemVariants} onSubmit={handleSubmit} className="w-full space-y-6">
            <input type="text" name="name" placeholder="Your Name" required value={formData.name} onChange={handleChange} className="w-full p-3 bg-gray-900 border-2 border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:border-neon-cyan" />
            <input type="email" name="email" placeholder="Your Email" required value={formData.email} onChange={handleChange} className="w-full p-3 bg-gray-900 border-2 border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:border-neon-cyan" />
            <textarea name="message" placeholder="Your Message" rows={5} required value={formData.message} onChange={handleChange} className="w-full p-3 bg-gray-900 border-2 border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:border-neon-cyan"></textarea>
            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full px-8 py-4 font-bold uppercase transition-all duration-300 border-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed border-neon-magenta text-neon-magenta hover:bg-neon-magenta/20 hover:shadow-[0_0_20px_#ff00ff]"
            >
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>
            {status === 'success' && <p className="text-center text-green-400">Message sent successfully! I&apos;ll get back to you soon.</p>}
            {status === 'error' && <p className="text-center text-red-400">Something went wrong. Please try again later.</p>}
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;