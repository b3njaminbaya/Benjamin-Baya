import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import { ArrowRight, Mail } from 'lucide-react';
import { Link } from 'react-scroll';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-gray-900 text-white min-h-screen flex flex-col justify-between">
      {/* Navbar */}
      <div className="container mx-auto px-4 py-4 flex justify-between items-center z-50">
        <h1 className="text-xl font-bold">Benjamin Mweri Baya</h1>
        <button
          className="block md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
        <nav className={`${menuOpen ? "block" : "hidden"} md:block absolute md:static top-16 left-0 w-full md:w-auto bg-gray-900 md:bg-transparent`}>
          <ul className="flex flex-col md:flex-row md:space-x-6 items-center text-center">
            <li><Link to="about" smooth duration={500} className="cursor-pointer px-4 py-2 hover:text-gray-400">About</Link></li>
            <li><Link to="skills" smooth duration={500} className="cursor-pointer px-4 py-2 hover:text-gray-400">Skills</Link></li>
            <li><Link to="projects" smooth duration={500} className="cursor-pointer px-4 py-2 hover:text-gray-400">Projects</Link></li>
            <li><Link to="contact" smooth duration={500} className="cursor-pointer px-4 py-2 hover:text-gray-400">Contact</Link></li>
          </ul>
        </nav>
      </div>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="flex flex-col items-center text-center mt-20 px-6"
      >
        <h2 className="text-4xl md:text-6xl font-extrabold mb-4">
          Hello, I’m <span className="text-indigo-400">Benjamin</span>
        </h2>

        <h3 className="text-xl md:text-3xl font-medium text-gray-400 mb-6">
          <Typewriter
            options={{
              strings: ['Full-Stack Software Developer', 'Flask & React Specialist', 'Cloud-Ready App Builder'],
              autoStart: true,
              loop: true,
              delay: 75,
            }}
          />
        </h3>

        <p className="max-w-2xl text-lg text-gray-300 mb-8">
          I build scalable, cloud-ready, and user-focused applications with modern technologies that solve real-world problems.
        </p>

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
        </div>
      </motion.section>
    </header>
  );
};

export default Header;

