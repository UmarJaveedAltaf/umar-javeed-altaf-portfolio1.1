
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { name: 'HOME', id: 'home' },
  { name: 'ABOUT', id: 'about' },
  { name: 'PROJECTS', id: 'projects' },
  { name: 'SKILLS', id: 'skills' },
  { name: 'CONTACT', id: 'contact' },
];

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // 1. Handle Navbar background
      setIsScrolled(window.scrollY > 20);

      // 2. Handle Active Section Spy
      const scrollPosition = window.scrollY + 150;
      const isBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50;
      
      if (isBottom) {
        setActiveSection('contact');
        return;
      }

      for (const link of NAV_LINKS) {
        const element = document.getElementById(link.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop && 
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(link.id);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false); // Close mobile menu if open
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled || isMobileMenuOpen ? 'bg-black/90 backdrop-blur-md py-4' : 'bg-transparent py-6'}`}>
      <div className="w-full px-6 md:px-12 flex justify-between items-center">
        {/* Logo & Brand */}
        <div className="flex items-center gap-3 cursor-pointer z-50 group" onClick={() => scrollToSection('home')}>
          {/* Circular Logo */}
          <div className="relative w-10 h-10 rounded-full bg-black flex items-center justify-center shadow-lg shadow-red-500/20 group-hover:shadow-red-500/40 transition-all duration-300 border border-white group-hover:scale-105">
             <span className="text-white font-bold text-[10px] tracking-tighter">UJA</span>
          </div>

          {/* Text Brand */}
          <div className="text-2xl font-bold tracking-tighter">
            <span className="text-white group-hover:text-gray-200 transition-colors">UJA</span>
            <span className="text-red-500">.</span>
          </div>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex space-x-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.id)}
                className={`text-sm font-medium transition-colors tracking-wide ${
                  activeSection === link.id 
                    ? 'text-red-500' 
                    : 'text-gray-300 hover:text-red-500'
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden z-50">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-black/95 backdrop-blur-xl z-40 transition-transform duration-300 ease-in-out md:hidden flex flex-col items-center justify-center space-y-8 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
         {NAV_LINKS.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollToSection(link.id)}
              className={`text-2xl font-bold transition-colors tracking-wider ${
                activeSection === link.id 
                  ? 'text-red-500' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              {link.name}
            </button>
          ))}
      </div>
    </nav>
  );
};

export default Navbar;
