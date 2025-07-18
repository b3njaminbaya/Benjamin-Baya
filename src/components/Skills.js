import React from 'react';
import { motion } from 'framer-motion';
import {
  LuCode, LuDatabase, LuServer, LuWrench, LuChevronRight, LuCloud, LuServerCog,
} from 'react-icons/lu';
import {
  SiReact, SiJavascript, SiTypescript, SiHtml5, SiCss3, SiTailwindcss, SiBootstrap,
  SiNodedotjs, SiFlask, SiDjango, SiPython, SiNextdotjs,
  SiExpress, SiDart, SiKotlin, SiFirebase,
  SiMongodb, SiPostgresql, SiMysql, SiSqlite,
  SiGit, SiGithub, SiFigma, SiTrello, SiVercel,
  SiFlutter
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';


const iconMap = {
  'React': <SiReact className="w-4 h-4 text-cyan-500" />,
  'JavaScript': <SiJavascript className="w-4 h-4 text-yellow-500" />,
  'TypeScript': <SiTypescript className="w-4 h-4 text-blue-500" />,
  'HTML': <SiHtml5 className="w-4 h-4 text-orange-500" />,
  'CSS': <SiCss3 className="w-4 h-4 text-blue-500" />,
  'Tailwind CSS': <SiTailwindcss className="w-4 h-4 text-teal-500" />,
  'Bootstrap': <SiBootstrap className="w-4 h-4 text-purple-600" />,
  'Next.js': <SiNextdotjs className="w-4 h-4 text-black" />,
  'Node.js': <SiNodedotjs className="w-4 h-4 text-green-600" />,
  'Express.js': <SiExpress className="w-4 h-4 text-gray-800" />,
  'Flask': <SiFlask className="w-4 h-4 text-gray-700" />,
  'Django': <SiDjango className="w-4 h-4 text-green-700" />,
  'Python': <SiPython className="w-4 h-4 text-blue-600" />,
  'Java': <FaJava className="w-4 h-4 text-red-600" />,
  'Spring Boot': <LuServerCog className="w-4 h-4 text-green-700" />,
  'MongoDB': <SiMongodb className="w-4 h-4 text-green-700" />,
  'PostgreSQL': <SiPostgresql className="w-4 h-4 text-blue-600" />,
  'MySQL': <SiMysql className="w-4 h-4 text-sky-600" />,
  'SQLite': <SiSqlite className="w-4 h-4 text-gray-600" />,
  'Firebase': <SiFirebase className="w-4 h-4 text-orange-500" />,
  'Git': <SiGit className="w-4 h-4 text-red-500" />,
  'GitHub': <SiGithub className="w-4 h-4 text-gray-600" />,
  'Figma': <SiFigma className="w-4 h-4 text-pink-600" />,
  'Trello': <SiTrello className="w-4 h-4 text-blue-500" />,
  'AWS': <LuCloud className="w-4 h-4 text-orange-400" />,
  'Azure': <LuCloud className="w-4 h-4 text-blue-500" />,
  'Flutter': <SiFlutter className="w-4 h-4 text-blue-500" />,
  'Dart': <SiDart className="w-4 h-4 text-cyan-700" />,
  'Kotlin': <SiKotlin className="w-4 h-4 text-purple-500" />,
  'React Native': <SiReact className="w-4 h-4 text-cyan-600" />,
  'Render': <LuCloud className="w-4 h-4 text-gray-800" />,
  'Vercel': <SiVercel className="w-4 h-4 text-black" />,
};

const skillData = [
  {
    category: 'Frontend',
    icon: <LuCode className="w-5 h-5 text-indigo-500" />,
    skills: ['HTML', 'CSS', 'Tailwind CSS', 'Bootstrap', 'JavaScript', 'React', 'Next.js', 'TypeScript'],
  },
  {
    category: 'Backend',
    icon: <LuServer className="w-5 h-5 text-indigo-500" />,
    skills: ['Python', 'Flask', 'Node.js', 'Express.js', 'Django', 'Java', 'Spring Boot'],
  },
  {
    category: 'Mobile',
    icon: <LuServer className="w-5 h-5 text-indigo-500" />,
    skills: ['Flutter', 'Dart', 'Kotlin', 'React Native', 'Firebase'],
  },
  {
    category: 'Databases',
    icon: <LuDatabase className="w-5 h-5 text-indigo-500" />,
    skills: ['MongoDB', 'PostgreSQL', 'MySQL', 'SQLite'],
  },
  {
    category: 'Tools',
    icon: <LuWrench className="w-5 h-5 text-indigo-500" />,
    skills: ['Git', 'GitHub', 'Figma', 'Trello'],
  },
  {
    category: 'DevOps',
    icon: <LuCloud className="w-5 h-5 text-indigo-500" />,
    skills: [ 'AWS', 'Azure', 'Render', 'Vercel'],
  },
];

const Skills = () => {
  return (
    <section id="skills" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-bold text-center text-indigo-600 mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Tech Stack
        </motion.h2>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-6">
          {skillData.map((block, idx) => {
            const headingId = `skills-${block.category.toLowerCase().replace(/\s+/g, '-')}`;
            return (
              <motion.div
                key={block.category}
                className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-indigo-500"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ rotateX: 4, rotateY: -4 }}
                transition={{ duration: 0.6, delay: idx * 0.2, ease: 'easeOut' }}
                viewport={{ once: true }}
                style={{ perspective: 1000 }}
              >
                <motion.div className="flex items-center gap-2 mb-4">
                  <motion.div
                    initial={{ rotate: -20, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.2 + 0.2 }}
                  >
                    {block.icon}
                  </motion.div>
                  <h3 id={headingId} className="text-xl font-semibold text-gray-800">
                    {block.category}
                  </h3>
                </motion.div>

                <ul
                  className="grid grid-cols-1 gap-2 text-sm text-gray-700"
                  aria-labelledby={headingId}
                >
                  {block.skills.map((skill, i) => (
                    <motion.li
                      key={skill}
                      className="flex items-center gap-2 hover:text-indigo-500 transition-all"
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: idx * 0.2 + i * 0.05 }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        className="transition-transform"
                      >
                        {iconMap[skill] || <LuChevronRight className="text-indigo-400 w-4 h-4" />}
                      </motion.div>
                      {skill}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;










