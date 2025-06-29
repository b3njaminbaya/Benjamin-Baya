import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import profile from '../assets/profile.png';

// Quotes for rotation
const quotes = [
  "I don’t just build software — I engineer smart solutions for a better future.",
  "Code is my language, innovation is my mission.",
  "I create not just for function — but for impact.",
  "From logic to creativity — I build with intention.",
];

const paragraphData = [
  "I'm Benjamin Mweri Baya, a Full-Stack Software Developer with a strong engineering background and a deep passion for building scalable, cloud-ready web applications.",
  "With a Bachelor of Engineering in Chemical Engineering from the Technical University of Kenya and a professional certification in Full-Stack Website Development from Moringa School, I bridge logic and creativity to craft impactful digital experiences that solve real-world challenges.",
];

const blobColors = [
  ['bg-indigo-200', 'bg-purple-200', 'bg-pink-200', 'bg-blue-100'],
  ['bg-yellow-100', 'bg-green-200', 'bg-teal-200', 'bg-rose-100'],
  ['bg-pink-300', 'bg-indigo-300', 'bg-blue-200', 'bg-amber-100'],
];

const About = () => {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [colorSetIndex, setColorSetIndex] = useState(0);

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 4000);

    const onScroll = () => {
      const scrollY = window.scrollY;
      const newIndex = Math.floor(scrollY / 400) % blobColors.length;
      setColorSetIndex(newIndex);
    };

    window.addEventListener('scroll', onScroll);
    return () => {
      clearInterval(quoteInterval);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const [topLeft, bottomRight, topRight, bottomLeft] = blobColors[colorSetIndex];

  return (
    <section id="about" className="py-16 bg-white text-gray-800 relative overflow-hidden">
      {/* 4 Corner Blobs */}
      <div className={`absolute -top-40 -left-40 w-[450px] h-[450px] ${topLeft} rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse z-0`} />
      <div className={`absolute -top-40 -right-40 w-[450px] h-[450px] ${topRight} rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse z-0`} />
      <div className={`absolute -bottom-40 -left-40 w-[450px] h-[450px] ${bottomLeft} rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse z-0`} />
      <div className={`absolute -bottom-40 -right-40 w-[450px] h-[450px] ${bottomRight} rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse z-0`} />

      <div className="container relative z-10 mx-auto px-4 text-center max-w-7xl">
        {/* Title */}
        <motion.h2
          className="text-4xl font-bold text-indigo-600 mb-6"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          About Me
        </motion.h2>

        {/* Rotating Quote Speech Bubble */}
        <motion.div
          className="relative mb-4 flex justify-center min-h-[100px]"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={quoteIndex}
              className="bg-indigo-100 text-gray-700 italic p-4 rounded-xl max-w-md text-md shadow-md relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="block">“{quotes[quoteIndex]}”</span>
              <div className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-4 h-4 bg-indigo-100 rotate-45 shadow-md"></div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Animated Profile Image */}
        <motion.div
          className="mb-10 flex justify-center"
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
        >
          <img
            src={profile}
            alt="Portrait of Benjamin Mweri Baya – Full-Stack Software Developer"
            className="rounded-full w-40 h-40 object-contain border-4 border-indigo-500 shadow-xl"
          />
        </motion.div>

        {/* Paragraph Cards */}
        <ul className="grid gap-6 text-left list-none">
          {paragraphData.map((text, index) => (
            <motion.li
              key={index}
              className="bg-indigo-50 hover:bg-indigo-100 transition-colors border border-indigo-200 rounded-xl p-6 shadow-md flex items-start gap-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
            >
              <CheckCircle className="text-indigo-500 shrink-0 mt-1" size={20} />
              <p className="text-lg text-gray-700">{text}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default About;




