
import React, { useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { UserCircle2, VideoIcon, Clipboard, Award } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

const instructionSteps = [
  {
    id: 1,
    title: "Create Your Profile",
    description: "Sign up and complete your profile with your skills, experience, and interview preferences.",
    icon: <UserCircle2 className="h-10 w-10" />,
  },
  {
    id: 2,
    title: "Start Your Interview",
    description: "Choose your interview type and begin practicing with our AI interviewer in a realistic setting.",
    icon: <VideoIcon className="h-10 w-10" />,
  },
  {
    id: 3,
    title: "Receive Detailed Feedback",
    description: "Get personalized feedback on your performance including strengths and areas for improvement.",
    icon: <Clipboard className="h-10 w-10" />,
  },
  {
    id: 4,
    title: "Improve and Excel",
    description: "Practice regularly with different scenarios to build confidence and ace your real interviews.",
    icon: <Award className="h-10 w-10" />,
  },
];

const InstructionSection = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { theme } = useTheme();
  const isDark = theme === "dark";

  React.useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="py-16 md:py-24 bg-secondary/30" id="how-it-works">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              How It Works
            </h2>
            <p className={`max-w-2xl mx-auto text-lg ${isDark ? 'text-white/80' : 'text-gray-600'}`}>
              Our AI Interview platform makes it easy to practice and improve your interview skills in four simple steps
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {instructionSteps.map((step) => (
              <motion.div
                key={step.id}
                variants={itemVariants}
                className={`relative flex ${
                  isDark 
                    ? 'bg-card/50 hover:bg-card/80' 
                    : 'bg-white hover:bg-gray-50'
                } p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg border border-border`}
              >
                <div className={`mr-4 flex items-center justify-center p-3 rounded-full ${
                  isDark 
                    ? 'bg-brand-primary/20 text-brand-primary' 
                    : 'bg-brand-primary/10 text-brand-primary'
                } `}>
                  {step.icon}
                </div>
                <div>
                  <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {step.title}
                  </h3>
                  <p className={`${isDark ? 'text-white/70' : 'text-gray-600'}`}>
                    {step.description}
                  </p>
                </div>
                <div className={`absolute -top-4 -left-4 w-8 h-8 rounded-full flex items-center justify-center ${
                  isDark 
                    ? 'bg-brand-primary text-white' 
                    : 'bg-brand-primary text-white'
                } font-bold text-lg`}>
                  {step.id}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div variants={itemVariants} className="text-center mt-12">
            <p className={`text-lg font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>
              Ready to ace your next interview?
            </p>
            <div className="mt-4 p-4 rounded-xl inline-block bg-gradient-to-r from-brand-primary/20 to-brand-secondary/20">
              <p className={`font-bold text-xl ${isDark ? 'text-white' : 'text-brand-primary'}`}>
                Join thousands of candidates who have improved their interview skills with our platform
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default InstructionSection;
