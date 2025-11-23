
import React from 'react';
import { EDUCATION_DATA } from '../constants';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <div className="mb-16 border-l-4 border-red-500 pl-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white">About Me</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column: Text & Drive */}
          <div className="space-y-12">
            <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
              <p>
                My journey into AI began with a simple curiosity about how far machines can go in understanding the world. That curiosity grew into a passion for building intelligent systems  from deep learning and NLP to Generative AI and LLMs  that solve real, meaningful problems.
              </p>
              <p>
                Over the years, I’ve been driven by a fascination with how technology learns, adapts, and uncovers patterns that aren’t always visible to us. This mindset continues to guide my work, inspiring me to explore new ideas, experiment with emerging models, and push the boundaries of what AI can do.
              </p>
              <p>
                Today, I focus on creating AI that is powerful yet human-centered  systems that don’t just perform well, but genuinely make a positive impact in how people interact with technology.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">What Drives Me</h3>
              <div className="bg-white/5 border-l-2 border-orange-500 p-6 rounded-r-lg italic text-gray-300">
                "Turning curiosity into code and ideas into intelligent systems that make a real impact."
              </div>
            </div>
          </div>

          {/* Right Column: Journey Timeline */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-8">My Journey</h3>
            
            <div className="border-l border-gray-800 ml-3 space-y-12">
              {EDUCATION_DATA.map((edu, index) => (
                <div key={index} className="relative pl-8">
                  {/* Dot */}
                  <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
                  
                  <div className="space-y-1">
                    <h4 className="text-xl font-bold text-white">{edu.school}</h4>
                    <p className="text-red-400 font-medium">{edu.degree}</p>
                    <p className="text-sm text-gray-500">{edu.period} <span className="mx-2">•</span> {edu.gpa}</p>
                    {edu.coursework && (
                        <p className="text-sm text-gray-400 mt-2">
                            <span className="text-gray-500">Coursework:</span> {edu.coursework}
                        </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;