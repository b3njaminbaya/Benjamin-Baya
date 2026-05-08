import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';
import { Menu, X, Sun, Moon, User, Briefcase, Code, Folder, Mail, FileText } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const NAV_LINKS = [
  { to: 'about',      label: 'About',      icon: User },
  { to: 'experience', label: 'Experience', icon: Briefcase },
  { to: 'skills',     label: 'Skills',     icon: Code },
  { to: 'projects',   label: 'Projects',   icon: Folder },
  { to: 'contact',    label: 'Contact',    icon: Mail },
];

const SECTIONS = NAV_LINKS.map(l => l.to);

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();
  const [visible, setVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const drawerRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.75);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observers = [];
    const callback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    };
    const options = { rootMargin: '-30% 0px -60% 0px', threshold: 0 };
    SECTIONS.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(callback, options);
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const focusable = drawerRef.current?.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
    if (focusable?.length) focusable[0].focus();
    const onKeyDown = (e) => {
      if (e.key === 'Escape') { setMenuOpen(false); return; }
      if (e.key !== 'Tab' || !focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  const linkClass = (to) =>
    `flex items-center gap-1 text-sm font-medium cursor-pointer transition-colors ${
      activeSection === to
        ? 'text-indigo-600 dark:text-indigo-400'
        : 'text-gray-600 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-400'
    }`;

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.header
            key="navbar"
            className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 shadow-sm"
            initial={{ y: -64, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -64, opacity: 0 }}
            transition={{ duration: 0.25 }}
            role="banner"
          >
            <div className="max-w-7xl mx-auto px-6 w-full h-14 flex items-center justify-between">
              <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-pink-500">
                Benjamin Baya
              </span>

              <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
                {NAV_LINKS.map(({ to, label, icon: Icon }) => (
                  <Link
                    key={to}
                    to={to}
                    smooth
                    duration={500}
                    offset={-56}
                    className={linkClass(to)}
                    aria-current={activeSection === to ? 'location' : undefined}
                  >
                    <Icon size={14} />
                    {label}
                  </Link>
                ))}
                <RouterLink
                  to="/resume"
                  className="flex items-center gap-1 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-400"
                >
                  <FileText size={14} /> Resume
                </RouterLink>
              </nav>

              <div className="flex items-center gap-2">
                <button
                  onClick={toggleTheme}
                  aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                  className="p-1.5 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  {isDark ? <Sun size={18} /> : <Moon size={18} />}
                </button>
                <button
                  className="md:hidden p-1.5 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  onClick={() => setMenuOpen(o => !o)}
                  aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                  aria-expanded={menuOpen}
                  aria-controls="mobile-drawer"
                >
                  {menuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
              </div>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {menuOpen && visible && (
          <motion.div
            key="backdrop"
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {menuOpen && visible && (
          <motion.nav
            key="drawer"
            id="mobile-drawer"
            ref={drawerRef}
            role="dialog"
            aria-label="Mobile navigation"
            aria-modal="true"
            className="fixed top-14 right-0 bottom-0 w-64 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700 z-50 p-6 flex flex-col gap-1"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.25 }}
          >
            {NAV_LINKS.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                smooth
                duration={500}
                offset={-56}
                className={`flex items-center gap-2 text-base font-medium cursor-pointer py-2 transition-colors ${
                  activeSection === to
                    ? 'text-indigo-600 dark:text-indigo-400'
                    : 'text-gray-700 dark:text-gray-200 hover:text-indigo-500'
                }`}
                onClick={() => setMenuOpen(false)}
                aria-current={activeSection === to ? 'location' : undefined}
              >
                <Icon size={18} /> {label}
              </Link>
            ))}
            <RouterLink
              to="/resume"
              className="flex items-center gap-2 text-base font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-500 py-2"
              onClick={() => setMenuOpen(false)}
            >
              <FileText size={18} /> Resume
            </RouterLink>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
