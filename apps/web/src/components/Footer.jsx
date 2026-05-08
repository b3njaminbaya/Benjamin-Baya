import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram, Facebook, Youtube, ExternalLink } from 'lucide-react';
import { SiTiktok } from 'react-icons/si';
import { Link } from 'react-scroll';

const panels = [
  { label: 'Projects',    to: 'projects' },
  { label: 'Contact Me',  to: 'contact' },
  { label: 'Resume',      to: '/resume.pdf', external: true },
  { label: 'Skills',      to: 'skills' },
];

const AnimatedPanel = ({ label, to, external, index }) => (
  <motion.div
    initial={{ y: 60, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.08, duration: 0.5, ease: 'easeOut' }}
    whileHover={{ scale: 1.04 }}
    className="w-full h-16 rounded-xl border border-indigo-500/50 bg-white/5 backdrop-blur-sm cursor-pointer text-sm font-semibold overflow-hidden hover:border-indigo-400 hover:bg-indigo-500/10 transition-all"
  >
    {external ? (
      <a
        href={to}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full h-full flex items-center justify-center text-white"
      >
        {label}
      </a>
    ) : (
      <Link
        to={to}
        smooth
        duration={500}
        offset={-56}
        className="w-full h-full flex items-center justify-center text-white"
      >
        {label}
      </Link>
    )}
  </motion.div>
);

const socialLinks = [
  { href: 'https://github.com/benjaminmweribaya',         icon: <Github size={18} />,   label: 'GitHub' },
  { href: 'https://linkedin.com/in/benjamin-mweri-baya',  icon: <Linkedin size={18} />, label: 'LinkedIn' },
  { href: 'https://instagram.com/benjaminmweribaya',      icon: <Instagram size={18} />,label: 'Instagram' },
  { href: 'https://facebook.com/benjaminmweribaya',       icon: <Facebook size={18} />, label: 'Facebook' },
  { href: 'https://www.tiktok.com/@benjaminmweribaya',    icon: <SiTiktok size={18} />, label: 'TikTok' },
  { href: 'https://www.youtube.com/@benjaminmweribaya',   icon: <Youtube size={18} />,  label: 'YouTube' },
];

const Footer = () => (
  <footer id="footer" className="bg-gray-950 text-gray-300">
    {/* Interactive showcase — CSS gradient background replacing Three.js */}
    <div className="relative w-full py-16 overflow-hidden">
      {/* Gradient glows */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-[-20%] left-[10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[10%] w-[400px] h-[400px] bg-violet-600/15 rounded-full blur-[100px]" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.p
          className="text-center text-xs font-medium tracking-widest text-indigo-400 uppercase mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Quick Links
        </motion.p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {panels.map((panel, index) => (
            <AnimatedPanel
              key={panel.label}
              label={panel.label}
              to={panel.to}
              external={panel.external}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>

    {/* Bottom bar */}
    <motion.div
      className="max-w-7xl mx-auto px-6 w-full text-center py-10 border-t border-gray-800"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
    >
      {/* Teevexa link */}
      <a
        href="https://www.teevexa.com"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-sm text-indigo-400 hover:text-indigo-300 font-medium transition-colors mb-5"
      >
        <ExternalLink size={13} />
        Teevexa — Product Development Studio
      </a>

      <h3 className="text-base font-semibold mb-4">Let's Connect</h3>
      <div className="flex justify-center flex-wrap gap-4 mb-6">
        {socialLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-indigo-400 transition-colors"
          >
            {link.icon}
            {link.label}
          </a>
        ))}
      </div>
      <p className="text-sm text-gray-500">
        © {new Date().getFullYear()}{' '}
        <span className="text-indigo-400 font-semibold">Benjamin Mweri Baya</span>. All rights reserved.
      </p>
    </motion.div>
  </footer>
);

export default Footer;
