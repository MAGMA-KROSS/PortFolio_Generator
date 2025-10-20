import HeroSection from './components/Hero';
import Navbar from './components/Navbar';
import About from './components/About';
import Skills from './components/Skills';
import ProjectsSection from './components/Projects';
import ContactSection from './components/Contact';
import Footer from './components/Footer';

export default function HomePage() {
  return (
    <>
      <main className='bg-[#0a0a0a]'>

        <Navbar />
        <HeroSection />
        <About />
        <Skills/>
        <ProjectsSection/>
        <ContactSection/>
        <Footer/>
      </main>

    </>
  );
}