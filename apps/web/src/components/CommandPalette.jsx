import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { scroller } from 'react-scroll';
import { Search, User, Briefcase, Layers, Code, Folder, BarChart2, Mail, FileText, Github, Linkedin, X } from 'lucide-react';

const COMMANDS = [
  { id: 'about',      label: 'Go to About',      icon: User,     type: 'scroll', target: 'about' },
  { id: 'experience', label: 'Go to Experience', icon: Briefcase,type: 'scroll', target: 'experience' },
  { id: 'services',   label: 'Go to Services',   icon: Layers,   type: 'scroll', target: 'services' },
  { id: 'skills',     label: 'Go to Skills',     icon: Code,     type: 'scroll', target: 'skills' },
  { id: 'projects',   label: 'Go to Projects',   icon: Folder,   type: 'scroll', target: 'projects' },
  { id: 'dashboard',  label: 'Go to Dashboard',  icon: BarChart2,type: 'scroll', target: 'dashboard' },
  { id: 'contact',    label: 'Go to Contact',    icon: Mail,     type: 'scroll', target: 'contact' },
  { id: 'resume',     label: 'Open Resume',      icon: FileText, type: 'route',  href: '/resume' },
  { id: 'github',     label: 'Open GitHub',      icon: Github,   type: 'link',   href: 'https://github.com/b3njaminbaya' },
  { id: 'linkedin',   label: 'Open LinkedIn',    icon: Linkedin, type: 'link',   href: 'https://linkedin.com/in/b3njaminbaya' },
];

const CommandPalette = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [highlighted, setHighlighted] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const filtered = query.trim()
    ? COMMANDS.filter(c => c.label.toLowerCase().includes(query.toLowerCase()))
    : COMMANDS;

  const close = useCallback(() => {
    setOpen(false);
    setQuery('');
    setHighlighted(0);
  }, []);

  const execute = useCallback((cmd) => {
    close();
    if (cmd.type === 'scroll') {
      setTimeout(() => scroller.scrollTo(cmd.target, { smooth: true, duration: 500, offset: -56 }), 100);
    } else if (cmd.type === 'route') {
      navigate(cmd.href);
    } else {
      window.open(cmd.href, '_blank', 'noopener,noreferrer');
    }
  }, [close, navigate]);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(o => !o);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setHighlighted(0);
    }
  }, [open]);

  useEffect(() => { setHighlighted(0); }, [query]);

  const onKeyDown = (e) => {
    if (e.key === 'Escape') { close(); return; }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlighted(h => Math.min(h + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlighted(h => Math.max(h - 1, 0));
    } else if (e.key === 'Enter' && filtered[highlighted]) {
      execute(filtered[highlighted]);
    }
  };

  useEffect(() => {
    const el = listRef.current?.children[highlighted];
    el?.scrollIntoView({ block: 'nearest' });
  }, [highlighted]);

  return (
    <>
      {/* Keyboard hint — shown in Navbar area via portal-like fixed positioning */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-start justify-center pt-[15vh] px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

            {/* Palette panel */}
            <motion.div
              className="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
              initial={{ opacity: 0, scale: 0.96, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ duration: 0.15 }}
              onClick={e => e.stopPropagation()}
            >
              {/* Search input */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                <Search size={16} className="text-gray-400 shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder="Type a command…"
                  className="flex-1 bg-transparent text-gray-800 dark:text-gray-100 placeholder-gray-400 outline-none text-sm"
                  aria-label="Command search"
                  role="combobox"
                  aria-expanded="true"
                  aria-controls="cmd-list"
                  aria-activedescendant={filtered[highlighted] ? `cmd-${filtered[highlighted].id}` : undefined}
                />
                <button onClick={close} aria-label="Close command palette">
                  <X size={16} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200" />
                </button>
              </div>

              {/* Results */}
              <ul
                id="cmd-list"
                ref={listRef}
                role="listbox"
                className="max-h-72 overflow-y-auto py-2"
              >
                {filtered.length === 0 ? (
                  <li className="px-4 py-3 text-sm text-gray-400 text-center">No results</li>
                ) : (
                  filtered.map((cmd, i) => {
                    const Icon = cmd.icon;
                    return (
                      <li
                        key={cmd.id}
                        id={`cmd-${cmd.id}`}
                        role="option"
                        aria-selected={i === highlighted}
                        onMouseEnter={() => setHighlighted(i)}
                        onClick={() => execute(cmd)}
                        className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer text-sm transition-colors ${
                          i === highlighted
                            ? 'bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                        }`}
                      >
                        <Icon size={15} className="shrink-0 text-gray-400" />
                        {cmd.label}
                        {cmd.type === 'link' && (
                          <span className="ml-auto text-xs text-gray-400">↗</span>
                        )}
                      </li>
                    );
                  })
                )}
              </ul>

              {/* Footer hint */}
              <div className="border-t border-gray-100 dark:border-gray-700 px-4 py-2 flex gap-4 text-xs text-gray-400">
                <span><kbd className="font-mono">↑↓</kbd> navigate</span>
                <span><kbd className="font-mono">↵</kbd> select</span>
                <span><kbd className="font-mono">Esc</kbd> close</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CommandPalette;
