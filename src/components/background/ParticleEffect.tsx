
import React from 'react';
import { motion } from "framer-motion";

interface ParticleEffectProps {
  isDarkMode: boolean;
  intensity: 'light' | 'medium' | 'heavy' | 'extreme';
}

const ParticleEffect: React.FC<ParticleEffectProps> = ({ isDarkMode, intensity }) => {
  if (intensity === 'light') return null;
  
  // Reduce particle count for better performance
  const particleCount = {
    light: 0,
    medium: 15,
    heavy: 25,
    extreme: 40
  }[intensity];
  
  return (
    <>
      {[...Array(particleCount)].map((_, i) => (
        <motion.div
          key={`enhanced-particle-${i}`}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 4 + 1, // Smaller particles
            height: Math.random() * 4 + 1,
            background: isDarkMode ? 'rgba(255,255,255,0.6)' : 'rgba(79,70,229,0.6)',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            filter: 'blur(1px)',
          }}
          animate={{
            y: [0, -(Math.random() * 150 + 50)], // Less movement
            x: [0, (Math.random() * 30 - 15)],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: Math.random() * 15 + 15, // Slower animation
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 3,
          }}
        />
      ))}
    </>
  );
};

export default ParticleEffect;
