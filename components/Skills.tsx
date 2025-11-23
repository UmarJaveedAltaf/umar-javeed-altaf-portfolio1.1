
import React, { useState } from 'react';
import { SKILLS_CORE, SKILLS_PROGRAMMING, CERTIFICATIONS } from '../constants';
import SkillNetwork from './SkillNetwork';
import { Network, LayoutList } from 'lucide-react';

const Skills: React.FC = () => {
  const [viewMode, setViewMode] = useState<'network' | 'list'>('network');

  return (
    <section id="skills" className="py-24 relative z-10 bg-gradient-to-b from-transparent to-black/40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center md:text-left">
                Technical Expertise
            </h2>
            
            {/* View Toggle */}
            <div className="flex p-1 bg-neutral-900/80 border border-white/10 rounded-lg backdrop-blur-sm z-20 relative">
                <button 
                    onClick={() => setViewMode('network')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                        viewMode === 'network' 
                        ? 'bg-red-600 text-white shadow-lg' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                >
                    <Network className="w-4 h-4" />
                    Interactive
                </button>
                <button 
                    onClick={() => setViewMode('list')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                        viewMode === 'list' 
                        ? 'bg-red-600 text-white shadow-lg' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                >
                    <LayoutList className="w-4 h-4" />
                    List View
                </button>
            </div>
        </div>

        {/* Content Area with Transitions */}
        <div className="relative min-h-[800px]">
            {/* Interactive Network View Layer */}
            <div 
                className={`absolute inset-0 transition-all duration-500 ease-in-out transform ${
                    viewMode === 'network' 
                    ? 'opacity-100 scale-100 z-10 visible' 
                    : 'opacity-0 scale-95 z-0 invisible pointer-events-none'
                }`}
            >
                <SkillNetwork isVisible={viewMode === 'network'} />
            </div>

            {/* List View Layer */}
            <div 
                className={`w-full transition-all duration-500 ease-in-out transform ${
                    viewMode === 'list' 
                    ? 'opacity-100 translate-y-0 z-10 visible relative' 
                    : 'opacity-0 translate-y-8 z-0 invisible absolute inset-0 pointer-events-none'
                }`}
            >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    
                    {/* Column 1: Core Competencies (List style) */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-red-500 mb-6 uppercase tracking-wider">Core Competencies</h3>
                        
                        <div className="space-y-8">
                        <div>
                            <h4 className="text-gray-400 text-sm font-bold uppercase mb-4 tracking-wider">ML & AI</h4>
                            <ul className="space-y-2">
                            {SKILLS_CORE.slice(0, 4).map((skill, i) => (
                                <li key={i} className="text-white font-medium border-l-2 border-gray-700 pl-4 hover:border-red-500 transition-colors">
                                {skill}
                                </li>
                            ))}
                            </ul>
                        </div>
                        
                        <div>
                            <h4 className="text-gray-400 text-sm font-bold uppercase mb-4 tracking-wider">Deep Learning & NLP</h4>
                            <ul className="space-y-2">
                            {SKILLS_CORE.slice(4).map((skill, i) => (
                                <li key={i} className="text-white font-medium border-l-2 border-gray-700 pl-4 hover:border-red-500 transition-colors">
                                {skill}
                                </li>
                            ))}
                            </ul>
                        </div>
                        </div>
                    </div>

                    {/* Column 2: Programming & Tools (Badge style) */}
                    <div>
                        <h3 className="text-xl font-bold text-red-500 mb-6 uppercase tracking-wider">Programming & Tools</h3>
                        <div className="space-y-8">
                        {SKILLS_PROGRAMMING.map((group, idx) => (
                            <div key={idx}>
                            <h4 className="text-gray-400 text-sm font-bold uppercase mb-3 tracking-wider">{group.category}</h4>
                            <div className="flex flex-wrap gap-2">
                                {group.items.map((item, i) => (
                                <span key={i} className="px-3 py-1.5 bg-neutral-900 border border-neutral-800 rounded text-sm text-gray-300 hover:border-red-500/50 hover:text-white transition-all">
                                    {item}
                                </span>
                                ))}
                            </div>
                            </div>
                        ))}
                        </div>
                    </div>

                    {/* Column 3: Certifications (Card list style) */}
                    <div>
                        <h3 className="text-xl font-bold text-red-500 mb-6 uppercase tracking-wider">Certifications</h3>
                        <div className="space-y-4">
                        {CERTIFICATIONS.map((cert, i) => (
                            <div key={i} className="p-4 bg-neutral-900/30 border border-white/5 rounded hover:border-red-500/30 transition-all group">
                            <h4 className="text-white font-semibold group-hover:text-red-400 transition-colors">{cert.name}</h4>
                            <div className="flex justify-between mt-2 text-sm text-gray-500">
                                <span>{cert.issuer}</span>
                                <span>• {cert.year}</span>
                            </div>
                            </div>
                        ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
