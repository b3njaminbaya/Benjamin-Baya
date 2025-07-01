import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram, Facebook, Youtube } from 'lucide-react';
import { SiTiktok } from 'react-icons/si';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { Link } from 'react-scroll';

const styles = `
@keyframes neon-border {
  0% { box-shadow: 0 0 5px #8b5cf6, 0 0 10px #8b5cf6, 0 0 20px #8b5cf6; }
  50% { box-shadow: 0 0 15px #8b5cf6, 0 0 30px #8b5cf6, 0 0 45px #8b5cf6; }
  100% { box-shadow: 0 0 5px #8b5cf6, 0 0 10px #8b5cf6, 0 0 20px #8b5cf6; }
}
@keyframes flip-flop {
  0%, 100% { transform: rotateX(0deg); }
  50% { transform: rotateX(30deg); }
}
.neon-flip {
  animation: neon-border 2s infinite ease-in-out, flip-flop 3s infinite ease-in-out;
  transform-style: preserve-3d;
  backface-visibility: hidden;
}
`;
if (typeof window !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}

const AnimatedPanel = ({ label, to, external, index }) => {
  return (
    <motion.div
      initial={{ y: 150, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: index * 0.4, duration: 0.6, ease: 'easeOut' }}
      className="w-full h-20 rounded-xl shadow-md cursor-pointer text-sm font-semibold
                 relative overflow-hidden group transform transition-transform duration-300
                 hover:scale-105 hover:shadow-xl neon-flip"
    >
      <div className="absolute inset-0 border-2 border-indigo-500 rounded-xl z-0"></div>
      {external ? (
        <a
          href={to}
          target="_blank"
          rel="noopener noreferrer"
          className="relative z-10 w-full h-full flex items-center justify-center text-white"
        >
          {label}
        </a>
      ) : (
        <Link
          to={to}
          smooth
          duration={500}
          className="relative z-10 w-full h-full flex items-center justify-center text-white"
        >
          {label}
        </Link>
      )}
    </motion.div>
  );
};

const InteractiveShowcase = () => {
  const panels = [
    { label: 'Projects', to: 'projects' },
    { label: 'Contact Me', to: 'contact' },
    { label: 'Resume', to: '/resume.pdf', external: true },
    { label: 'Skills', to: 'skills' },
  ];

  return (
    <motion.section
      className="w-full h-[300px] sm:h-[400px] md:h-[400px] bg-gray-900 text-white flex flex-col items-center justify-end relative overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 1 }}
    >
      {/* 🌌 Star background */}
      <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
        <Stars radius={100} depth={80} count={8000} factor={6} saturation={0} fade speed={2} />
      </Canvas>

      {/* 📦 Panels */}
      <div className="absolute bottom-10 px-6 w-full max-w-5xl grid grid-cols-2 sm:grid-cols-4 gap-4 perspective-[800px]">
        {panels.map((panel, index) => (
          <AnimatedPanel
            key={index}
            label={panel.label}
            to={panel.to}
            external={panel.external}
            index={index}
          />
        ))}
      </div>
    </motion.section>
  );
};

const socialLinks = [
  { href: 'https://github.com/benjaminmweribaya', icon: <Github size={18} />, label: 'GitHub' },
  { href: 'https://linkedin.com/in/benjamin-mweri-baya', icon: <Linkedin size={18} />, label: 'LinkedIn' },
  { href: 'https://instagram.com/benjaminmweribaya', icon: <Instagram size={18} />, label: 'Instagram' },
  { href: 'https://facebook.com/benjaminmweribaya', icon: <Facebook size={18} />, label: 'Facebook' },
  { href: 'https://www.tiktok.com/@benjaminmweribaya', icon: <SiTiktok size={18} />, label: 'TikTok' },
  { href: 'https://www.youtube.com/@benjaminmweribaya', icon: <Youtube size={18} />, label: 'YouTube' },
];

const Footer = () => {
  return (
    <footer id="footer" className="bg-gray-900 text-gray-300 pt-0 mt-10">
      <InteractiveShowcase />

      <motion.div
        className="container mx-auto px-4 text-center py-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h3 className="text-lg font-semibold mb-4">Let’s Connect</h3>
        <div className="flex justify-center flex-wrap gap-4 mb-6">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-gray-300 hover:text-indigo-400 transition-colors"
            >
              {link.icon}
              {link.label}
            </a>
          ))}
        </div>
        <p className="text-sm text-gray-500">
          © 2025 <span className="text-indigo-400 font-semibold">Benjamin Mweri Baya</span>. All rights reserved.
        </p>
      </motion.div>
    </footer>
  );
};

export default Footer;





