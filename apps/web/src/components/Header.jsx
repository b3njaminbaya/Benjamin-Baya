import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink, CalendarDays } from 'lucide-react';
import { Link } from 'react-scroll';

const Header = () => (
  <header className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-gray-950 text-white">
    {/* Background: gradient glows + subtle grid */}
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <div className="absolute top-[-10%] left-[25%] w-[600px] h-[600px] bg-indigo-600/25 rounded-full blur-[140px]" />
      <div className="absolute bottom-[-5%] right-[20%] w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[120px]" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
    </div>

    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9 }}
      className="w-full max-w-7xl mx-auto px-6 flex flex-col items-center text-center z-10 relative"
    >
      {/* Status badges */}
      <motion.div
        className="flex flex-wrap items-center justify-center gap-3 mb-8"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <span className="flex items-center gap-1.5 bg-indigo-600/70 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full border border-indigo-500/30">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          Open to work
        </span>
        <span className="text-gray-400 text-xs font-medium tracking-wide">
          Founder & CEO ·{' '}
          <a
            href="https://www.teevexa.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            Teevexa
          </a>
        </span>
      </motion.div>

      {/* Headline */}
      <motion.h1
        className="text-5xl md:text-7xl font-extrabold mb-5 tracking-tight leading-tight"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15 }}
      >
        Hi, I'm{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-pink-400">
          Benjamin
        </span>
      </motion.h1>

      {/* Sub-headline */}
      <motion.p
        className="text-xl md:text-2xl font-semibold text-indigo-300 mb-5"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        I build digital products that scale.
      </motion.p>

      {/* Value proposition */}
      <motion.p
        className="max-w-2xl text-base md:text-lg text-gray-400 mb-10 leading-relaxed"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.45 }}
      >
        From custom websites and web applications to mobile apps and SaaS platforms —
        I help startups, businesses, and founders design, build, and ship modern software.
        Individually, or through{' '}
        <a
          href="https://www.teevexa.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-400 hover:text-indigo-300 transition-colors font-medium"
        >
          Teevexa
        </a>.
      </motion.p>

      {/* CTAs */}
      <motion.div
        className="flex flex-col sm:flex-row gap-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <Link
          to="projects"
          smooth
          duration={500}
          offset={-56}
          className="inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-7 py-3.5 rounded-lg cursor-pointer transition-all"
        >
          <ArrowRight className="mr-2" size={18} /> View My Work
        </Link>
        <a
          href="https://www.teevexa.com/start-project"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold px-7 py-3.5 rounded-lg transition-all border border-white/20"
        >
          <ExternalLink className="mr-2" size={18} /> Start a Project
        </a>
      </motion.div>

      {/* Tertiary CTA — consultation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.85 }}
      >
        <a
          href="https://www.teevexa.com/book-consultation"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-emerald-400 transition-colors mt-4"
        >
          <CalendarDays size={15} />
          Not sure where to start? Book a free consultation
        </a>
      </motion.div>
    </motion.section>
  </header>
);

export default Header;
