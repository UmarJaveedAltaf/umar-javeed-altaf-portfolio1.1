import React from 'react';
import { PROJECTS_DATA } from '../constants';
import { Github } from 'lucide-react';

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-center text-3xl md:text-4xl font-bold text-white mb-16">AI Projects</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECTS_DATA.map((project, index) => (
            <div 
              key={index} 
              className="group bg-neutral-900/50 border border-white/5 rounded-xl p-8 hover:border-red-500/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(239,68,68,0.1)] flex flex-col h-full"
            >
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-bold text-white group-hover:text-red-500 transition-colors">
                  {project.title}
                </h3>
                <project.icon className="w-8 h-8 text-gray-400 group-hover:text-red-500 transition-colors" />
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-red-900/20 text-red-400 text-xs font-medium rounded border border-red-900/30">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="space-y-2 mb-8 flex-grow">
                {project.description.map((point, i) => (
                  <div key={i} className="flex items-start text-gray-400 text-sm">
                    <span className="mr-2 text-red-500 mt-1">▹</span>
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              <div className="mt-auto">
                <a 
                  href={project.github} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-full bg-white text-black py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                >
                  <Github className="w-5 h-5" />
                  <span>View on GitHub</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;