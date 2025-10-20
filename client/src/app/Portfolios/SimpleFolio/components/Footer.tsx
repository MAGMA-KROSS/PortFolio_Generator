// src/components/Footer.tsx
import React from 'react';

interface FooterProps {
  name: string;
}

const Footer: React.FC<FooterProps> = ({ name }) => {
  const year = new Date().getFullYear();
  return (
    <footer className="py-4 bg-slate-900 text-center text-slate-400">
      <p>&copy; {year} {name}. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;