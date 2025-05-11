
import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";

interface HeroIllustrationProps {
  itemVariants: any;
}

const HeroIllustration: React.FC<HeroIllustrationProps> = ({ itemVariants }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  return (
    <motion.div 
      variants={itemVariants} 
      className="relative md:mt-0 hidden lg:block"
    >
      <div className="relative pt-10">
        {/* Main illustration frame */}
        <div className={`w-full aspect-[4/3] relative z-10 rounded-xl overflow-hidden border-2 ${
          isDark ? "border-gray-800 bg-gray-900/50" : "border-gray-200 bg-white/50"
        } backdrop-blur-sm shadow-2xl`}>
          {/* Interface elements */}
          <div className="absolute top-0 left-0 right-0 p-2 h-8 flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          
          <div className={`absolute top-8 left-0 right-0 h-10 ${
            isDark ? "bg-gray-800/50" : "bg-gray-100/50"
          } flex items-center px-4`}>
            <div className={`w-40 h-4 rounded ${
              isDark ? "bg-gray-700" : "bg-gray-200"
            }`}></div>
            <div className="flex-1"></div>
            <div className={`w-8 h-4 rounded ${
              isDark ? "bg-gray-700" : "bg-gray-200"
            }`}></div>
          </div>
          
          <div className="absolute top-20 left-4 right-4 bottom-4 flex">
            {/* AI Avatar side */}
            <div className={`w-1/2 p-2 ${
              isDark ? "bg-gray-800/30" : "bg-gray-50/30"
            } rounded-lg m-2 flex flex-col items-center justify-center`}>
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary mb-4">
                <div className="w-full h-full bg-primary/30"></div>
              </div>
              <div className={`w-16 h-3 rounded ${
                isDark ? "bg-gray-700" : "bg-gray-200"
              } mb-2`}></div>
              <div className={`w-24 h-2 rounded ${
                isDark ? "bg-gray-700" : "bg-gray-200"
              }`}></div>
              <div className="mt-6 w-32 h-8 rounded bg-primary/70"></div>
            </div>
            
            {/* User side */}
            <div className={`w-1/2 p-2 ${
              isDark ? "bg-gray-800/30" : "bg-gray-50/30"
            } rounded-lg m-2 flex flex-col justify-between`}>
              {/* Video feed */}
              <div className={`flex-1 mb-2 ${
                isDark ? "bg-gray-900" : "bg-gray-200"
              } rounded relative overflow-hidden`}>
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
                  <div className="w-6 h-6 rounded-full bg-primary/70"></div>
                  <div className="w-6 h-6 rounded-full bg-primary/70"></div>
                </div>
              </div>
              
              {/* Transcript */}
              <div className={`h-1/3 ${
                isDark ? "bg-gray-900" : "bg-gray-200"
              } rounded p-2`}>
                <div className={`w-full h-3 rounded mb-2 ${
                  isDark ? "bg-gray-800" : "bg-gray-300"
                }`}></div>
                <div className={`w-3/4 h-3 rounded mb-2 ${
                  isDark ? "bg-gray-800" : "bg-gray-300"
                }`}></div>
                <div className={`w-1/2 h-3 rounded ${
                  isDark ? "bg-gray-800" : "bg-gray-300"
                }`}></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <motion.div
          className="absolute top-6 left-0 w-12 h-12 rounded-full bg-primary/30 blur-md z-0"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 0.3, 0.7],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        
        <motion.div
          className="absolute bottom-6 right-10 w-10 h-10 rounded-full bg-blue-500/30 blur-md z-0"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.5, 0.2, 0.5],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>
      
      {/* Regular style tag without the jsx property */}
      <style>
        {`
          .glow {
            box-shadow: 0 0 40px 5px rgba(149, 128, 255, 0.3);
          }
          
          .element-fade {
            animation: elementFade 8s infinite alternate;
          }
          
          @keyframes elementFade {
            0% { opacity: 0.3; }
            50% { opacity: 0.7; }
            100% { opacity: 0.3; }
          }
        `}
      </style>
    </motion.div>
  );
};

export default HeroIllustration;
