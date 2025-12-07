'use client';

import { motion } from 'framer-motion';
import { Brain, Sparkles, Zap, Code2 } from 'lucide-react';

const aiProjects = [
  {
    icon: <Brain className="w-8 h-8" />,
    title: 'Codify AI',
    description: 'AI-powered programming tutor helping students learn to code through interactive lessons and real-time feedback.',
    tech: ['OpenAI', 'LangChain', 'Python', 'React'],
  },
  {
    icon: <Sparkles className="w-8 h-8" />,
    title: 'ML Research',
    description: 'Graduate research in machine learning applications, focusing on natural language processing and computer vision.',
    tech: ['PyTorch', 'TensorFlow', 'Scikit-learn'],
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: 'Hackathon Wins',
    description: 'Multiple hackathon victories for innovative AI solutions, including award-winning implementations of GPT and Claude.',
    tech: ['Anthropic Claude', 'OpenAI GPT', 'AWS'],
  },
  {
    icon: <Code2 className="w-8 h-8" />,
    title: 'AI Integration',
    description: 'Expertise in integrating AI/ML models into production applications with scalable cloud infrastructure.',
    tech: ['AWS', 'Docker', 'FastAPI', 'PostgreSQL'],
  },
];

export default function AISection() {
  return (
    <section className="min-h-screen w-screen flex-shrink-0 flex flex-col items-center justify-center px-4 py-20">
      <div className="max-w-6xl w-full">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent"
        >
          AI & Machine Learning
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center text-gray-400 text-lg mb-12 max-w-3xl mx-auto"
        >
          Specializing in building intelligent systems that solve real-world problems through
          cutting-edge AI and machine learning technologies.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {aiProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all border border-gray-700 group hover:scale-105"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 p-3 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg text-purple-600 group-hover:scale-110 transition-transform">
                  {project.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2 text-gray-100">{project.title}</h3>
                  <p className="text-gray-400 mb-4 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
