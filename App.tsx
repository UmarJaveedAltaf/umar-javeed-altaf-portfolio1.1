
import React from 'react';
import Navbar from './components/Navbar';
import MatrixBackground from './components/MatrixBackground';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import ScrollToTop from './components/ScrollToTop';

const App: React.FC = () => {
  return (
    <main className="relative bg-black min-h-screen text-white overflow-hidden">
      {/* Background Effect */}
      <MatrixBackground />
      
      {/* Navbar */}
      <Navbar />

      {/* Sections */}
      <div className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </div>

      {/* Persistent Scroll To Top Button */}
      <ScrollToTop />
    </main>
  );
};

export default App;
