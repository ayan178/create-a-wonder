
import React from 'react';
import { motion } from "framer-motion";

interface GeometricShapesProps {
  isDarkMode: boolean;
  intensity: 'light' | 'medium' | 'heavy' | 'extreme';
}

const GeometricShapes: React.FC<GeometricShapesProps> = ({ isDarkMode, intensity }) => {
  // Now render for both 'heavy' and 'extreme' intensities
  if (intensity !== 'heavy' && intensity !== 'extreme') return null;
  
  return (
    <>
      {/* Moving geometric shapes */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`geo-shape-${i}`}
          className="absolute"
          style={{
            width: Math.random() * 150 + 50,
            height: Math.random() * 150 + 50,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: 0.15,
            zIndex: -1,
            borderRadius: Math.random() > 0.5 ? '50%' : Math.random() > 0.5 ? '30%' : '0%',
            background: isDarkMode 
              ? `rgba(${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(Math.random() * 100 + 155)}, 255, 0.1)` 
              : `rgba(${Math.floor(Math.random() * 100)}, ${Math.floor(Math.random() * 100)}, 255, 0.08)`,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
            rotate: [0, Math.random() * 180, 0],
            scale: [1, Math.random() * 0.5 + 1, 1],
          }}
          transition={{
            duration: Math.random() * 20 + 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
};

export default GeometricShapes;
