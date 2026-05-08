import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, CalendarDays, ArrowRight } from 'lucide-react';
import profile from '../assets/profile.png';
import Container from './ui/Container';

const bio = [
  "I'm Benjamin Mweri Baya — a software engineer and founder based in Kenya. I design and build modern digital products: custom websites, web applications, mobile apps, business systems, and SaaS platforms for startups, companies, and ambitious teams.",
  "I founded Teevexa to bring enterprise-quality product development within reach of growing businesses. At Teevexa, we provide end-to-end development services — from architecture and design through to deployment and ongoing maintenance — so teams can focus on their product, not the plumbing.",
  "My foundation is a B.Eng in Chemical Engineering from the Technical University of Kenya, complemented by professional Full-Stack training at Moringa School. That engineering mindset shapes how I approach software: systems-first, scalable by default, and built to last.",
];

const About = () => (
  <section id="about" className="min-h-screen py-14 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 relative overflow-hidden">
    {/* Decorative blobs */}
    <div className="absolute -top-40 -left-40 w-[400px] h-[400px] bg-indigo-100 dark:bg-indigo-900/20 rounded-full filter blur-3xl opacity-50 pointer-events-none" />
    <div className="absolute -bottom-40 -right-40 w-[400px] h-[400px] bg-violet-100 dark:bg-violet-900/20 rounded-full filter blur-3xl opacity-50 pointer-events-none" />

    <Container className="relative z-10">
      <motion.h2
        className="text-4xl font-bold text-center text-indigo-600 dark:text-indigo-400 mb-10"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        About Me
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Left — photo + identity */}
        <motion.div
          className="flex flex-col items-center md:items-start gap-6"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <img
            src={profile}
            alt="Benjamin Mweri Baya — Founder & Software Engineer"
            className="rounded-full w-44 h-44 object-contain border-4 border-indigo-500 shadow-xl"
          />

          <div className="text-center md:text-left">
            <p className="text-lg font-bold text-gray-900 dark:text-white">Benjamin Mweri Baya</p>
            <p className="text-sm text-indigo-600 dark:text-indigo-400 font-medium mb-1">Software Engineer</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Founder & CEO,{' '}
              <a
                href="https://www.teevexa.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-500 hover:text-indigo-400 transition-colors font-medium"
              >
                Teevexa
              </a>
            </p>
          </div>

          <blockquote className="bg-indigo-50 dark:bg-indigo-900/30 border-l-4 border-indigo-500 text-gray-700 dark:text-gray-300 italic p-4 rounded-r-xl text-sm leading-relaxed">
            "I don't just write code — I build products that solve real problems and help businesses grow."
          </blockquote>

          {/* Teevexa callout */}
          <div className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
            <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-0.5">
              Teevexa — Product Development Studio
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-3">
              We design, build, and scale modern digital products for startups and businesses. End-to-end, from idea to launch.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <a
                href="https://www.teevexa.com/start-project"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-lg transition-colors"
              >
                <ArrowRight size={13} />
                Start a Project
              </a>
              <a
                href="https://www.teevexa.com/book-consultation"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold bg-emerald-50 dark:bg-emerald-900/30 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 px-3 py-2 rounded-lg transition-colors"
              >
                <CalendarDays size={13} />
                Free Consultation
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right — bio */}
        <motion.ul
          className="flex flex-col gap-5 list-none"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true }}
        >
          {bio.map((text, index) => (
            <motion.li
              key={index}
              className="bg-gray-50 dark:bg-gray-800 hover:bg-indigo-50 dark:hover:bg-gray-700 transition-colors border border-gray-100 dark:border-gray-700 rounded-xl p-5 shadow-sm flex items-start gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              viewport={{ once: true }}
            >
              <CheckCircle className="text-indigo-500 shrink-0 mt-1" size={18} />
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{text}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </Container>
  </section>
);

export default About;
