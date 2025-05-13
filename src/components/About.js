import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import profile from '../assets/profile.png';

const paragraphData = [
  "I'm Benjamin Mweri Baya, a Full-Stack Software Developer with a strong engineering background and a deep passion for building scalable, cloud-ready web applications.",
  "With a Bachelor of Engineering in Chemical Engineering from the Technical University of Kenya and a professional certification in Full-Stack Website Development from Moringa School, I bridge logic and creativity to craft impactful digital experiences that solve real-world challenges.",
  "I'm the Founder and CEO of Tevexa Technologies Limited — a software company specializing in the development and management of modern websites and mobile applications. Read more about our work at www.tevexa.com.",
  "Whether I’m designing sleek user interfaces with React and Tailwind CSS or building robust backends with Flask and Node.js, I focus on clean code, collaborative development, and delivering smart, sustainable tech solutions. I’m especially passionate about innovation in climate tech, community impact, and responsible software engineering.",
];

const About = () => {
  return (
    <section id="about" className="py-16 bg-white text-gray-800">
      <div className="container mx-auto px-4 text-center max-w-7xl">
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

        {/* Profile Image */}
        <motion.div
          className="mb-10 flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <img
            src={profile}
            alt="Benjamin Mweri Baya"
            className="rounded-full w-40 h-40 object-contain border-4 border-indigo-500 shadow-xl"
          />
        </motion.div>

        {/* Paragraph Cards */}
        <div className="grid gap-6 text-left">
          {paragraphData.map((text, index) => (
            <motion.div
              key={index}
              className=" bg-indigo-50 hover:bg-indigo-100 transition-colors border border-indigo-200 rounded-xl p-6 shadow-md flex items-start gap-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
            >
              <CheckCircle className="text-indigo-500 shrink-0 mt-1" size={20} />
              <p className="text-lg text-gray-700">
                {text.includes('Tevexa') ? (
                  <>
                    I'm the <span className="font-semibold">Founder and CEO of{' '}
                      <a
                        href="https://www.tevexa.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:underline"
                      >
                        Tevexa Technologies Limited
                      </a></span> — a software company specializing in the development and management of modern websites and mobile applications. Read more about our work at{' '}
                    <a
                      href="https://www.tevexa.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:underline"
                    >
                      www.tevexa.com
                    </a>.
                  </>
                ) : (
                  text
                )}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Quote */}
        <motion.p
          className="mt-8 text-md text-gray-600 italic"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          "I don’t just build software—I engineer smart solutions for a better future."
        </motion.p>
      </div>
    </section>
  );
};

export default About;


