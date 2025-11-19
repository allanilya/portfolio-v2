/**
 * PROJECTS COMPONENT
 * ==================
 * Interactive carousel that displays your GitHub projects.
 *
 * What it displays:
 * - "Projects" heading
 * - Carousel with left/right arrows (if more than 3 projects)
 * - Project cards showing title, description, and tech stack preview
 * - Click any card to open a modal with full details
 *
 * How to add/edit projects:
 * - Go to /lib/projects.ts and edit the projects array
 * - Each project needs: id, title, description, techStack, githubUrl, liveUrl (optional)
 *
 * How to customize:
 * - Change number of visible cards: Modify grid-cols-3 on line 68
 * - Change card colors: Edit bg-white and dark:bg-gray-800
 * - Change tech stack tag colors: Edit bg-blue-100 (lines 80-85)
 * - Remove carousel arrows: Delete lines 35-55
 */

'use client';

import { useState } from 'react';
import { Github, ExternalLink, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { projects } from '@/lib/projects';

export default function Projects() {
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
    <section id="projects" className="relative z-10 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">Projects</h2>

        {/* Carousel Controls */}
        <div className="relative">
          {projects.length > 3 && (
            <>
              <button
                onClick={prevProject}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow"
                aria-label="Previous project"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextProject}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow"
                aria-label="Next project"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Project Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-12">
            {getVisibleProjects().map((project) => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project.id)}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer transform hover:scale-105"
              >
                <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 line-clamp-3 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.slice(0, 3).map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-xs">
                      +{project.techStack.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Project Modal */}
        {selectedProject !== null && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedProject(null)}
          >
            <div
              className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>

              {projects.find((p) => p.id === selectedProject) && (
                <>
                  <h3 className="text-3xl font-bold mb-4">
                    {projects.find((p) => p.id === selectedProject)!.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg leading-relaxed">
                    {projects.find((p) => p.id === selectedProject)!.description}
                  </p>

                  <div className="mb-6">
                    <h4 className="text-xl font-semibold mb-3">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {projects
                        .find((p) => p.id === selectedProject)!
                        .techStack.map((tech, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full"
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
                      className="flex items-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
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
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
