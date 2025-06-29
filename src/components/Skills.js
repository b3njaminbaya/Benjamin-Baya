import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  TouchSensor,
  KeyboardSensor,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  LuCode, LuDatabase, LuServer, LuWrench, LuChevronRight, LuCloud,
} from 'react-icons/lu';
import {
  SiReact, SiJavascript, SiTypescript, SiHtml5, SiCss3, SiTailwindcss, SiBootstrap,
  SiNodedotjs, SiExpress, SiFlask, SiDjango, SiFastapi, SiPython,
  SiMongodb, SiPostgresql, SiMysql, SiSqlite,
  SiGit, SiGithub, SiFigma, SiWordpress
} from 'react-icons/si';

const iconMap = {
  'React': <SiReact className="w-4 h-4 text-cyan-500" />, 'JavaScript': <SiJavascript className="w-4 h-4 text-yellow-500" />, 'TypeScript': <SiTypescript className="w-4 h-4 text-blue-500" />, 'HTML': <SiHtml5 className="w-4 h-4 text-orange-500" />, 'CSS': <SiCss3 className="w-4 h-4 text-blue-500" />, 'Tailwind CSS': <SiTailwindcss className="w-4 h-4 text-teal-500" />, 'Bootstrap': <SiBootstrap className="w-4 h-4 text-purple-600" />, 'Node.js': <SiNodedotjs className="w-4 h-4 text-green-600" />, 'Express': <SiExpress className="w-4 h-4 text-gray-600" />, 'Flask': <SiFlask className="w-4 h-4 text-gray-700" />, 'Django': <SiDjango className="w-4 h-4 text-green-700" />, 'FastAPI': <SiFastapi className="w-4 h-4 text-emerald-700" />, 'Python': <SiPython className="w-4 h-4 text-blue-600" />, 'MongoDB': <SiMongodb className="w-4 h-4 text-green-700" />, 'PostgreSQL': <SiPostgresql className="w-4 h-4 text-blue-600" />, 'MySQL': <SiMysql className="w-4 h-4 text-sky-600" />, 'SQLite': <SiSqlite className="w-4 h-4 text-gray-600" />, 'Git': <SiGit className="w-4 h-4 text-red-500" />, 'GitHub': <SiGithub className="w-4 h-4 text-gray-600" />, 'Figma': <SiFigma className="w-4 h-4 text-pink-600" />, 'REST API': <LuCloud className="w-4 h-4 text-cyan-600" />, 'WordPress': <SiWordpress className="w-4 h-4 text-blue-700" />,
};

const categoryIconMap = {
  LuCode: <LuCode className="w-5 h-5 text-indigo-500" />, LuServer: <LuServer className="w-5 h-5 text-indigo-500" />, LuDatabase: <LuDatabase className="w-5 h-5 text-indigo-500" />, LuWrench: <LuWrench className="w-5 h-5 text-indigo-500" />,
};

const defaultSkillData = [
  { id: 'Frontend', category: 'Frontend', iconKey: 'LuCode', skills: ['React', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'Tailwind CSS', 'Bootstrap'] },
  { id: 'Backend', category: 'Backend', iconKey: 'LuServer', skills: ['Python', 'Flask', 'Node.js', 'Express', 'Django', 'FastAPI', 'REST API'] },
  { id: 'Databases', category: 'Databases', iconKey: 'LuDatabase', skills: ['MongoDB', 'PostgreSQL', 'MySQL', 'SQLite'] },
  { id: 'Tools', category: 'Tools', iconKey: 'LuWrench', skills: ['Git', 'GitHub', 'Figma', 'WordPress'] },
];

const SortableSkillCard = ({ block }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 0,
    boxShadow: isDragging ? '0 16px 32px rgba(0,0,0,0.25)' : '',
    opacity: isDragging ? 0.9 : 1,
    cursor: isDragging ? 'grabbing' : 'grab',
    scale: isDragging ? 1.05 : 1,
    touchAction: 'none',
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-indigo-500"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center gap-2 mb-4">
        {categoryIconMap[block.iconKey]}
        <h3 className="text-xl font-semibold text-gray-800">{block.category}</h3>
      </div>

      <ul className="grid grid-cols-1 gap-2 text-sm text-gray-700">
        {block.skills.map((skill) => (
          <li key={skill} className="flex items-center gap-2 hover:text-indigo-500 transition-all">
            {iconMap[skill] || <LuChevronRight className="text-indigo-400 w-4 h-4" />} {skill}
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

const Skills = () => {
  const [blocks, setBlocks] = useState(defaultSkillData);

  useEffect(() => {
    const stored = localStorage.getItem('skill-blocks');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) setBlocks(parsed);
      } catch (err) {
        console.error("Failed to parse stored skill blocks:", err);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('skill-blocks', JSON.stringify(blocks));
  }, [blocks]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 5 } }),
    useSensor(KeyboardSensor)
  );

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

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={({ active, over }) => {
            if (active.id !== over?.id) {
              const oldIndex = blocks.findIndex((b) => b.id === active.id);
              const newIndex = blocks.findIndex((b) => b.id === over?.id);
              setBlocks(arrayMove(blocks, oldIndex, newIndex));
            }
          }}
        >
          <SortableContext items={blocks.map((b) => b.id)} strategy={verticalListSortingStrategy}>
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {blocks.map((block) => (
                <SortableSkillCard key={block.id} block={block} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
        <p className="mt-6 text-center text-sm text-gray-600">
          You can <strong>drag and drop</strong> the skill category cards to reorder them. Refresh the page to keep the changes or
          <button
            onClick={() => {
              localStorage.removeItem('skill-blocks');
              window.location.reload();
            }}
            className="text-red-500 hover:underline ml-1"
          >
            click here to reset the order
          </button>.
        </p>
      </div>
    </section>
  );
};

export default Skills;









