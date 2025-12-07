'use client';

import { motion } from 'framer-motion';

export default function AboutSection() {
  return (
    <div className="min-h-screen w-screen flex-shrink-0 flex flex-col items-center justify-center px-4 py-20">
      <div className="max-w-4xl w-full">
        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-8 text-center text-gray-100"
        >
          <span data-breakable>About</span> Me
        </motion.h2>

        {/* Content Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800/80 backdrop-blur-sm rounded-lg p-8 shadow-lg border border-gray-700"
        >
          <p className="text-lg text-gray-300 leading-relaxed mb-4">
            I'm a <span data-breakable>Graduate</span> <span data-breakable>Student</span> pursuing an MS in <span data-breakable>Data Science</span> and BS in <span data-breakable>Computer Science</span> at St. John's University,
            graduating in May 2026 and May 2025 respectively. Currently working as a Graduate Research Assistant,
            I specialize in building <span data-breakable>AI-powered</span> applications and scalable cloud infrastructure.
          </p>

          <p className="text-lg text-gray-300 leading-relaxed mb-4">
            My expertise spans <span data-breakable>full-stack</span> development, <span data-breakable>machine learning</span>, and <span data-breakable>AWS</span> cloud services. I've led the development
            of <span data-breakable>Codify AI</span>, an AI-powered programming tutor, and won multiple hackathons for innovative AI solutions.
          </p>

          <p className="text-lg text-gray-300 leading-relaxed">
            When I'm not coding, I'm contributing to <span data-breakable>Uncle Edik's Pickles</span>, a startup I helped grow from a home-based
            operation to a national brand.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
