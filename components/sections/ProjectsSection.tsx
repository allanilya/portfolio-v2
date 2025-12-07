'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { projects } from '@/lib/projects';

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const getVisibleProjects = () => {
    if (projects.length <= 3) return projects;

    const prev = (currentIndex - 1 + projects.length) % projects.length;
    const next = (currentIndex + 1) % projects.length;

    return [projects[prev], projects[currentIndex], projects[next]];
  };

  return (
    <div className="min-h-screen w-screen flex-shrink-0 flex flex-col items-center justify-center px-4 py-20">
      <div className="max-w-6xl w-full">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-12 text-center text-gray-100"
        >
          <span data-breakable>Projects</span>
        </motion.h2>

        {/* Carousel Controls */}
        <div className="relative">
          {projects.length > 3 && (
            <>
              <button
                onClick={prevProject}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gray-800 rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow hover:bg-gray-700"
                aria-label="Previous project"
              >
                <ChevronLeft className="w-6 h-6 text-gray-300" />
              </button>
              <button
                onClick={nextProject}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gray-800 rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow hover:bg-gray-700"
                aria-label="Next project"
              >
                <ChevronRight className="w-6 h-6 text-gray-300" />
              </button>
            </>
          )}

          {/* Project Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-12">
            {getVisibleProjects().map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedProject(project.id)}
              className="bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer transform hover:scale-105 border border-gray-700"
            >
              <h3 className="text-xl font-semibold mb-3 text-gray-100">{project.title}</h3>
              <p className="text-gray-400 line-clamp-3 mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.techStack.slice(0, 3).map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-blue-900 text-blue-200 rounded text-xs"
                  >
                    {tech}
                  </span>
                ))}
                {project.techStack.length > 3 && (
                  <span className="px-2 py-1 bg-gray-700 text-gray-400 rounded text-xs">
                    +{project.techStack.length - 3} more
                  </span>
                )}
              </div>
            </motion.div>
            ))}
          </div>
        </div>

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 relative border border-gray-700"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 hover:bg-gray-700 rounded-full transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6 text-gray-300" />
                </button>

                {projects.find((p) => p.id === selectedProject) && (
                  <>
                    <h3 className="text-3xl font-bold mb-4 text-gray-100">
                      {projects.find((p) => p.id === selectedProject)!.title}
                    </h3>
                    <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                      {projects.find((p) => p.id === selectedProject)!.description}
                    </p>

                    <div className="mb-6">
                      <h4 className="text-xl font-semibold mb-3 text-gray-100">Tech Stack</h4>
                      <div className="flex flex-wrap gap-2">
                        {projects
                          .find((p) => p.id === selectedProject)!
                          .techStack.map((tech, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-blue-900 text-blue-200 rounded-full"
                            >
                              {tech}
                            </span>
                          ))}
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <a
                        href={projects.find((p) => p.id === selectedProject)!.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                      >
                        <Github className="w-5 h-5" />
                        View on GitHub
                      </a>
                      {projects.find((p) => p.id === selectedProject)!.liveUrl && (
                        <a
                          href={projects.find((p) => p.id === selectedProject)!.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <ExternalLink className="w-5 h-5" />
                          Live Demo
                        </a>
                      )}
                    </div>
                  </>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
