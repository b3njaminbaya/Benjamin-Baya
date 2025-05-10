import React from 'react';
import { motion } from 'framer-motion';
import {
  Github, Linkedin, Twitter, Instagram, Facebook,
   Youtube, MessageSquareText
} from 'lucide-react';
import { SiTelegram, SiTiktok } from 'react-icons/si';

const socialLinks = [
  { href: 'https://github.com/benjaminmweribaya', icon: <Github size={18} />, label: 'GitHub' },
  { href: 'https://linkedin.com/in/benjamin-mweri-baya', icon: <Linkedin size={18} />, label: 'LinkedIn' },
  { href: 'https://x.com/B3njaminBaya', icon: <Twitter size={18} />, label: 'X' },
  { href: 'https://instagram.com/benjaminmweribaya', icon: <Instagram size={18} />, label: 'Instagram' },
  { href: 'https://facebook.com/benjaminmweribaya', icon: <Facebook size={18} />, label: 'Facebook' },
  { href: 'https://t.me/benjaminmweribaya', icon: <SiTelegram size={18} />, label: 'Telegram' },
  { href: 'https://www.tiktok.com/@benjaminmweribaya', icon: <SiTiktok size={18} />, label: 'TikTok' },
  { href: 'https://www.youtube.com/@benjaminmweribaya', icon: <Youtube size={18} />, label: 'YouTube' },
  { href: 'https://wa.me/+254783797132', icon: <MessageSquareText size={18} />, label: 'WhatsApp' },
];

const Footer = () => {
  return (
    <footer id="footer" className="bg-gray-900 text-gray-300 py-10 mt-10">
      <motion.div
        className="container mx-auto px-4 text-center"
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


