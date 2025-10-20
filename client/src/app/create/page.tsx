"use client";

import { useSearchParams } from "next/navigation";
import Image from "next/image"; // 👈 1. Import the Image component
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";

// Define a type for a single portfolio template.
type PortfolioTemplate = {
  id: number;
  name: string;
  thumbnailUrl: string;
  techStack: string[];
  previewUrl: string;
  price: number;
  description: string;
  features: string[];
  screenshots: string[];
};

// Define the 'templates' object with an explicit type.
const templates: Record<string, PortfolioTemplate> = {
  simplefolio: {
    id: 1,
    name: "SimpleFolio",
    thumbnailUrl: "/Port_Demo_Img/Demo1.png",
    techStack: ["TypeScript", "Next.js", "Tailwind"],
    previewUrl: "https://the-simplefolio.netlify.app/",
    price: 0,
    description:
      "A clean and simple portfolio template perfect for developers and designers to showcase their work.",
    features: [
      "Fully responsive design",
      "Easy to customize",
      "Modern and minimalist aesthetic",
      "Includes sections for projects, about, and contact",
    ],
    screenshots: ["/Port_Demo_Img/Demo1.png"],
  },
  modernneon: {
  id: 2,
  name: "ModernNeon",
  thumbnailUrl: "/Port_Demo_Img/Demo2.png",
  techStack: ["TypeScript", "Next.js", "Tailwind CSS", "Framer Motion"],
  previewUrl: "https://modernneon-portfolio.vercel.app/",
  price: 0,
  description:
    "ModernNeon is a sleek, dark-themed portfolio template with glowing neon accents and smooth animations — ideal for developers, designers, and creatives who want to make a strong futuristic impression.",
  features: [
    "Dynamic content fetched from JSON files",
    "Fully responsive dark neon design",
    "Smooth scroll and glowing hover animations",
    "Pre-built sections: Hero, Navbar, About, Skills, Projects, and Contact",
    "Built with Next.js 15, Tailwind CSS, and Framer Motion",
    "Easily customizable JSON-driven structure for personal data",
  ],
  screenshots: ["/Port_Demo_Img/Demo1.png"],
}

};

export default function CreatePage() {
  const searchParams = useSearchParams();
  const templateName = searchParams.get("template");

  // Safely get the portfolio data.
  const portfolio = templateName ? templates[templateName] : null;

  if (!portfolio) {
    return (
      <>
        <Navbar />
        <main className="flex h-[70vh] items-center justify-center text-white">
          <div className="text-center">
            <h1 className="mb-4 text-3xl font-bold">Template Not Found</h1>
            <p className="text-slate-400">
              The requested template doesn’t exist. Please go back and choose a
              valid one.
            </p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="px-4 py-12 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Left: Screenshot Section */}
            <div>
              {/* 👇 2. Replace <img> with Image and add required props */}
              <Image
                src={portfolio.thumbnailUrl}
                alt={`${portfolio.name} screenshot`}
                width={1280} // Add a width
                height={720} // Add a height
                className="mb-4 rounded-lg shadow-lg"
              />
            </div>

            {/* Right: Template Info */}
            <div className="flex flex-col justify-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                {portfolio.name}
              </h1>
              <p className="mt-4 text-xl text-slate-300">
                {portfolio.description}
              </p>

              <div className="mt-6">
                <h2 className="text-2xl font-semibold">Features</h2>
                <ul className="mt-2 list-inside list-disc text-slate-300">
                  {portfolio.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                <h2 className="text-2xl font-semibold">Tech Stack</h2>
                <div className="mt-2 flex flex-wrap gap-2">
                  {portfolio.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-slate-700 px-3 py-1 text-sm font-semibold"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between">
                <p className="text-4xl font-bold">
                  {portfolio.price === 0 ? "Free" : `$${portfolio.price}`}
                </p>
                <a
                  href="/api/checkout"
                  className="rounded-md bg-indigo-600 px-6 py-3 text-lg font-semibold text-white shadow-md transition hover:bg-indigo-700"
                >
                  Buy Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}