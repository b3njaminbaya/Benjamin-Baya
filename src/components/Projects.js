import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, X } from 'lucide-react';

const projects = [
  {
    title: "Becof Web App",
    description: "An E-Commerce React-based platform with educational content and farming resources.",
    tech: ["React", "Tailwind CSS", "Flask", "Vercel"],
    github: "https://github.com/benjaminmweribaya/becof-web-app",
    liveDemo: "https://becof-web-app.vercel.app",
  },
  {
    title: "Reading Tracker CLI",
    description: "A CLI tool for managing book collections and tracking reading progress.",
    tech: ["Python", "CLI", "OOP"],
    github: "https://github.com/benjaminmweribaya/CLI-based-Reading-Tracker-Application",
  },
  {
    title: "Eco Home Guide",
    description: "A user-friendly guide to eco-friendly home improvements.",
    tech: ["React", "Chart.js", "Vercel"],
    github: "https://github.com/benjaminmweribaya/eco-home-guide-app",
    liveDemo: "https://eco-home-guide-app.vercel.app",
  },
  {
    title: "Movie Character Explorer",
    description: "Explore movie characters via a public API in this single-page HTML/CSS/JS app.",
    tech: ["HTML", "CSS", "JavaScript", "REST API"],
    github: "https://github.com/benjaminmweribaya/movie-character-explorer",
    liveDemo: "https://benjaminmweribaya.github.io/movie-character-explorer",
  },
  {
    title: "Textile Waste Recycling App",
    description: "A React app for donations, eco-commerce, and waste recycling initiatives.",
    tech: ["React", "Tailwind", "Node.js", "MongoDB"],
    github: "https://github.com/benjaminmweribaya/textile-waste-recycling-app",
    liveDemo: "https://textile-waste-recycling-app.vercel.app",
  },
  {
    title: "Turkana Tech Youths Hub",
    description: "A donation platform for supporting causes in the Turkana region.",
    tech: ["React", "Flask", "Vercel"],
    github: "https://github.com/benjaminmweribaya/turkana-tech-youths-hub",
    liveDemo: "https://www.turkanatechyouthshub.com",
  },
];

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" className="py-20 bg-white relative">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-bold text-center text-indigo-600 mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          My Projects
        </motion.h2>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              onClick={() => setSelectedProject(project)}
              className="bg-gray-50 border border-gray-200 hover:border-indigo-500 hover:shadow-2xl transition-all duration-300 rounded-xl p-6 cursor-pointer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {project.title}
              </h3>
              <p className="text-gray-600 text-sm mb-2 line-clamp-3">{project.description}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {project.tech && project.tech.map((tech, i) => (
                  <span key={i} className="text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg shadow-xl w-11/12 max-w-xl p-6 relative"
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 80, opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
              >
                <X size={20} />
              </button>
              <h3 className="text-2xl font-bold text-indigo-700 mb-2">{selectedProject.title}</h3>
              <p className="text-gray-700 mb-4">{selectedProject.description}</p>

              {selectedProject.tech && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedProject.tech.map((tech, i) => (
                    <span key={i} className="text-sm bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex gap-6">
                {selectedProject.github && (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-indigo-600 hover:text-indigo-800"
                  >
                    <Github className="w-5 h-5 mr-1" />
                    GitHub
                  </a>
                )}
                {selectedProject.liveDemo && (
                  <a
                    href={selectedProject.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-green-600 hover:text-green-800"
                  >
                    <ExternalLink className="w-5 h-5 mr-1" />
                    Live Demo
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;


