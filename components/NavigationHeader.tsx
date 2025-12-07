'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

type Section = 'home' | 'about' | 'skills' | 'projects' | 'certifications';

const sections: Section[] = ['home', 'about', 'skills', 'projects', 'certifications'];

const sectionLabels: Record<Section, string> = {
  home: 'Home',
  about: 'About',
  skills: 'Skills',
  projects: 'Projects',
  certifications: 'Certifications',
};

export default function NavigationHeader() {
  const [activeSection, setActiveSection] = useState<Section>('home');

  // Track which section is currently in view
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id as Section);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId: Section) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-40 bg-gray-900/90 backdrop-blur-md border-b border-gray-700 shadow-lg"
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Name */}
          <motion.div
            className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={() => scrollToSection('home')}
          >
            Allan Ilyasov
          </motion.div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-1">
            {sections.map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeSection === section
                    ? 'text-blue-400'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
              >
                {sectionLabels[section]}
                {activeSection === section && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute inset-0 bg-blue-900/30 rounded-lg -z-10"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Mobile menu */}
          <div className="md:hidden">
            <select
              value={activeSection}
              onChange={(e) => scrollToSection(e.target.value as Section)}
              className="px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 text-gray-200 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {sections.map((section) => (
                <option key={section} value={section}>
                  {sectionLabels[section]}
                </option>
              ))}
            </select>
          </div>
        </div>
      </nav>
    </motion.header>
  );
}
