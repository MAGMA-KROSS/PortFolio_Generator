"use client";
import Navbar from "./component/Navbar"
import Hero from "./component/Hero"
import Features from "./component/Features"
import HowItWorks from "./component/HowItworks"
import Contact from "./component/ContactForm"
import Footer from "./component/Footer"
export default function Home() {
  return (
    <>
    <Navbar/>
    <Hero/>
    <Features/>
    <HowItWorks/>
    <main id="Contact" className="relative min-h-screen text-white">
        <section className="py-20 px-6 max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center cursor-default mb-6">Get in Touch</h1>
          <p className="text-gray-400 text-center cursor-default mb-12">
            Have questions, feedback, or collaboration ideas? Drop a message and
            we&apos;ll get back to you soon.
          </p>
          <Contact/>
        </section>
      </main>
    <Footer/>
    </>
  );
}
