// src/App.tsx
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Import data and the type definition
import portfolioData from './data/data.json';
import { PortfolioData } from './types';

function App() {
  // Cast the imported JSON data to our defined type
  const data: PortfolioData = portfolioData;

  return (
    <div className="bg-slate-900">
      <Navbar  />
      <main>
        <Hero name={data.name} role={data.role} tagline={data.tagline} />
        <About about={data.about} profileImage={data.profileImage} />
        <Skills skills={data.skills} />
        <Projects projects={data.projects} />
        <Contact contact={data.contact} />
      </main>
      <Footer name={data.name} />
    </div>
  );
}

export default App;