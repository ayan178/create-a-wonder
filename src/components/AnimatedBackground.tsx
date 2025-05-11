
import React from 'react';
import { useTheme } from "@/components/ThemeProvider";
import { motion } from "framer-motion";
import ThreeBackground from './ThreeBackground';

interface AnimatedBackgroundProps {
  intensity?: 'light' | 'medium' | 'heavy' | 'extreme';
  children?: React.ReactNode;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ 
  intensity = 'medium',
  children 
}) => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  
  // Configure particles and effects based on intensity
  const particleCount = {
    light: 15,
    medium: 25,
    heavy: 40,
    extreme: 60
  }[intensity];
  
  const floatingElementsCount = {
    light: 5,
    medium: 8,
    heavy: 12,
    extreme: 20
  }[intensity];

  return (
    <div className="w-full h-full">
      {/* Three.js animated background */}
      <ThreeBackground isDarkMode={isDarkMode} />
      
      {/* Mercor-style grid background */}
      <div className="absolute inset-0 mercor-grid pointer-events-none"></div>
      
      {/* Animated floating elements - Mercor style */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Animated Floating Elements */}
        {[...Array(particleCount)].map((_, i) => (
          <motion.div
            key={`floating-element-${i}`}
            className="absolute rounded-full mercor-blur-sphere"
            style={{
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: isDarkMode
                ? 'radial-gradient(circle at center, rgba(255,255,255,0.4), rgba(255,255,255,0))'
                : 'radial-gradient(circle at center, rgba(79,70,229,0.4), rgba(79,70,229,0))',
              filter: 'blur(70px)',
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              scale: [1, Math.random() * 0.5 + 0.8],
              opacity: isDarkMode ? [0.15, 0.3, 0.15] : [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: Math.random() * 20 + 20,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
          />
        ))}
        
        {/* Add subtle particle effect */}
        {[...Array(particleCount * 2)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              background: isDarkMode ? 'rgba(255,255,255,0.6)' : 'rgba(79,70,229,0.6)',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -(Math.random() * 100 + 50)],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}
        
        {/* Mercor-style floating tech elements */}
        {(intensity === 'heavy' || intensity === 'extreme') && [...Array(floatingElementsCount)].map((_, i) => (
          <motion.div
            key={`tech-${i}`}
            className="absolute"
            style={{
              left: `${Math.random() * 80 + 10}%`,
              top: `${Math.random() * 80 + 10}%`,
              transform: `rotate(${Math.random() * 45 - 22.5}deg)`,
              zIndex: 1,
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ 
              opacity: [0.4, 0.8, 0.4],
              y: [0, -30, 0],
              rotate: [0, 10, 0]
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          >
            <div className={`w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-xl
              ${isDarkMode ? 'bg-white/5' : 'bg-white/40 shadow-lg'} backdrop-blur-lg border border-white/30`}>
              <div className={`text-2xl md:text-3xl ${isDarkMode ? 'text-white/70' : 'text-brand-primary'}`}>
                {['AI', 'ML', '</>',  'UX', '{ }', '01', '++', '##', '&lt;&gt;', 'API', 'UI', 'UX'][i % 12]}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Content */}
      {children}
    </div>
  );
};

export default AnimatedBackground;
