
import React from "react";
import { motion } from "framer-motion";

const PricingHeader = () => {
  return (
    <div className="text-center max-w-3xl mx-auto mb-16">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-bold mb-4"
      >
        Simple, Transparent <span className="text-brand-primary">Pricing</span>
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
        className="text-lg text-muted-foreground"
      >
        Choose the perfect plan for your interview preparation needs
      </motion.p>
    </div>
  );
};

export default PricingHeader;
