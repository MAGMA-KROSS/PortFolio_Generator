// src/types.ts
export interface Project {
  name: string;
  description: string;
  tech: string[];
  github: string;
  demo: string;
}

export interface Contact {
  email: string;
  phone: string;
  location: string;
}

export interface PortfolioData {
  name: string;
  role: string;
  tagline: string;
  profileImage: string;
  about: string;
  skills: string[];
  projects: Project[];
  contact: Contact;
}