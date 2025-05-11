
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronRight, PlayCircle } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

interface HeroContentProps {
  itemVariants: any;
}

const HeroContent: React.FC<HeroContentProps> = ({ itemVariants }) => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  
  return (
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
        <p className={`${theme === 'dark' ? 'text-white/70' : 'text-gray-600'} font-medium`}>Trusted by candidates from</p>
        <div className="flex flex-wrap gap-x-8 gap-y-4 items-center">
          {['Google', 'Microsoft', 'Amazon', 'Meta', 'Apple'].map((company) => (
            <span key={company} className={`${theme === 'dark' ? 'text-white/80' : 'text-gray-800'} font-semibold text-lg`}>
              {company}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default HeroContent;
