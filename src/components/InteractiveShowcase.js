import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Stars, Float, Text } from '@react-three/drei';
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';

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

// 🟣 Floating text elements
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

const InteractiveShowcase = () => {
    return (
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
                <Stars radius={100} depth={50} count={5000} factor={4} fade speed={1} />
                <InteractiveCube />
                <FloatingSpheres />
                <FloatingText />
            </Canvas>
            <p className="text-center mt-4 text-white text-sm px-4 max-w-md">
                Click the cube to explore my work. This 3D section is powered by <strong>React Three Fiber</strong>, <strong>Drei</strong>, and a passion for great interfaces 🚀.
            </p>
        </motion.section>
    );
};

export default InteractiveShowcase;


