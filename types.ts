import { LucideIcon } from 'lucide-react';

export interface Project {
  title: string;
  description: string[];
  tags: string[];
  icon: LucideIcon;
  link?: string;
  github?: string;
}

export interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
  points: string[];
}

export interface Education {
  school: string;
  degree: string;
  location: string;
  period: string;
  gpa?: string;
  coursework?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
  link?: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}