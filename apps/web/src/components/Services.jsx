import { motion } from 'framer-motion';
import {
  Globe, Smartphone, LayoutDashboard, Server, Layers, Puzzle,
} from 'lucide-react';
import Container from './ui/Container';

const SERVICES = [
  {
    icon: Globe,
    title: 'Web Applications',
    description: 'Full-stack web apps built for speed, scale, and great UX — from landing pages to complex multi-user platforms.',
    bullets: ['React & Next.js frontends', 'REST API backends (Flask, Node.js, Laravel)', 'PostgreSQL, MySQL, MongoDB'],
    color: 'text-indigo-500',
    bg: 'bg-indigo-50 dark:bg-indigo-900/20',
    border: 'border-indigo-200 dark:border-indigo-800/50',
  },
  {
    icon: Smartphone,
    title: 'Mobile Applications',
    description: 'Cross-platform mobile apps that feel native on iOS and Android — built with Flutter or React Native.',
    bullets: ['Flutter (iOS + Android from one codebase)', 'React Native for JS-first teams', 'Firebase & Supabase backends'],
    color: 'text-blue-500',
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    border: 'border-blue-200 dark:border-blue-800/50',
  },
  {
    icon: LayoutDashboard,
    title: 'SaaS Platforms',
    description: 'Multi-tenant SaaS products with subscription management, user roles, dashboards, and the infrastructure to scale.',
    bullets: ['Authentication & role-based access', 'Subscription billing integration', 'Analytics dashboards & reporting'],
    color: 'text-violet-500',
    bg: 'bg-violet-50 dark:bg-violet-900/20',
    border: 'border-violet-200 dark:border-violet-800/50',
  },
  {
    icon: Server,
    title: 'APIs & Backend Systems',
    description: 'Robust APIs and backend services that power your product — secure, documented, and built to handle real traffic.',
    bullets: ['RESTful API design & development', 'Database architecture & optimisation', 'Third-party integrations (M-Pesa, payments, SMS)'],
    color: 'text-cyan-500',
    bg: 'bg-cyan-50 dark:bg-cyan-900/20',
    border: 'border-cyan-200 dark:border-cyan-800/50',
  },
  {
    icon: Layers,
    title: 'Business Systems',
    description: 'Internal tools, admin dashboards, and custom business software that replace spreadsheets and manual workflows.',
    bullets: ['CRM & inventory management systems', 'Admin panels & internal dashboards', 'Process automation & reporting tools'],
    color: 'text-emerald-500',
    bg: 'bg-emerald-50 dark:bg-emerald-900/20',
    border: 'border-emerald-200 dark:border-emerald-800/50',
  },
  {
    icon: Puzzle,
    title: 'End-to-End Product',
    description: 'From idea to launched product — strategy, design, development, deployment, and ongoing maintenance handled by one team.',
    bullets: ['Product architecture & technical roadmap', 'UI/UX design through to deployment', 'Post-launch support & iteration'],
    color: 'text-pink-500',
    bg: 'bg-pink-50 dark:bg-pink-900/20',
    border: 'border-pink-200 dark:border-pink-800/50',
  },
];

const Services = () => (
  <section id="services" className="py-20 bg-gray-50 dark:bg-gray-900">
    <Container>
      <motion.h2
        className="text-4xl font-bold text-center text-indigo-600 dark:text-indigo-400 mb-3"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        What I Build
      </motion.h2>
      <motion.p
        className="text-center text-gray-500 dark:text-gray-400 text-sm mb-4 max-w-xl mx-auto leading-relaxed"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
      >
        Whether you need a web app, a mobile product, or a full SaaS platform — I build it end-to-end, individually or through Teevexa.
      </motion.p>

      <motion.div
        className="flex justify-center mb-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        viewport={{ once: true }}
      >
        <a
          href="https://www.teevexa.com/book-consultation"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 font-medium underline underline-offset-4 transition-colors"
        >
          Not sure what you need? Book a free consultation →
        </a>
      </motion.div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((service, idx) => {
          const Icon = service.icon;
          return (
            <motion.div
              key={service.title}
              className={`rounded-xl border p-6 ${service.bg} ${service.border} hover:shadow-md transition-all`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.07, ease: 'easeOut' }}
              viewport={{ once: true }}
              whileHover={{ y: -3 }}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 bg-white dark:bg-gray-800 shadow-sm`}>
                <Icon size={20} className={service.color} />
              </div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">
                {service.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                {service.description}
              </p>
              <ul className="space-y-1.5">
                {service.bullets.map(bullet => (
                  <li key={bullet} className="flex items-start gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <span className={`mt-0.5 shrink-0 ${service.color}`}>✓</span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        className="mt-10 flex flex-col sm:flex-row gap-3 justify-center"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        viewport={{ once: true }}
      >
        <a
          href="https://www.teevexa.com/start-project"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors text-sm"
        >
          Start a Project
        </a>
        <a
          href="https://www.teevexa.com/book-consultation"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold px-6 py-3 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors text-sm"
        >
          Book a Free Consultation
        </a>
      </motion.div>
    </Container>
  </section>
);

export default Services;
