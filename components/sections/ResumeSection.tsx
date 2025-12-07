'use client';

import { motion } from 'framer-motion';
import { FileText, Download, GraduationCap, Briefcase, Award } from 'lucide-react';

export default function ResumeSection() {
  const highlights = [
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: 'Education',
      items: [
        'MS in Data Science - St. John\'s University (Expected May 2026)',
        'BS in Computer Science - St. John\'s University (Expected May 2025)',
      ],
    },
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: 'Experience',
      items: [
        'Graduate Research Assistant',
        'AI/ML Engineering',
        'Full-Stack Development',
        'Startup Growth Leadership',
      ],
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Skills',
      items: [
        'Python, TypeScript, React, Next.js',
        'AWS, Docker, PostgreSQL',
        'PyTorch, TensorFlow, LangChain',
        'Machine Learning & AI Systems',
      ],
    },
  ];

  return (
    <section className="min-h-screen w-screen flex-shrink-0 flex flex-col items-center justify-center px-4 py-20">
      <div className="max-w-4xl w-full">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold mb-6 text-center bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent"
        >
          Resume
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center text-gray-400 text-lg mb-12"
        >
          Download my full resume or explore the highlights below
        </motion.p>

        {/* Download Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center mb-12"
        >
          <a
            href="/Allan Resume Portfolio.pdf"
            download
            className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-full hover:from-amber-700 hover:to-orange-700 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
          >
            <Download className="w-6 h-6 group-hover:animate-bounce" />
            <span className="text-lg font-semibold">Download Full Resume</span>
            <FileText className="w-6 h-6" />
          </a>
        </motion.div>

        {/* Highlights */}
        <div className="space-y-6">
          {highlights.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-700 hover:shadow-xl transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gradient-to-br from-amber-100 to-orange-100 rounded-lg text-amber-600">
                  {section.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-100">{section.title}</h3>
              </div>
              <ul className="space-y-2">
                {section.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-300">
                    <span className="text-amber-400 mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
