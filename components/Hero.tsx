import React from 'react';
import { Github, Linkedin, Mail, ArrowDown } from 'lucide-react';
import { SOCIAL_LINKS } from '../constants';

const Hero: React.FC = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative pt-20">
      <div className="max-w-7xl w-full px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Avatar Area */}
        <div className="flex justify-center lg:justify-end order-2 lg:order-1">
          <div 
            className="relative w-64 h-64 md:w-96 md:h-96 rounded-full border border-red-500/20 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in overflow-hidden transition-all duration-300 hover:border-red-500/50 hover:shadow-[0_0_30px_rgba(239,68,68,0.2)]"
          >
             {/* Glow effect - Overlaying rings */}
             <div className="absolute inset-0 rounded-full border border-red-500/30 blur-[2px] z-10 pointer-events-none"></div>
             <div className="absolute inset-4 rounded-full border border-dashed border-red-500/20 animate-spin-slow z-10 pointer-events-none"></div>
             
             {/* User Image */}
             {/* Vercel/Vite will automatically serve files in /public at the root path */}
             <img 
               src="/profile.jpg"
               alt="Umar Javeed Altaf" 
               className="w-full h-full object-cover rounded-full opacity-90 hover:opacity-100 transition-opacity duration-500 relative z-0"
               onError={(e) => {
                 // Fallback if image fails to load
                 e.currentTarget.src = "https://ui-avatars.com/api/?name=Umar+Javeed+Altaf&background=1a1a1a&color=ef4444&size=512";
               }}
             />
          </div>
        </div>

        {/* Text Area */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left order-1 lg:order-2 space-y-4">
          <h2 className="text-xl md:text-2xl text-red-500 font-medium">Hii, I'm</h2>
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight">
            Umar Javeed <br />
            Altaf
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 font-light">
            AI & ML Engineer — Generative AI, Deep Learning & LLMs
          </p>
          
          <div className="flex space-x-6 mt-6">
            <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noreferrer" className="p-3 bg-white/5 rounded-lg hover:bg-red-500 hover:text-white transition-all duration-300 group">
              <Linkedin className="w-6 h-6 text-gray-300 group-hover:text-white" />
            </a>
            <a href={SOCIAL_LINKS.github} target="_blank" rel="noreferrer" className="p-3 bg-white/5 rounded-lg hover:bg-red-500 hover:text-white transition-all duration-300 group">
              <Github className="w-6 h-6 text-gray-300 group-hover:text-white" />
            </a>
            <a href={`mailto:${SOCIAL_LINKS.email}`} className="p-3 bg-white/5 rounded-lg hover:bg-red-500 hover:text-white transition-all duration-300 group">
              <Mail className="w-6 h-6 text-gray-300 group-hover:text-white" />
            </a>
          </div>

          <div className="mt-8 w-full sm:w-auto">
             <div className="px-6 py-3 text-sm text-gray-500 flex items-center justify-center sm:justify-start cursor-pointer hover:text-red-500 transition-colors" onClick={() => document.getElementById('about')?.scrollIntoView({behavior: 'smooth'})}>
                <span className="mr-2 uppercase tracking-widest font-bold">Explore My Work</span>
                <ArrowDown className="w-4 h-4 animate-bounce" />
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;