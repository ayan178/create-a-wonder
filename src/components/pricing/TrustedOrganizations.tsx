
import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";

const TrustedOrganizations = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      viewport={{ once: true }}
      className="mt-24 text-center max-w-2xl mx-auto"
    >
      <h3 className="font-medium text-xl mb-6">Trusted by leading organizations</h3>
      <div className="flex flex-wrap justify-center gap-x-12 gap-y-8">
        {['Google', 'Microsoft', 'Amazon', 'Meta', 'Apple'].map((company) => (
          <span key={company} className={`${isDarkMode ? 'text-white/70' : 'text-gray-600'} text-lg font-medium`}>
            {company}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

export default TrustedOrganizations;
