'use client';

import { LucideGithub, LucideLinkedin, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HomeSection() {
  return (
    <div className="min-h-screen w-screen flex-shrink-0 flex flex-col items-center justify-center px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl w-full text-center"
      >
        {/* Profile Photo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-8 flex justify-center"
        >
          <div className="relative w-48 h-48 md:w-64 md:h-64 overflow-hidden rounded-full ring-4 ring-blue-500 shadow-2xl">
            <img
              src="profilepic.jpeg"
              alt="Allan Ilyasov"
              className="h-full object-cover"
              style={{
                width: '100%',
                transform: 'scale(1.1)',
                objectPosition: '0% 0%',
              }}
            />
          </div>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
        >
          <span data-breakable>Allan</span> <span data-breakable>Ilyasov</span>
        </motion.h1>

        {/* Title */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-xl md:text-2xl text-gray-300 mb-8"
        >
          <span data-breakable>AI/ML</span> <span data-breakable>Engineer</span> & <span data-breakable>Full-Stack</span> <span data-breakable>Developer</span>
        </motion.p>

        {/* Short Bio */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-lg text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed"
        >
          Graduate Student at St. John's University specializing in AI-powered applications
          and scalable cloud infrastructure. Building the future, one line of code at a time.
        </motion.p>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex flex-wrap gap-4 justify-center mb-8"
        >
          <a
            href="https://linkedin.com/in/allanily"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all hover:scale-105 shadow-lg"
          >
            <LucideLinkedin className="w-5 h-5" />
            LinkedIn
          </a>
          <a
            href="https://github.com/allanilya"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-full hover:bg-gray-900 transition-all hover:scale-105 shadow-lg"
          >
            <LucideGithub className="w-5 h-5" />
            GitHub
          </a>
          <a
            href="/Allan Resume Portfolio.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 border-2 border-gray-800 text-gray-800 rounded-full hover:bg-gray-800 hover:text-white transition-all hover:scale-105 shadow-lg"
          >
            <FileText className="w-5 h-5" />
            Resume
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}
