
import React from 'react';
import { motion } from "framer-motion";

interface LightFlaresProps {
  isDarkMode: boolean;
  intensity: 'light' | 'medium' | 'heavy' | 'extreme';
}

const LightFlares: React.FC<LightFlaresProps> = ({ isDarkMode, intensity }) => {
  // Only show light flares for heavy and extreme intensities
  if (intensity !== 'heavy' && intensity !== 'extreme') return null;
  
  // Reduced number of flares
  return (
    <>
      {/* Light flares */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`flare-${i}`}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 250 + 150,
            height: Math.random() * 250 + 150,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: isDarkMode
              ? `radial-gradient(circle at center, rgba(${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(Math.random() * 100 + 155)}, 255, 0.1), rgba(255,255,255,0))`
              : `radial-gradient(circle at center, rgba(${Math.floor(Math.random() * 50)}, ${Math.floor(Math.random() * 50)}, 229, 0.08), rgba(79,70,229,0))`,
            filter: 'blur(60px)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: Math.random() * 15 + 20, // Slower animations
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
};

export default LightFlares;
