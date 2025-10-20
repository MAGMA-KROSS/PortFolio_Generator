// src/components/Contact.tsx
"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { Contact as ContactType } from '../types';

interface ContactProps {
  contact: ContactType;
}

const Contact: React.FC<ContactProps> = ({ contact }) => {
  return (
    <section id="contact" className="py-20 bg-slate-800/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Contact Me</h2>
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="max-w-md mx-auto bg-slate-800 p-8 rounded-lg shadow-lg">
          <form>
            <div className="mb-4">
              <label htmlFor="name" className="block mb-2">Name</label>
              <input type="text" id="name" className="w-full p-2 rounded bg-slate-700 border border-slate-600 focus:outline-none focus:border-cyan-400" />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2">Email</label>
              <input type="email" id="email" className="w-full p-2 rounded bg-slate-700 border border-slate-600 focus:outline-none focus:border-cyan-400" />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block mb-2">Message</label>
              <textarea id="message" rows={4} className="w-full p-2 rounded bg-slate-700 border border-slate-600 focus:outline-none focus:border-cyan-400"></textarea>
            </div>
            <button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded transition-colors">Send Message</button>
          </form>
          <div className="text-center mt-8">
            <p>Or reach me at: <a href={`mailto:${contact.email}`} className="text-cyan-400 hover:underline">{contact.email}</a></p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;