
import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

// Define a type for the allowed button variants
type ButtonVariant = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";

interface PricingTierProps {
  title: string;
  price: string;
  features: string[];
  isPopular?: boolean;
  buttonText?: string;
  buttonVariant?: ButtonVariant;
  delay?: number;
}

const PricingTier: React.FC<PricingTierProps> = ({ 
  title, 
  price, 
  features, 
  isPopular = false, 
  buttonText = "Get Started",
  buttonVariant = "default", 
  delay = 0
}) => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className={`relative rounded-2xl p-6 shadow-lg ${
        isPopular 
          ? isDarkMode 
            ? 'bg-brand-primary border-2 border-white/20' 
            : 'bg-brand-primary text-white border-2 border-brand-primary/20'
          : isDarkMode 
            ? 'bg-background/60 border border-white/10 backdrop-blur-md' 
            : 'bg-white border border-gray-200'
      }`}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-brand-secondary text-brand-primary text-sm font-bold px-4 py-1 rounded-full">
          Most Popular
        </div>
      )}
      
      <h3 className={`text-2xl font-bold ${isPopular && !isDarkMode ? 'text-white' : ''}`}>{title}</h3>
      
      <div className="mt-4 mb-6">
        <span className={`text-4xl font-bold ${isPopular && !isDarkMode ? 'text-white' : ''}`}>${price}</span>
        <span className={`text-sm ${isPopular && !isDarkMode ? 'text-white/80' : 'text-gray-500'}`}>/month</span>
      </div>
      
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2">
            <Check className={`h-5 w-5 mt-0.5 flex-shrink-0 ${
              isPopular 
                ? isDarkMode 
                  ? 'text-brand-secondary' 
                  : 'text-brand-secondary'
                : 'text-brand-primary'
            }`} />
            <span className={`text-sm ${
              isPopular && !isDarkMode 
                ? 'text-white/90' 
                : isDarkMode 
                  ? 'text-gray-300' 
                  : 'text-gray-600'
            }`}>
              {feature}
            </span>
          </li>
        ))}
      </ul>
      
      <Button 
        variant={buttonVariant}
        className={`w-full ${
          buttonVariant === "outline" && isPopular && !isDarkMode 
            ? "border-white text-white hover:bg-white/10" 
            : ""
        } ${
          buttonVariant === "default" && isPopular && isDarkMode
            ? "bg-white text-brand-primary hover:bg-white/90"
            : ""
        }`}
      >
        {buttonText}
      </Button>
    </motion.div>
  );
};

export default PricingTier;
