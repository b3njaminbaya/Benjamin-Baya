import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, Rocket, Building2 } from 'lucide-react';
import Container from './ui/Container';

const TYPE_CONFIG = {
  education: {
    icon: GraduationCap,
    dot:  'bg-violet-500 border-violet-300',
    badge: 'bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300',
    label: 'Education',
  },
  work: {
    icon: Briefcase,
    dot:  'bg-blue-500 border-blue-300',
    badge: 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300',
    label: 'Work',
  },
  founding: {
    icon: Rocket,
    dot:  'bg-indigo-500 border-indigo-300',
    badge: 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300',
    label: 'Founded',
  },
  milestone: {
    icon: Building2,
    dot:  'bg-emerald-500 border-emerald-300',
    badge: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300',
    label: 'Milestone',
  },
};

const TIMELINE = [
  {
    period: 'November 2024',
    title: 'B.Eng Chemical Engineering',
    org: 'Technical University of Kenya',
    type: 'education',
    description:
      'Graduated with a Bachelor of Engineering in Chemical Engineering. The systems-thinking and engineering rigour from this degree directly shapes how I design scalable, reliable software today.',
  },
  {
    period: 'July 2025',
    title: 'Certificate in Full Stack Software Engineering',
    org: 'Moringa School',
    type: 'education',
    description:
      'Completed professional full-stack training covering React, Python, Flask, PostgreSQL, REST APIs, and modern software engineering practices. Built and shipped multiple real-world projects.',
  },
  {
    period: 'July 2025',
    title: 'Software Engineer Intern',
    org: 'Sensys Kenya Ltd · Nairobi',
    type: 'work',
    description:
      'First professional role — contributed to real-world software solutions, gaining hands-on experience with production systems, team workflows, and client-facing engineering deliverables.',
    end: 'September 2025',
  },
  {
    period: 'July 2025',
    title: 'Founded Teevexa',
    org: 'Teevexa — Product Development Studio',
    type: 'founding',
    description:
      'Founded Teevexa to bring enterprise-quality software development within reach of growing businesses. We deliver end-to-end digital products — from architecture and design to deployment and maintenance.',
    link: 'https://www.teevexa.com',
  },
  {
    period: 'August 2025 – Present',
    title: 'Software Engineer',
    org: 'Buzlin Holdings Inc · Canada (Remote)',
    type: 'work',
    current: true,
    description:
      'Working remotely with a Canadian company as part of an international engineering team. Building and maintaining software systems that serve real users across multiple markets.',
  },
  {
    period: '3 March 2026',
    title: 'TEEVEXA LTD Officially Incorporated',
    org: 'Kenya Registrar of Companies',
    type: 'milestone',
    description:
      'Teevexa was officially incorporated as a Private Limited Company in Kenya — a significant milestone formalising the studio and setting the foundation for a scalable, investment-ready business.',
  },
];

const TimelineEntry = ({ entry, index }) => {
  const isLeft = index % 2 === 0;
  const config = TYPE_CONFIG[entry.type];
  const Icon = config.icon;

  return (
    <div className="relative flex items-start md:items-center gap-0">
      {/* Mobile: left dot */}
      <div className={`absolute left-4 top-5 w-3.5 h-3.5 rounded-full border-2 z-10 ${config.dot} md:hidden`} />

      {/* Desktop: center dot */}
      <div className={`absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 z-10 ${config.dot} hidden md:flex items-center justify-center`}>
        <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
      </div>

      {/* Spacer for left side on desktop */}
      {isLeft && <div className="hidden md:block md:w-1/2 md:pr-10" />}

      {/* Card */}
      <motion.div
        className={`ml-12 md:ml-0 w-full md:w-[calc(50%-2rem)] ${isLeft ? 'md:pr-0 md:pl-10' : 'md:pl-0 md:pr-10 md:ml-auto'}`}
        initial={{ opacity: 0, x: isLeft ? 30 : -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.55, delay: 0.05, ease: 'easeOut' }}
        viewport={{ once: true, margin: '-40px' }}
      >
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-600 transition-all">
          <div className="flex items-start justify-between gap-3 mb-2 flex-wrap">
            <div className="flex items-center gap-2">
              <Icon size={15} className="text-gray-400 dark:text-gray-500 shrink-0" />
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${config.badge}`}>
                {config.label}
              </span>
              {entry.current && (
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse inline-block" />
                  Current
                </span>
              )}
            </div>
            <span className="text-xs text-gray-400 dark:text-gray-500 font-medium shrink-0">
              {entry.period}{entry.end ? ` – ${entry.end}` : ''}
            </span>
          </div>

          <h3 className="text-base font-bold text-gray-900 dark:text-white mb-0.5">
            {entry.title}
          </h3>
          <p className="text-sm text-indigo-600 dark:text-indigo-400 font-medium mb-2">
            {entry.link ? (
              <a href={entry.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                {entry.org}
              </a>
            ) : entry.org}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            {entry.description}
          </p>
        </div>
      </motion.div>

      {/* Spacer for right side on desktop */}
      {!isLeft && <div className="hidden md:block md:w-1/2 md:pl-10" />}
    </div>
  );
};

const Experience = () => (
  <section id="experience" className="py-20 bg-white dark:bg-gray-900">
    <Container>
      <motion.h2
        className="text-4xl font-bold text-center text-indigo-600 dark:text-indigo-400 mb-3"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        Experience
      </motion.h2>
      <motion.p
        className="text-center text-gray-500 dark:text-gray-400 text-sm mb-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
      >
        Education, work, and milestones — the journey so far.
      </motion.p>

      {/* Timeline legend */}
      <motion.div
        className="flex flex-wrap justify-center gap-4 mb-12 text-xs"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.25 }}
        viewport={{ once: true }}
      >
        {Object.entries(TYPE_CONFIG).map(([type, { dot, label }]) => (
          <span key={type} className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
            <span className={`w-2.5 h-2.5 rounded-full border-2 ${dot}`} />
            {label}
          </span>
        ))}
      </motion.div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line — desktop center, mobile left */}
        <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500 via-violet-400 to-emerald-400 opacity-30" />

        <div className="space-y-8">
          {TIMELINE.map((entry, idx) => (
            <TimelineEntry key={idx} entry={entry} index={idx} />
          ))}
        </div>
      </div>
    </Container>
  </section>
);

export default Experience;
