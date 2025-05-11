
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const CustomSolutionCard = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      viewport={{ once: true }}
      className="mt-16 text-center bg-secondary rounded-xl p-8 max-w-3xl mx-auto"
    >
      <h2 className="text-2xl font-bold mb-4">Need a custom solution?</h2>
      <p className="mb-6 text-muted-foreground">Contact our team for a personalized plan tailored to your specific requirements</p>
      <Button>Contact Us</Button>
    </motion.div>
  );
};

export default CustomSolutionCard;
