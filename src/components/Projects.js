import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, X } from 'lucide-react';

const projects = [
  {
    title: "Task Management App",
    type: "Full-Stack",
    description: "A comprehensive task management system designed to streamline and optimize organizational task tracking, assignment, and completion. ",
    tech: ["React", "Vite", "Tailwind CSS", "Flask", "PostgreSQL", "WebSocket"],
    image: "/taskly.png",
    github: "https://github.com/benjaminmweribaya/taskly-app-front-end",
    liveDemo: "https://taskly-app-iota.vercel.app",
    featured: true,
    details: [
      "Real-time updates via WebSocket",
      "Flask backend with PostgreSQL integration",
      "Sleek and responsive UI using Tailwind CSS",
    ],
  },
  {
    title: "Micro-Donations Platform",
    type: "Full-Stack",
    description: "A Flask-React Web Application that enables users to make small, impactful donations to support various causes like education, healthcare, and environmental initiatives.",
    tech: ["React", "Flask", "Tailwind CSS", "PostgreSQL", "WebSocket", "M-pesa API", "Payment Gateway"],
    image: "/micro-donations.png",
    github: "https://github.com/benjaminmweribaya/Micro-Donations-Platform",
    liveDemo: "https://micro-donations-platform.vercel.app",
    featured: true,
    details: [
      "Real-time updates via WebSocket",
      "Flask backend with PostgreSQL integration",
      "Sleek and responsive UI using Tailwind CSS",
    ],
  },
  {
    title: "E-Commerce & Consulting App",
    type: "Full-Stack",
    description: "A full-stack e-commerce and consulting platform that allows Becof Organic Chemicals to sell their products, as well as allow users to seek expert advice on various agricultural topics.",
    tech: ["React", "Tailwind", "Flask", "PostgreSQL", "Node.js", "M-pesa API", "Payment Gateway"],
    image: "/becof.png",
    github: "https://github.com/benjaminmweribaya/becof-organic-chemicals",
    liveDemo: "https://becof-organic-chemicals.vercel.app",
    featured: true,
    details: [
      "Combines e-commerce functionality with consultation booking",
      "Product management with admin dashboard",
      "Mobile-friendly and fully responsive",
    ],
  },
  {
    title: "Turkana Tech Youths Hub",
    type: "Full-Stack",
    description: "A full-stack community-based platform built with Flask and React that enables users to contribute to impactful causes through monetary donations or volunteer opportunities. The application provides a secure and user-friendly interface for supporting grassroots initiatives, complete with integrated payments via the Mpesa API and a robust donation tracking system.",
    tech: ["React", "Flask", "Tailwind CSS", "Material UI (MUI)", "Lucide Icons", "Mpesa API", "PostgreSQL", "Payment Gateway Integration"],
    image: "/turkana.png",
    github: "https://github.com/benjaminmweribaya/turkana-tech-hub",
    liveDemo: "https://turkana-tech-hub.vercel.app",
    featured: true,
    details: [
      "Volunteer matching system with project listings",
      "Donation tracker integrated with M-Pesa",
      "Built with community engagement in mind",
    ],
  },
  {
    title: "Eco Home Guide",
    type: "Front-End",
    description: "A user-friendly guide to eco-friendly home improvements.",
    tech: ["React", "Chart.js", "Vercel"],
    image: "/eco-home-guide.png",
    github: "https://github.com/benjaminmweribaya/eco-home-guide-app",
    liveDemo: "https://eco-home-guide-app.vercel.app",
    featured: false,
    details: [
      "Visual representation of energy savings with Chart.js",
      "Clean, modern UI focused on readability",
      "Deployed on Vercel for fast performance",
    ],
  },
  {
    title: "Movie Character Explorer",
    type: "Front-End",
    description: "Explore movie characters via a public API in this single-page HTML/CSS/JS app.",
    tech: ["HTML", "CSS", "JavaScript", "REST API"],
    image: "/movie-character.png",
    github: "https://github.com/benjaminmweribaya/movie-character-explorer",
    liveDemo: "https://benjaminmweribaya.github.io/movie-character-explorer",
    featured: false,
    details: [
      "Fetches data from a public REST API",
      "Built with pure vanilla JavaScript",
      "Responsive design for mobile viewing",
    ],
  },
  {
    title: "Reading Tracker CLI",
    type: "CLI Tool",
    description: "A CLI tool for managing book collections and tracking reading progress.",
    tech: ["Python", "CLI", "OOP"],
    image: "/reading-tracker.png",
    github: "https://github.com/benjaminmweribaya/CLI-based-Reading-Tracker-Application",
    featured: false,
    details: [
      "Implements Object-Oriented Design",
      "Allows CRUD operations on book entries",
      "Intuitive CLI navigation for end-users",
    ],
  },
];

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

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
              aria-describedby={`project-hint-${index}`}
              className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-indigo-500 hover:shadow-2xl transition-all duration-300 rounded-xl p-6 cursor-pointer relative overflow-hidden "
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {project.featured && (
                <span className="absolute top-2 right-2 bg-yellow-300 text-yellow-900 text-xs px-2 py-1 rounded-full">
                  Featured
                </span>
              )}
              <img
                src={project.image}
                alt={`${project.title} Screenshot`}
                className="w-full h-40 object-cover rounded-lg mb-4 border border-gray-200 dark:border-gray-700"
              />
              <span className="uppercase text-xs bg-green-100 text-green-600 px-2 py-1 rounded mb-2 inline-block">
                {project.type}
              </span>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                {project.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-2 line-clamp-3">{project.description}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {project.tech && project.tech.map((tech, i) => (
                  <span key={i} className="text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
              <p
                id={`project-hint-${index}`}
                className="text-xs text-indigo-400 mt-3 italic"
              >
                Click to view more
              </p>
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
              className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-11/12 max-w-2xl p-6 relative overflow-y-auto max-h-[90vh]"
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 80, opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
                aria-label="Close project details modal"
              >
                <X size={20} />
              </button>
              <img
                src={selectedProject.image}
                alt={`${selectedProject.title} Screenshot`}
                className="w-full h-64 object-cover rounded mb-4"
              />
              <span className="uppercase text-xs bg-green-100 text-green-600 px-2 py-1 rounded mb-2 inline-block">
                {selectedProject.type}
              </span>
              <h3 className="text-2xl font-bold text-indigo-700 dark:text-indigo-400 mb-2">{selectedProject.title}</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">{selectedProject.description}</p>
              {selectedProject.details && (
                <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-300 mb-4">
                  {selectedProject.details.map((detail, idx) => (
                    <li key={idx}>{detail}</li>
                  ))}
                </ul>
              )}
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
              <p className="text-xs text-gray-500 italic mt-4">
                Want a detailed breakdown? Ask me about this project!
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;


