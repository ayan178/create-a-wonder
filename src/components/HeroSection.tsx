import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronRight, PlayCircle } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { useIsMobile } from "@/hooks/use-mobile";

const HeroSection = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { theme } = useTheme();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
        duration: 0.8
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.175, 0.885, 0.32, 1.275] }
    }
  };

  const particleCount = 30;
  const floatingElementsCount = 12;

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center z-20" ref={ref}>
      <div className={`absolute inset-0 z-10 ${
        theme === 'dark' 
          ? 'bg-gradient-to-b from-brand-primary/50 via-brand-primary/40 to-background/80'
          : 'bg-gradient-to-b from-slate-50/80 via-indigo-50/80 to-white/80'
      }`}></div>
      
      <div className={`absolute inset-0 bg-grid-pattern z-5 ${
        theme === 'dark' 
          ? 'opacity-10' 
          : 'opacity-30'
      }`}></div>
      
      {[...Array(particleCount)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${Math.random() * 150 + 50}px`,
            height: `${Math.random() * 150 + 50}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: theme === 'dark' 
              ? 'radial-gradient(circle at center, rgba(255,255,255,0.8), rgba(255,255,255,0.2))' 
              : 'radial-gradient(circle at center, rgba(79,70,229,0.5), rgba(79,70,229,0.05))',
            opacity: theme === 'dark' ? 0.25 : 0.4,
            filter: 'blur(30px)',
          }}
          animate={{
            x: [0, Math.random() * 80 - 40],
            y: [0, Math.random() * 80 - 40],
            scale: [1, Math.random() * 0.4 + 0.8],
            opacity: theme === 'dark' 
              ? [0.2, 0.35, 0.2] 
              : [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: Math.random() * 10 + 20, 
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
      ))}
      
      {[...Array(isMobile ? 4 : floatingElementsCount)].map((_, i) => (
        <motion.div
          key={`tech-${i}`}
          className="absolute"
          style={{
            left: `${Math.random() * 80 + 10}%`,
            top: `${Math.random() * 80 + 10}%`,
            transform: `rotate(${Math.random() * 45 - 22.5}deg)`,
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
          <div className={`w-16 h-16 md:w-24 md:h-24 flex items-center justify-center rounded-xl
            ${theme === 'dark' ? 'bg-white/5' : 'bg-white/40 shadow-lg'} backdrop-blur-lg border border-white/30`}>
            <div className={`text-2xl md:text-3xl ${theme === 'dark' ? 'text-white/70' : 'text-brand-primary'}`}>
              {['AI', 'ML', '</>',  'UX', '{ }', '01', '++', '##', '&lt;&gt;', 'API', 'UI', 'UX'][i]}
            </div>
          </div>
        </motion.div>
      ))}

      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          backgroundPosition: `${50 + (mousePosition.x / window.innerWidth - 0.5) * 15}% ${50 + (mousePosition.y / window.innerHeight - 0.5) * 15}%`,
        }}
        transition={{ type: "spring", damping: 15 }}
      />
      
      <motion.div
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        className="container mx-auto px-4 relative z-20 pt-20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="text-left">
            <motion.div variants={itemVariants} className="mb-2">
              <span className={`inline-flex items-center px-3 py-1 rounded-full ${
                theme === 'dark'
                  ? 'bg-white/20 text-white'
                  : 'bg-brand-primary/10 text-brand-primary'
              } text-sm font-medium`}>
                AI-Powered Interviews
                <ChevronRight className="h-4 w-4 ml-1" />
              </span>
            </motion.div>
            
            <motion.h1
              variants={itemVariants}
              className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}
            >
              Ace Your <span className={`relative ${theme === 'dark' ? 'text-white' : 'text-brand-primary'}`}>
                Interviews
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 385 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 5.5C95.8333 3.5 281.8 0.699997 384 8.49997" stroke={theme === 'dark' ? "#FFFFFF" : "#4f46e5"} strokeWidth="8" strokeLinecap="round"/>
                </svg>
              </span> With AI
            </motion.h1>
            
            <motion.p
              variants={itemVariants}
              className={`text-lg md:text-xl mb-8 max-w-xl ${
                theme === 'dark' ? 'text-white/80' : 'text-gray-700'
              }`}
            >
              Practice with our intelligent AI interviewer and receive personalized feedback to help you land your dream job. Join thousands of successful candidates today.
            </motion.p>
            
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 mb-12"
            >
              <Link to="/candidate/login">
                <Button size="lg" className={`${
                  theme === 'dark'
                    ? 'bg-white text-brand-primary hover:bg-white/90'
                    : 'bg-brand-primary text-white hover:bg-brand-primary/90'
                } font-medium gap-2 py-6 px-6 rounded-xl text-base btn-hover-effect shadow-lg`}>
                  Start Practicing Now
                  <ArrowRight className="ml-1 h-5 w-5" />
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg" 
                className={`${
                  theme === 'dark'
                    ? 'bg-transparent border-white text-white hover:bg-white/10'
                    : 'bg-white border-brand-primary text-brand-primary hover:bg-brand-primary/5'
                } font-medium gap-2 py-6 px-6 rounded-xl text-base btn-hover-effect shadow-md`}
              >
                <PlayCircle className="h-5 w-5" />
                Watch Demo
              </Button>
            </motion.div>
            
            <motion.div
              variants={itemVariants}
              className="flex flex-col gap-2"
            >
              <p className={theme === 'dark' ? 'text-white/70' : 'text-gray-600'} font-medium>Trusted by candidates from</p>
              <div className="flex flex-wrap gap-x-8 gap-y-4 items-center">
                {['Google', 'Microsoft', 'Amazon', 'Meta', 'Apple'].map((company) => (
                  <span key={company} className={`${theme === 'dark' ? 'text-white/80' : 'text-gray-800'} font-semibold text-lg`}>
                    {company}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            variants={itemVariants}
            className={`${isMobile ? 'flex' : 'hidden lg:flex'} justify-center items-center relative`}
          >
            <div className="w-full max-w-[500px] h-[400px] md:h-[500px] relative">
              <motion.div
                animate={{ 
                  rotate: 360,
                  transition: { duration: 30, repeat: Infinity, ease: "linear" }
                }}
                className={`absolute w-full h-full rounded-full border-2 border-dashed ${
                  theme === 'dark' ? 'border-white/20' : 'border-brand-primary/20'
                }`}
              />
              
              <motion.div
                animate={{ 
                  rotate: -360,
                  transition: { duration: 40, repeat: Infinity, ease: "linear" }
                }}
                className={`absolute w-4/5 h-4/5 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed ${
                  theme === 'dark' ? 'border-white/30' : 'border-brand-primary/30'
                }`}
              />
              
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 2, 0, -2, 0],
                  transition: { duration: 6, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className={`relative w-4/5 h-auto rounded-xl overflow-hidden glass-effect ${
                  theme === 'dark' 
                    ? 'shadow-xl shadow-brand-primary/20' 
                    : 'shadow-2xl shadow-brand-primary/30'
                }`}>
                  <img 
                    src="https://interviewstaging.shiksak.com/storage/customimages/ai-interviewlogo.png" 
                    alt="AI Interview" 
                    className="w-full h-auto z-10"
                  />
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-brand-primary/30 to-transparent"
                    animate={{
                      opacity: [0.5, 0.8, 0.5],
                      background: [
                        `linear-gradient(45deg, rgba(79,70,229,${theme === 'dark' ? '0.3' : '0.1'}) 0%, rgba(79,70,229,0) 70%)`,
                        `linear-gradient(45deg, rgba(79,70,229,${theme === 'dark' ? '0.5' : '0.3'}) 10%, rgba(79,70,229,0) 80%)`,
                        `linear-gradient(45deg, rgba(79,70,229,${theme === 'dark' ? '0.3' : '0.1'}) 0%, rgba(79,70,229,0) 70%)`,
                      ]
                    }}
                    transition={{ duration: 8, repeat: Infinity }}
                  />
                </div>
              </motion.div>
              
              {!isMobile && (
                <>
                  <motion.div
                    animate={{ 
                      x: [0, 30, 0], 
                      y: [0, -20, 0],
                      rotate: [0, 5, 0, -5, 0],
                      transition: { duration: 8, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className={`absolute top-12 right-24 backdrop-blur-md rounded-lg shadow-lg p-4 border z-20 glass-effect ${
                      theme === 'dark'
                        ? 'border-white/20 shadow-brand-primary/20'
                        : 'border-white/60 shadow-brand-primary/10 bg-white/60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-brand-primary rounded-full flex items-center justify-center">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                          <path d="M5 13L9 17L19 7" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div className={theme === 'dark' ? 'text-white' : 'text-gray-800'} font-medium>Real-time AI feedback</div>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    animate={{ 
                      x: [0, -20, 0], 
                      y: [0, 30, 0],
                      rotate: [0, -5, 0, 5, 0],
                      transition: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }
                    }}
                    className={`absolute bottom-20 left-10 backdrop-blur-md rounded-lg shadow-lg p-4 border z-20 glass-effect ${
                      theme === 'dark'
                        ? 'border-white/20 shadow-brand-primary/20'
                        : 'border-white/60 shadow-brand-primary/10 bg-white/60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-brand-primary rounded-full flex items-center justify-center">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                          <path d="M12 8V16M8 12H16" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div className={theme === 'dark' ? 'text-white' : 'text-gray-800'} font-medium>AI Interview Coach</div>
                    </div>
                  </motion.div>

                  <motion.div
                    animate={{ 
                      x: [0, 15, 0, -15, 0], 
                      y: [0, -15, 0, 15, 0],
                      rotate: [0, 3, 0, -3, 0],
                      transition: { duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }
                    }}
                    className={`absolute top-40 left-20 backdrop-blur-md rounded-lg shadow-lg p-4 border z-20 glass-effect ${
                      theme === 'dark'
                        ? 'border-white/20 shadow-brand-primary/20'
                        : 'border-white/60 shadow-brand-primary/10 bg-white/60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-brand-primary rounded-full flex items-center justify-center">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4m4-5l5 5 5-5m-5 5V3" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div className={theme === 'dark' ? 'text-white' : 'text-gray-800'} font-medium>Instant Reports</div>
                    </div>
                  </motion.div>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute -bottom-1 left-0 right-0 w-full"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
          <path fill="currentColor" fillOpacity="1" className="text-background" d="M0,160L48,154.7C96,149,192,139,288,154.7C384,171,480,213,576,218.7C672,224,768,192,864,181.3C960,171,1056,181,1152,176C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </motion.div>

      <style>
        {`
        .bg-grid-pattern {
          background-size: 40px 40px;
          background-image: 
            linear-gradient(to right, ${theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(79, 70, 229, 0.05)'} 1px, transparent 1px),
            linear-gradient(to bottom, ${theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(79, 70, 229, 0.05)'} 1px, transparent 1px);
        }
        
        .glass-effect {
          backdrop-filter: blur(8px);
          background: ${theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.7)'};
          border: 1px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.8)'};
          box-shadow: ${theme === 'dark' 
            ? '0 8px 32px rgba(0, 0, 0, 0.2)' 
            : '0 8px 32px rgba(79, 70, 229, 0.15)'};
        }

        @media (max-width: 768px) {
          .bg-grid-pattern {
            background-size: 20px 20px;
          }
        }
        `}
      </style>
    </div>
  );
};

export default HeroSection;
