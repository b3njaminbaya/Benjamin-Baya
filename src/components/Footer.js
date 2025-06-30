import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Github, Linkedin, Twitter, Instagram, Facebook,
  Youtube, MessageSquareText
} from 'lucide-react';
import { SiTelegram, SiTiktok } from 'react-icons/si';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Stars, Float, Text } from '@react-three/drei';
import { Link } from 'react-scroll';

// 🔷 Floating glowing spheres around the cube
const FloatingSpheres = () => {
  const groupRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {[...Array(6)].map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        const x = Math.cos(angle) * 3;
        const z = Math.sin(angle) * 3;
        const y = Math.sin(angle * 1.5) * 1.5;

        return (
          <mesh key={i} position={[x, y, z]}>
            <sphereGeometry args={[0.2, 32, 32]} />
            <meshStandardMaterial color="#f59e0b" emissive="#facc15" emissiveIntensity={1} />
          </mesh>
        );
      })}
    </group>
  );
};

const InteractiveCube = () => {
  const cubeRef = useRef();
  const [hoveredFace, setHoveredFace] = useState(null);
  const [rotationPaused, setRotationPaused] = useState(false);

  useFrame(() => {
    if (!rotationPaused && cubeRef.current) {
      cubeRef.current.rotation.x += 0.01;
      cubeRef.current.rotation.y += 0.01;
    }
  });

  const handlePointerEnter = (face) => {
    setHoveredFace(face);
    setRotationPaused(true);
  };

  const handlePointerLeave = () => {
    setHoveredFace(null);
    setRotationPaused(false);
  };

  const faceLinks = [
    {
      position: [0, 0, 0.76],
      rotation: [0, 0, 0],
      label: 'Projects',
      to: 'projects',
      faceIndex: 0,
    },
    {
      position: [0, 0, -0.76],
      rotation: [0, Math.PI, 0],
      label: 'Contact Me',
      to: 'contact',
      faceIndex: 1,
    },
    {
      position: [0.76, 0, 0],
      rotation: [0, Math.PI / 2, 0],
      label: 'Resume',
      to: '/resume.pdf',
      external: true,
      faceIndex: 2,
    },
    {
      position: [-0.76, 0, 0],
      rotation: [0, -Math.PI / 2, 0],
      label: 'Skills',
      to: 'skills',
      faceIndex: 3,
    },
  ];

  return (
    <group ref={cubeRef} scale={[2.5, 2.5, 2.5]}>
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      {[...Array(6)].map((_, i) => (
        <meshStandardMaterial
          key={i}
          attach={`material-${i}`}
          color="#6366f1"
          metalness={0.7}
          roughness={0.1}
          emissive="#4f46e5"
          emissiveIntensity={0.6}
        />
      ))}

      {faceLinks.map(({ position, rotation, label, to, external, faceIndex }, i) => (
        <Html key={i} position={position} rotation={rotation} transform occlude>
          <motion.div
            onHoverStart={() => handlePointerEnter(faceIndex)}
            onHoverEnd={handlePointerLeave}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            className={`block px-4 py-2 text-sm rounded shadow-md transition-all duration-200 ease-out 
              ${hoveredFace === faceIndex ? 'ring-2 ring-yellow-400 scale-105' : ''} 
              ${external ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-900'}
            `}
          >
            {external ? (
              <a href={to} target="_blank" rel="noopener noreferrer">{label}</a>
            ) : (
              <Link to={to} smooth duration={500}>{label}</Link>
            )}
          </motion.div>
        </Html>
      ))}
    </group>
  );
};

const FloatingText = () => (
  <>
    <Float speed={2} rotationIntensity={0.5} floatIntensity={2}>
      <Text
        position={[2, 1.5, -1]}
        fontSize={0.6}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        Explore
      </Text>
    </Float>
    <Float speed={1.5} rotationIntensity={1} floatIntensity={1.5}>
      <Text
        position={[-2, -1.2, -1]}
        fontSize={0.5}
        color="#facc15"
        anchorX="center"
        anchorY="middle"
      >
        React • Three.js • R3F
      </Text>
    </Float>
  </>
);

const InteractiveShowcase = () => (
  <motion.section
    className="w-full h-[600px] bg-gray-900 text-white flex flex-col items-center justify-center"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.4 }}
    transition={{ duration: 1 }}
  >
    <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <OrbitControls enableZoom={false} enablePan={false} />
      <Stars radius={100} depth={80} count={8000} factor={6} saturation={0} fade speed={2} />
      <InteractiveCube />
      <FloatingSpheres />
      <FloatingText />
    </Canvas>
    <p className="text-center mt-4 text-white text-sm px-4 max-w-7xl">
      Click the cube to explore my work. This 3D section is powered by <strong>React Three Fiber</strong>, <strong>Drei</strong>, and a passion for great interfaces 🚀.
    </p>
  </motion.section>
);

// 📦 Social footer section
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



