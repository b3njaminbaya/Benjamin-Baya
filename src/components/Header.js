import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import {
  ArrowRight, Mail, Menu, X, User, Code, Folder, Send, FileText
} from 'lucide-react';
import { Link } from 'react-scroll';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="relative bg-gray-900 text-white min-h-screen flex flex-col justify-between overflow-hidden ">
      {/* ========== Decorative Blob Background SVG ========== */}
      <div className="absolute top-[-100px] left-[-150px] z-0 opacity-10 pointer-events-none">
        <svg viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg" className="w-[1000px] h-auto">
          <g transform="translate(300,300)">
            <path
              d="M152.3,-151.6C196.4,-108.6,222.1,-42.4,212.6,19.2C203.1,80.7,158.4,137.7,104.5,159.5C50.6,181.3,-13.6,168,-75.6,138.7C-137.5,109.4,-197.2,64.1,-210.4,4.8C-223.5,-54.5,-190,-127.9,-134.5,-170.5C-79,-213.2,-1.5,-225.1,59.3,-213.6C120.2,-202.1,160.5,-167.9,152.3,-151.6Z"
              fill="#6366f1"
            />
          </g>
        </svg>
      </div>

      {/* ========== Navbar ========== */}
      <div className="container mx-auto px-4 py-4 flex justify-between items-center z-50 relative">
        <h1 className="text-xl font-bold">Benjamin Mweri Baya</h1>

        {/* ========== Hamburger Button for Drawer ========== */}
        <button
          className="block md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
        >
          <Menu size={24} />
        </button>

        {/* ========== Desktop Nav ========== */}
        <nav className="hidden md:flex space-x-6 items-center">
          <Link to="about" smooth duration={500} className="flex items-center gap-1 hover:text-gray-400 cursor-pointer">
            <User size={16} /> About
          </Link>
          <Link to="skills" smooth duration={500} className="flex items-center gap-1 hover:text-gray-400 cursor-pointer">
            <Code size={16} /> Skills
          </Link>
          <Link to="projects" smooth duration={500} className="flex items-center gap-1 hover:text-gray-400 cursor-pointer">
            <Folder size={16} /> Projects
          </Link>
          <Link to="contact" smooth duration={500} className="flex items-center gap-1 hover:text-gray-400 cursor-pointer">
            <Send size={16} /> Contact
          </Link>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-gray-400"
          >
            <FileText size={16} /> Resume
          </a>
          <Link to="footer" smooth duration={500} className="flex items-center gap-1 hover:text-gray-400 cursor-pointer">
            <Send size={16} /> Connect
          </Link>
        </nav>
      </div>

      {/* ========== Mobile Drawer ========== */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMenu}
            />

            {/* Sliding Panel */}
            <motion.div
              className="fixed top-0 right-0 h-full w-64 bg-gray-800 text-white p-6 z-50 shadow-lg"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold">Menu</h2>
                <button onClick={toggleMenu}>
                  <X size={24} />
                </button>
              </div>

              <ul className="space-y-4 text-base">
                <li>
                  <Link
                    to="about"
                    smooth duration={500}
                    className="flex items-center gap-2 hover:text-indigo-400 cursor-pointer"
                    onClick={toggleMenu}
                  >
                    <User size={18} /> About
                  </Link>
                </li>
                <li>
                  <Link
                    to="skills"
                    smooth duration={500}
                    className="flex items-center gap-2 hover:text-indigo-400 cursor-pointer"
                    onClick={toggleMenu}
                  >
                    <Code size={18} /> Skills
                  </Link>
                </li>
                <li>
                  <Link
                    to="projects"
                    smooth duration={500}
                    className="flex items-center gap-2 hover:text-indigo-400 cursor-pointer"
                    onClick={toggleMenu}
                  >
                    <Folder size={18} /> Projects
                  </Link>
                </li>
                <li>
                  <Link
                    to="contact"
                    smooth duration={500}
                    className="flex items-center gap-2 hover:text-indigo-400 cursor-pointer"
                    onClick={toggleMenu}
                  >
                    <Send size={18} /> Contact
                  </Link>
                </li>
                <li>
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-indigo-400"
                    onClick={toggleMenu}
                  >
                    <FileText size={18} /> Resume
                  </a>
                </li>
                <li>
                  <Link to="footer" smooth duration={500} className="flex items-center gap-2 hover:text-indigo-400 cursor-pointer" onClick={toggleMenu}>
                    <Send size={18} /> Connect
                  </Link>
                </li>
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ========== Hero Section ========== */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="flex flex-col items-center text-center mt-20 px-6"
      >
        {/* 👇 Greeting Badge */}
        <div className="bg-indigo-600 text-white text-sm px-4 py-1 rounded-full mb-6 animate-pulse">
          👋 Welcome to my portfolio
        </div>

        <h2 className="text-4xl md:text-6xl font-extrabold mb-4">
          Hello, I’m <span className="text-indigo-400">Benjamin</span>
        </h2>

        <h3 className="text-xl md:text-3xl font-medium text-gray-400 mb-6">
          <Typewriter
            options={{
              strings: [
                'Full-Stack Software Developer',
                'Flask & React Specialist',
                'Cloud-Ready App Builder',
                'UI/UX Designer',
              ],
              autoStart: true,
              loop: true,
              delay: 75,
            }}
          />
        </h3>

        <p className="max-w-2xl text-lg text-gray-300 mb-8">
          I build scalable, cloud-ready, and user-focused applications with modern technologies that solve real-world problems.
        </p>

        {/* Hero CTAs */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="projects"
            smooth
            duration={500}
            className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg cursor-pointer transition-all"
          >
            <ArrowRight className="mr-2" size={18} />
            View Projects
          </Link>
          <Link
            to="contact"
            smooth
            duration={500}
            className="inline-flex items-center bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold px-6 py-3 rounded-lg cursor-pointer transition-all"
          >
            <Mail className="mr-2" size={18} />
            Contact Me
          </Link>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg transition-all"
          >
            <FileText className="mr-2" size={18} />
            Download Resume
          </a>
        </div>
      </motion.section>
    </header>
  );
};

export default Header;

