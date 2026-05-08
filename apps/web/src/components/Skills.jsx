import React from 'react';
import { motion } from 'framer-motion';
import {
  LuCode, LuDatabase, LuServer, LuSmartphone,
} from 'react-icons/lu';
import {
  SiJavascript, SiTypescript, SiReact, SiNextdotjs, SiTailwindcss,
  SiPython, SiFlask, SiNodedotjs, SiLaravel, SiSpring,
  SiFlutter, SiReact as SiReactNative, SiFirebase, SiSupabase,
  SiPostgresql, SiMysql, SiMongodb, SiSqlite,
} from 'react-icons/si';
import Container from './ui/Container';

const TIER_STYLES = {
  core:       { dot: 'bg-indigo-500', label: 'Core' },
  proficient: { dot: 'bg-violet-400', label: 'Proficient' },
};

const iconMap = {
  'JavaScript':   <SiJavascript className="w-4 h-4 text-yellow-400" />,
  'TypeScript':   <SiTypescript className="w-4 h-4 text-blue-500" />,
  'React':        <SiReact className="w-4 h-4 text-cyan-400" />,
  'Next.js':      <SiNextdotjs className="w-4 h-4 text-black dark:text-white" />,
  'Tailwind CSS': <SiTailwindcss className="w-4 h-4 text-teal-400" />,
  'Python':       <SiPython className="w-4 h-4 text-blue-500" />,
  'Flask':        <SiFlask className="w-4 h-4 text-gray-500 dark:text-gray-300" />,
  'Node.js':      <SiNodedotjs className="w-4 h-4 text-green-500" />,
  'Laravel':      <SiLaravel className="w-4 h-4 text-red-500" />,
  'Spring Boot':  <SiSpring className="w-4 h-4 text-green-600" />,
  'Flutter':      <SiFlutter className="w-4 h-4 text-blue-400" />,
  'React Native': <SiReactNative className="w-4 h-4 text-cyan-500" />,
  'Firebase':     <SiFirebase className="w-4 h-4 text-orange-400" />,
  'Supabase':     <SiSupabase className="w-4 h-4 text-emerald-500" />,
  'PostgreSQL':   <SiPostgresql className="w-4 h-4 text-blue-600" />,
  'MySQL':        <SiMysql className="w-4 h-4 text-sky-500" />,
  'MongoDB':      <SiMongodb className="w-4 h-4 text-green-600" />,
  'SQLite':       <SiSqlite className="w-4 h-4 text-gray-400" />,
};

const skillData = [
  {
    category: 'Frontend',
    icon: <LuCode className="w-5 h-5 text-indigo-500" />,
    skills: [
      { name: 'JavaScript',   tier: 'core' },
      { name: 'TypeScript',   tier: 'core' },
      { name: 'React',        tier: 'core' },
      { name: 'Next.js',      tier: 'core' },
      { name: 'Tailwind CSS', tier: 'proficient' },
    ],
  },
  {
    category: 'Backend',
    icon: <LuServer className="w-5 h-5 text-indigo-500" />,
    skills: [
      { name: 'Python',      tier: 'core' },
      { name: 'Flask',       tier: 'core' },
      { name: 'Node.js',     tier: 'core' },
      { name: 'Laravel',     tier: 'core' },
      { name: 'Spring Boot', tier: 'proficient' },
    ],
  },
  {
    category: 'Mobile',
    icon: <LuSmartphone className="w-5 h-5 text-indigo-500" />,
    skills: [
      { name: 'Flutter',      tier: 'core' },
      { name: 'React Native', tier: 'proficient' },
      { name: 'Firebase',     tier: 'core' },
      { name: 'Supabase',     tier: 'proficient' },
    ],
  },
  {
    category: 'Databases',
    icon: <LuDatabase className="w-5 h-5 text-indigo-500" />,
    skills: [
      { name: 'PostgreSQL', tier: 'core' },
      { name: 'MySQL',      tier: 'core' },
      { name: 'MongoDB',    tier: 'proficient' },
      { name: 'SQLite',     tier: 'proficient' },
    ],
  },
];

const Skills = () => (
  <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-900">
    <Container>
      <motion.h2
        className="text-4xl font-bold text-center text-indigo-600 dark:text-indigo-400 mb-3"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        Tech Stack
      </motion.h2>

      <motion.div
        className="flex justify-center gap-5 mb-10 text-xs text-gray-500 dark:text-gray-400"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
      >
        {Object.entries(TIER_STYLES).map(([tier, { dot, label }]) => (
          <span key={tier} className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${dot}`} />
            {label}
          </span>
        ))}
      </motion.div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {skillData.map((block, idx) => {
          const headingId = `skills-${block.category.toLowerCase().replace(/\s+/g, '-')}`;
          return (
            <motion.div
              key={block.category}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border-t-4 border-indigo-500"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ rotateX: 3, rotateY: -3 }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: 'easeOut' }}
              viewport={{ once: true }}
              style={{ perspective: 1000 }}
            >
              <div className="flex items-center gap-2 mb-4">
                {block.icon}
                <h3 id={headingId} className="text-base font-semibold text-gray-800 dark:text-gray-100">
                  {block.category}
                </h3>
              </div>

              <ul
                className="flex flex-col gap-2 text-sm text-gray-700 dark:text-gray-300"
                aria-labelledby={headingId}
              >
                {block.skills.map(({ name, tier }) => (
                  <li
                    key={name}
                    className="flex items-center gap-2 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full shrink-0 ${TIER_STYLES[tier].dot}`}
                      aria-label={TIER_STYLES[tier].label}
                    />
                    <motion.span whileHover={{ scale: 1.15 }} className="transition-transform shrink-0">
                      {iconMap[name]}
                    </motion.span>
                    {name}
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>
    </Container>
  </section>
);

export default Skills;
