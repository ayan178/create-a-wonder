
import React from "react";
import { motion } from "framer-motion";
import { 
  Video, UserCheck, Cpu, BarChart, CheckCircle, Award
} from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

const features = [
  {
    icon: <Video className="w-6 h-6 text-white" />,
    title: "Video Interviews",
    description: "Practice with realistic video interviews that simulate real-world scenarios.",
  },
  {
    icon: <Cpu className="w-6 h-6 text-white" />,
    title: "AI Feedback",
    description: "Get instant, personalized feedback from our advanced AI on your performance.",
  },
  {
    icon: <UserCheck className="w-6 h-6 text-white" />,
    title: "Expert Review",
    description: "Receive detailed analysis from industry experts to improve your skills.",
  },
  {
    icon: <BarChart className="w-6 h-6 text-white" />,
    title: "Progress Tracking",
    description: "Monitor your improvement over time with detailed analytics.",
  },
  {
    icon: <CheckCircle className="w-6 h-6 text-white" />,
    title: "Personalized Path",
    description: "Get customized interview preparation based on your target role and experience.",
  },
  {
    icon: <Award className="w-6 h-6 text-white" />,
    title: "Job Success",
    description: "Increase your chances of landing your dream job with our proven system.",
  },
];

const FeatureSection = () => {
  const { theme } = useTheme();
  
  return (
    <section id="features" className="py-24 px-4 relative overflow-hidden">
      {/* Background patterns - Mercor style */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      {/* Animated dots grid background - Mercor style */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 5 + 3}px`,
              height: `${Math.random() * 5 + 3}px`,
              background: theme === 'dark' ? 'rgba(255,255,255,0.3)' : 'rgba(79,70,229,0.3)',
            }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
      
      {/* Large background circles */}
      <motion.div
        className="absolute top-0 -right-64 w-[600px] h-[600px] rounded-full opacity-10"
        style={{
          background: theme === 'dark' 
            ? 'radial-gradient(circle at center, rgba(255,255,255,0.2), rgba(255,255,255,0))' 
            : 'radial-gradient(circle at center, rgba(79,70,229,0.2), rgba(79,70,229,0))'
        }}
        animate={{
          scale: [1, 1.1, 1],
          y: [0, -10, 0],
          x: [0, 10, 0],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="mb-4 inline-flex items-center px-4 py-1.5 rounded-full bg-brand-primary/10 dark:bg-white/10"
          >
            <span className="text-sm font-semibold text-brand-primary dark:text-white">Interview Excellence</span>
          </motion.div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ace Your Next Interview</h2>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Our AI-powered platform provides you with the tools to prepare, practice, and perfect your interview skills.
          </p>
          
          <motion.div 
            className="w-24 h-1 bg-brand-primary mx-auto mt-6 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
          />
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -15, 
                transition: { duration: 0.3, ease: "easeOut" },
              }}
              className="glass-card dark:bg-brand-primary/10 p-8 rounded-xl transform transition-all relative overflow-hidden"
            >
              {/* Feature card background effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br opacity-10"
                style={{
                  background: theme === 'dark'
                    ? 'radial-gradient(circle at top left, rgba(255,255,255,0.2), rgba(255,255,255,0))'
                    : 'radial-gradient(circle at top left, rgba(79,70,229,0.2), rgba(79,70,229,0))'
                }}
                animate={{
                  backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              />
              
              <div className="h-14 w-14 rounded-xl bg-brand-primary flex items-center justify-center mb-6 shadow-lg shadow-brand-primary/20 transform transition-transform duration-300 hover:scale-110">
                {feature.icon}
              </div>
              
              <h3 className="text-xl font-bold mb-3 relative">
                {feature.title}
                <motion.div
                  className="absolute -bottom-1 left-0 h-[2px] bg-brand-primary/30 dark:bg-white/30"
                  initial={{ width: 0 }}
                  whileInView={{ width: '30%' }}
                  transition={{ duration: 1, delay: 0.5 }}
                  viewport={{ once: true }}
                />
              </h3>
              
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              
              <motion.div
                className="absolute bottom-0 right-0 w-16 h-16 opacity-10"
                style={{
                  background: theme === 'dark'
                    ? 'radial-gradient(circle at center, rgba(255,255,255,0.8), rgba(255,255,255,0))'
                    : 'radial-gradient(circle at center, rgba(79,70,229,0.8), rgba(79,70,229,0))'
                }}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.1, 0.2, 0.1],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="flex justify-center mt-16"
        >
          <motion.a
            href="/candidate/register"
            className="bg-brand-primary hover:bg-brand-primary/90 text-white px-8 py-4 rounded-full font-medium inline-flex items-center gap-2 btn-hover-effect"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started Today
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.a>
        </motion.div>
      </div>

      {/* CSS for Mercor-style grid pattern */}
      <style>
        {`
        .bg-grid-pattern {
          background-size: 30px 30px;
          background-image: 
            linear-gradient(to right, ${theme === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(79,70,229,0.03)'} 1px, transparent 1px),
            linear-gradient(to bottom, ${theme === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(79,70,229,0.03)'} 1px, transparent 1px);
        }
        `}
      </style>
    </section>
  );
};

export default FeatureSection;
