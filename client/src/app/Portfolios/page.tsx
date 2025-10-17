// app/templates/page.tsx

import Footer from '../component/Footer';
import Navbar from '../component/Navbar';
import PortfolioCard, { Template } from '../component/PortfolioCard';

// Updated data using a more reliable and visually appealing image service
const portfolioTemplates: Template[] = [
  {
    id: 1,
    name: 'SimpleFolio',
    thumbnailUrl: '/Port_Demo_Img/Demo1.png',
    techStack: ['HTML', 'SCSS', 'JavaSript'],
    previewUrl: 'https://the-simplefolio.netlify.app/',
  },
];


export default function TemplatesPage() {
  // ... rest of the component (no changes needed here)
  return (
    <>
      <Navbar />
      <main className=" px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Magma Portfolio Templates
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
              Kickstart your professional presence. Choose a template, connect your content, and deploy.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {portfolioTemplates.map((template) => (
              <PortfolioCard key={template.id} template={template} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}