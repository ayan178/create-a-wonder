
import React from 'react';
import { motion } from "framer-motion";

interface TechElementsProps {
  isDarkMode: boolean;
  intensity: 'light' | 'medium' | 'heavy' | 'extreme';
}

const TechElements: React.FC<TechElementsProps> = ({ isDarkMode, intensity }) => {
  if (intensity !== 'heavy' && intensity !== 'extreme') return null;
  
  const floatingElementsCount = {
    light: 5,
    medium: 10,
    heavy: 15,
    extreme: 25
  }[intensity];
  
  const icons = ['AI', 'ML', '</>',  'UX', '{ }', '01', '++', '##', '&lt;&gt;', 'API', 'UI', '🤖', '🔍', '📊', '⚙️', '🚀'];
  
  return (
    <>
      {/* Tech-themed floating elements */}
      {[...Array(floatingElementsCount)].map((_, i) => {
        const size = Math.random() * 30 + 30;
        return (
          <motion.div
            key={`tech-element-${i}`}
            className="absolute z-0"
            style={{
              left: `${Math.random() * 95 + 2}%`,
              top: `${Math.random() * 90 + 5}%`,
              perspective: '500px',
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ 
              opacity: [0.4, 0.8, 0.4],
              y: [0, -30, 0],
              rotateX: [0, Math.random() * 40 - 20],
              rotateY: [0, Math.random() * 40 - 20],
              rotateZ: [0, Math.random() * 20 - 10],
            }}
            transition={{
              duration: Math.random() * 20 + 15,
              repeat: Infinity,
              delay: Math.random() * 10
            }}
          >
            <div 
              style={{ width: `${size}px`, height: `${size}px` }}
              className={`flex items-center justify-center rounded-xl
                ${isDarkMode ? 'bg-white/5' : 'bg-white/40 shadow-lg'} backdrop-blur-lg border border-white/30`}
            >
              <div className={`text-xs ${isDarkMode ? 'text-white/70' : 'text-brand-primary'}`}>
                {icons[i % icons.length]}
              </div>
            </div>
          </motion.div>
        );
      })}
    </>
  );
};

export default TechElements;
