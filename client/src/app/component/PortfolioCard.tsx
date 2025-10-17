// components/PortfolioCard.tsx
import Image from 'next/image';
import Link from 'next/link';

// Define the TypeScript type for our template data
export type Template = {
  id: number;
  name: string;
  thumbnailUrl: string;
  techStack: string[];
  previewUrl: string;
};

// Define the props for our component
interface PortfolioCardProps {
  template: Template;
}

const PortfolioCard = ({ template }: PortfolioCardProps) => {
  const templateSlug = template.name.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="group flex flex-col overflow-hidden rounded-lg backdrop-blur-2xl bg-white/3 border-1 border-gray-200/40 shadow-sm transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1">
      <div className="relative h-48 w-full">
        <Image
          src={template.thumbnailUrl}
          alt={`${template.name} thumbnail`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </div>

      {/* Card Content */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-bold text-slate-100">{template.name}</h3>

        {/* Tech Stack Badges */}
        <div className="mt-2 flex flex-wrap gap-2">
          {template.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-full px-2.5 py-1 text-xs font-semibold border-1 border-gray-200/40 text-slate-100"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Buttons Container */}
        <div className="mt-auto flex flex-wrap items-center gap-3 pt-6">
          {/* "Live Preview" Button (Primary) */}
          <Link
            href={template.previewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Live Preview <span className="ml-1.5 transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>

          {/* "Create Now" Button (Secondary) */}
          <Link
            href={`/create?template=${templateSlug}`}
            className="inline-flex items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-indigo-700 shadow-sm ring-1 ring-inset ring-indigo-300 transition-colors duration-200 hover:bg-indigo-50"
          >
            Create Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PortfolioCard;