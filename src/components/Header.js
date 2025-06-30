import { useState, useEffect, Suspense, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import {
  ArrowRight, Mail, Menu, X, User, Code, FileText, Folder
} from 'lucide-react';
import { Link } from 'react-scroll';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';

const ResponsiveShapes = () => {
  const { size } = useThree();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(size.width < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [size.width]);

  return (
    <group position={isMobile ? [0, 1.5, 0] : [-2.5, 0, 0]}>
      <FloatingCube />
    </group>
  );
};

const FloatingCube = () => {
  const cubeRef = useRef();
  useFrame(({ clock }) => {
    const a = clock.getElapsedTime();
    cubeRef.current.rotation.x = a;
    cubeRef.current.rotation.y = a;
    cubeRef.current.position.y = Math.sin(a) * 0.5;
  });

  return (
    <mesh ref={cubeRef} scale={[3, 3, 3]}>
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshStandardMaterial
        color={'#6366f1'}
        metalness={0.7}
        roughness={0.1}
        emissive={'#4f46e5'}
        emissiveIntensity={0.6}
      />
    </mesh>
  );
};

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="relative bg-gray-900 text-white min-h-screen flex flex-col justify-between overflow-hidden">
      {/* 3D Canvas */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 8] }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[2, 5, 5]} intensity={1.2} />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
          <Suspense fallback={null}>
            <ResponsiveShapes />
          </Suspense>
        </Canvas>
      </div>

      {/* Navbar */}
      <div className="container mx-auto px-4 py-4 flex justify-between items-center z-50 relative">
        <h1 className="text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-pink-400 to-yellow-400">
          Benjamin Mweri Baya
        </h1>
        <button className="block md:hidden text-white focus:outline-none" onClick={toggleMenu}>
          <Menu size={24} />
        </button>
        <nav className="hidden md:flex space-x-6 items-center">
          <Link to="about" smooth duration={500} className="flex items-center gap-1 hover:text-gray-400 cursor-pointer">
            <User size={16} /> About
          </Link>
          <Link to="skills" smooth duration={500} className="flex items-center gap-1 hover:text-gray-400 cursor-pointer">
            <Code size={16} /> Skills
          </Link>
          <Link to="projects" smooth duration={500} className="flex items-center gap-1 hover:text-gray-400 cursor-pointer">
            <Folder size={16} /> Projects
          </Link>
          <Link to="contact" smooth duration={500} className="flex items-center gap-1 hover:text-gray-400 cursor-pointer">
            <Mail size={16} /> Contact Me
          </Link>
          <Link to="footer" smooth duration={500} className="flex items-center gap-1 hover:text-gray-400 cursor-pointer">
            <ArrowRight size={16} /> Connect
          </Link>
        </nav>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div className="fixed inset-0 bg-black bg-opacity-50 z-40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={toggleMenu} />
            <motion.div className="fixed top-0 right-0 h-full w-64 bg-gray-800 text-white p-6 z-50 shadow-lg" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'tween', duration: 0.3 }}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold">Menu</h2>
                <button onClick={toggleMenu}><X size={24} /></button>
              </div>
              <ul className="space-y-4 text-base">
                <li><Link to="about" smooth duration={500} className="flex items-center gap-2 hover:text-indigo-400 cursor-pointer" onClick={toggleMenu}><User size={18} /> About</Link></li>
                <li><Link to="skills" smooth duration={500} className="flex items-center gap-2 hover:text-indigo-400 cursor-pointer" onClick={toggleMenu}><Code size={18} /> Skills</Link></li>
                <li><Link to="projects" smooth duration={500} className="flex items-center gap-2 hover:text-indigo-400 cursor-pointer" onClick={toggleMenu}><Folder size={18} /> Projects</Link></li>
                <li><Link to="contact" smooth duration={500} className="flex items-center gap-2 hover:text-indigo-400 cursor-pointer" onClick={toggleMenu}><Mail size={18} /> Contact Me</Link></li>
                <li><Link to="footer" smooth duration={500} className="flex items-center gap-2 hover:text-indigo-400 cursor-pointer" onClick={toggleMenu}><ArrowRight size={18} /> Connect</Link></li>
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <motion.section initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="flex flex-col items-center text-center mt-20 px-6 z-10 relative">
        <motion.div className="bg-indigo-600 text-white text-sm px-4 py-1 rounded-full mb-6" animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }}>
          👋 Welcome to my portfolio
        </motion.div>
        <motion.h2 className="text-4xl md:text-6xl font-extrabold mb-4" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 4 }}>
          Hello, I’m <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-pink-400 to-yellow-400">Benjamin</span>
        </motion.h2>
        <h3 className="text-xl md:text-3xl font-medium text-gray-400 mb-6">
          <Typewriter options={{
            strings: [
              'Full-Stack Software Engineer',
              'Flask & React Specialist',
              'Cloud-Ready App Builder',
              'UI/UX Designer',
            ],
            autoStart: true,
            loop: true,
            delay: 75,
          }} />
        </h3>
        <p className="max-w-2xl text-lg text-gray-300 mb-8">
          I build scalable, cloud-ready, and user-focused applications with modern technologies that solve real-world problems.
        </p>
        <motion.div className="flex flex-col sm:flex-row gap-4 whitespace-nowrap overflow-x-auto scrollbar-hide" animate={{ x: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 10, ease: 'linear' }}>
          <Link to="projects" smooth duration={500} className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg cursor-pointer transition-all">
            <ArrowRight className="mr-2" size={18} /> Projects
          </Link>
          <Link to="contact" smooth duration={500} className="inline-flex items-center bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold px-6 py-3 rounded-lg cursor-pointer transition-all">
            <Mail className="mr-2" size={18} /> Contact Me
          </Link>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg transition-all">
            <FileText className="mr-2" size={18} /> Resume
          </a>
        </motion.div>
      </motion.section>
    </header>
  );
};

export default Header;



