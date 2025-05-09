import React from 'react';
import { motion } from 'framer-motion';
import {
  LuCode, LuDatabase, LuServer, LuWrench, LuChevronRight, LuCloud,
} from 'react-icons/lu';

import {
  SiReact, SiJavascript, SiHtml5, SiCss3, SiTailwindcss, SiBootstrap,
  SiNodedotjs, SiExpress, SiFlask, SiDjango, SiFastapi, SiPython,
  SiMongodb, SiPostgresql, SiMysql, SiSqlite,
  SiGit, SiWordpress
} from 'react-icons/si';

const iconMap = {
  'React': <SiReact className="w-4 h-4 text-cyan-500" />,
  'JavaScript': <SiJavascript className="w-4 h-4 text-yellow-500" />,
  'HTML': <SiHtml5 className="w-4 h-4 text-orange-500" />,
  'CSS': <SiCss3 className="w-4 h-4 text-blue-500" />,
  'Tailwind CSS': <SiTailwindcss className="w-4 h-4 text-teal-500" />,
  'Bootstrap': <SiBootstrap className="w-4 h-4 text-purple-600" />,
  'Node.js': <SiNodedotjs className="w-4 h-4 text-green-600" />,
  'Express': <SiExpress className="w-4 h-4 text-gray-600" />,
  'Flask': <SiFlask className="w-4 h-4 text-gray-700" />,
  'Django': <SiDjango className="w-4 h-4 text-green-700" />,
  'FastAPI': <SiFastapi className="w-4 h-4 text-emerald-700" />,
  'Bottle': <SiFlask className="w-4 h-4 text-gray-500" />, // fallback to Flask
  'Python': <SiPython className="w-4 h-4 text-blue-600" />,
  'MongoDB': <SiMongodb className="w-4 h-4 text-green-700" />,
  'PostgreSQL': <SiPostgresql className="w-4 h-4 text-blue-600" />,
  'MySQL': <SiMysql className="w-4 h-4 text-sky-600" />,
  'SQLite': <SiSqlite className="w-4 h-4 text-gray-600" />,
  'Git': <SiGit className="w-4 h-4 text-red-500" />,
  'REST API': <LuCloud className="w-4 h-4 text-cyan-600" />,
  'WordPress': <SiWordpress className="w-4 h-4 text-blue-700" />,
};

const skillData = [
  {
    category: 'Frontend',
    icon: <LuCode className="w-5 h-5 text-indigo-500" />,
    skills: ['React', 'JavaScript', 'HTML', 'CSS', 'Tailwind CSS', 'Bootstrap'],
  },
  {
    category: 'Backend',
    icon: <LuServer className="w-5 h-5 text-indigo-500" />,
    skills: ['Node.js', 'Express', 'Flask', 'Django', 'FastAPI', 'Bottle', 'Python'],
  },
  {
    category: 'Databases',
    icon: <LuDatabase className="w-5 h-5 text-indigo-500" />,
    skills: ['MongoDB', 'PostgreSQL', 'MySQL', 'SQLite'],
  },
  {
    category: 'Tools & Others',
    icon: <LuWrench className="w-5 h-5 text-indigo-500" />,
    skills: ['Git', 'REST API', 'WordPress'],
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
          Tech Stack & Skills
        </motion.h2>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {skillData.map((block, idx) => (
            <motion.div
              key={block.category}
              className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-indigo-500"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2 mb-4">
                {block.icon}
                <h3 className="text-xl font-semibold text-gray-800">{block.category}</h3>
              </div>

              <ul className="grid grid-cols-1 gap-2 text-sm text-gray-700">
                {block.skills.map((skill, i) => (
                  <li key={i} className="flex items-center gap-2 hover:text-indigo-500 transition-all">
                    {iconMap[skill] || <LuChevronRight className="text-indigo-400 w-4 h-4" />}
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;





