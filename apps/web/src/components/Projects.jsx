import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, X } from 'lucide-react';
import Container from './ui/Container';

const projects = [
  {
    title: "Task Management App",
    type: "Full-Stack",
    description: "A comprehensive task management system designed to streamline and optimize organizational task tracking, assignment, and completion.",
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
    description: "A Flask-React platform enabling users to make small, impactful donations toward education, healthcare, and environmental causes — powered by M-Pesa for seamless mobile money payments.",
    tech: ["React", "Flask", "Tailwind CSS", "PostgreSQL", "WebSocket", "M-pesa API", "Payment Gateway"],
    image: "/micro-donations.png",
    github: "https://github.com/benjaminmweribaya/Micro-Donations-Platform",
    liveDemo: "https://micro-donations-platform.vercel.app",
    featured: true,
    details: [
      "M-Pesa API integration for seamless mobile money donations",
      "Multi-category cause system: education, healthcare, and environment",
      "Real-time donation tracking with WebSocket and PostgreSQL backend",
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
    description: "A community-based platform built with Flask and React that enables users to contribute to impactful causes through monetary donations or volunteer opportunities, complete with M-Pesa integration and a robust donation tracking system.",
    tech: ["React", "Flask", "Tailwind CSS", "Material UI", "Mpesa API", "PostgreSQL"],
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
    description: "An interactive React app helping homeowners discover eco-friendly home improvements and visualize potential energy savings — built for clarity, speed, and mobile accessibility.",
    tech: ["React", "Chart.js", "Vercel"],
    image: "/eco-home-guide.png",
    github: "https://github.com/benjaminmweribaya/eco-home-guide",
    liveDemo: "https://eco-home-guide.vercel.app",
    featured: false,
    details: [
      "Interactive energy savings calculator with Chart.js data visualizations",
      "Curated eco-upgrade recommendations organized by home improvement category",
      "Mobile-first design with Vercel deployment for global fast-load performance",
    ],
  },
  {
    title: "Movie Character Explorer",
    type: "Front-End",
    description: "A zero-framework single-page app that fetches and displays movie characters from a public REST API — demonstrating async JavaScript, DOM manipulation, and responsive UI without any libraries.",
    tech: ["HTML", "CSS", "JavaScript", "REST API"],
    image: "/movie-character.png",
    github: "https://github.com/benjaminmweribaya/movie-character-explorer",
    liveDemo: "https://benjaminmweribaya.github.io/movie-character-explorer",
    featured: false,
    details: [
      "Pure vanilla JS with async/await for REST API data fetching",
      "Dynamic DOM rendering — no React, no frameworks, just the platform",
      "Fully responsive layout with CSS Grid and Flexbox",
    ],
  },
];

const FILTER_TYPES = ['All', 'Full-Stack', 'Front-End'];

const Projects = () => {
  const [filter, setFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const modalRef = useRef(null);
  const closeBtnRef = useRef(null);

  const filtered = filter === 'All' ? projects : projects.filter(p => p.type === filter);

  useEffect(() => {
    if (!selectedProject) return;
    closeBtnRef.current?.focus();
    const focusable = modalRef.current?.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
    const onKeyDown = (e) => {
      if (e.key === 'Escape') { setSelectedProject(null); return; }
      if (e.key !== 'Tab' || !focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [selectedProject]);

  return (
    <section id="projects" className="min-h-screen py-14 bg-white dark:bg-gray-900 relative">
      <Container>
        <motion.h2
          className="text-4xl font-bold text-center text-indigo-600 dark:text-indigo-400 mb-6"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          My Projects
        </motion.h2>

        {/* Filter bar */}
        <div
          className="flex justify-center gap-3 mb-8"
          role="group"
          aria-label="Filter projects by type"
        >
          {FILTER_TYPES.map(type => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              aria-pressed={filter === type}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === type
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700 hover:text-indigo-600'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, index) => (
              <motion.div
                key={project.title}
                layout
                onClick={() => setSelectedProject(project)}
                aria-describedby={`project-hint-${project.title}`}
                className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-indigo-500 hover:shadow-xl transition-all duration-300 rounded-xl p-6 cursor-pointer relative overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                viewport={{ once: true }}
              >
                {project.featured && (
                  <span className="absolute top-2 right-2 bg-yellow-300 text-yellow-900 text-xs px-2 py-1 rounded-full">
                    Featured
                  </span>
                )}
                <img
                  src={project.image}
                  alt={`${project.title} screenshot`}
                  className="w-full h-40 object-contain rounded-lg mb-4 border border-gray-200 dark:border-gray-700"
                  loading="lazy"
                  width="400"
                  height="160"
                />
                <span className="uppercase text-xs bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400 px-2 py-1 rounded mb-2 inline-block">
                  {project.type}
                </span>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="text-xs bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300 px-2 py-1 rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
                <p id={`project-hint-${project.title}`} className="text-xs text-indigo-400 mt-3 italic">
                  Click to view details
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </Container>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            aria-modal="true"
            role="dialog"
            aria-label={`${selectedProject.title} details`}
          >
            <motion.div
              ref={modalRef}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl p-6 relative overflow-y-auto max-h-[90vh]"
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              transition={{ duration: 0.35 }}
              onClick={e => e.stopPropagation()}
            >
              <button
                ref={closeBtnRef}
                onClick={() => setSelectedProject(null)}
                className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors"
                aria-label="Close project details"
              >
                <X size={20} />
              </button>

              <img
                src={selectedProject.image}
                alt={`${selectedProject.title} screenshot`}
                className="w-full h-56 object-contain rounded-lg mb-4"
              />
              <span className="uppercase text-xs bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400 px-2 py-1 rounded mb-3 inline-block">
                {selectedProject.type}
              </span>
              <h3 className="text-2xl font-bold text-indigo-700 dark:text-indigo-400 mb-2">
                {selectedProject.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                {selectedProject.description}
              </p>
              {selectedProject.details && (
                <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-300 mb-4 space-y-1">
                  {selectedProject.details.map((detail, idx) => (
                    <li key={idx}>{detail}</li>
                  ))}
                </ul>
              )}
              <div className="flex flex-wrap gap-2 mb-5">
                {selectedProject.tech.map((tech, i) => (
                  <span key={i} className="text-xs bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300 px-3 py-1 rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-6">
                {selectedProject.github && (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 text-sm font-medium"
                  >
                    <Github size={16} /> GitHub
                  </a>
                )}
                {selectedProject.liveDemo && (
                  <a
                    href={selectedProject.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 text-sm font-medium"
                  >
                    <ExternalLink size={16} /> Live Demo
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
