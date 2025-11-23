
import React, { useState } from 'react';
import { SOCIAL_LINKS } from '../constants';
import { X, CheckCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 1. Basic Validation
    if (!formData.firstName || !formData.email || !formData.message) {
      alert("Please fill in all required fields.");
      return;
    }

    // 2. Construct Mailto Link
    const subject = `Portfolio Contact: ${formData.firstName} ${formData.lastName}`;
    const body = `Name: ${formData.firstName} ${formData.lastName}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
    const mailtoLink = `mailto:${SOCIAL_LINKS.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // 3. Trigger Email Client
    window.location.href = mailtoLink;
    
    // 4. Show Success State
    setIsSubmitted(true);
    
    // 5. Reset Form Data
    setFormData({ firstName: '', lastName: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="py-24 relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Partner With Me !!
          </h2>
          <p className="text-gray-400 text-lg">
            Let’s collaborate on projects that push the boundaries of intelligence and innovation
          </p>
        </div>

        {/* Content Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 items-stretch">
          
          {/* Left: Contact Form */}
          <div className="bg-[#0a0a0a] border border-white/5 p-8 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden flex flex-col justify-center min-h-[450px]">
            {/* Subtle glow effect */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 blur-[50px] rounded-full -mr-16 -mt-16 pointer-events-none"></div>

            {isSubmitted ? (
               // Success State
               <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#0a0a0a] p-8 text-center animate-fade-in">
                  <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6 animate-pulse">
                      <CheckCircle className="w-10 h-10 text-green-500" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-2">Sent</h3>
                  <p className="text-gray-400 mb-8 max-w-xs">Your message has been drafted. Please check your email client to hit send.</p>
                  
                  {/* The 'Cross Mark' as requested to close the sent message */}
                  <button 
                      onClick={() => setIsSubmitted(false)}
                      className="group absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 transition-colors"
                      aria-label="Close"
                  >
                      <X className="w-6 h-6 text-gray-500 group-hover:text-white transition-colors" />
                  </button>

                  <button
                      onClick={() => setIsSubmitted(false)}
                      className="px-8 py-3 bg-white/5 border border-white/10 hover:bg-white/10 rounded-lg text-sm text-white font-medium transition-all"
                  >
                      Send another
                  </button>
               </div>
            ) : (
                // Form State
                <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="firstName" className="text-sm font-medium text-gray-300">Name*</label>
                      <input 
                        type="text" 
                        id="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Your name" 
                        required
                        className="w-full bg-neutral-900/50 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all placeholder-gray-600"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="lastName" className="text-sm font-medium text-gray-300">Last name*</label>
                      <input 
                        type="text" 
                        id="lastName" 
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Your last name" 
                        required
                        className="w-full bg-neutral-900/50 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all placeholder-gray-600"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-300">Email*</label>
                    <input 
                      type="email" 
                      id="email" 
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your email address" 
                      required
                      className="w-full bg-neutral-900/50 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all placeholder-gray-600"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-gray-300">Message*</label>
                    <textarea 
                      id="message" 
                      rows={5} 
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Enter your message" 
                      required
                      className="w-full bg-neutral-900/50 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all placeholder-gray-600 resize-none"
                    ></textarea>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button 
                      type="submit"
                      className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-10 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-red-600/20"
                    >
                      SUBMIT
                    </button>
                  </div>
                </form>
            )}
          </div>

          {/* Right: Image */}
          <div className="relative h-full min-h-[400px] lg:min-h-auto rounded-3xl overflow-hidden border border-white/5 group">
             <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
             <img 
               src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop" 
               alt="Coding Workspace" 
               className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
             />
          </div>

        </div>

        {/* Footer Info */}
        <div className="relative border-t border-white/10 pt-12 text-center">
          <p className="text-gray-500 italic text-lg mb-8">"Building the future of AI, one model at a time."</p>
          <div className="flex justify-center gap-8 mb-8 text-sm text-gray-400">
             <a href={`mailto:${SOCIAL_LINKS.email}`} className="hover:text-red-500 transition-colors">Email</a>
             <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noreferrer" className="hover:text-red-500 transition-colors">LinkedIn</a>
             <a href={SOCIAL_LINKS.github} target="_blank" rel="noreferrer" className="hover:text-red-500 transition-colors">GitHub</a>
          </div>
          <p className="text-gray-600 text-sm">© 2025 Umar Javeed Altaf. All rights reserved.</p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
