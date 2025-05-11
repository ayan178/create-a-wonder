
import React from 'react';
import { useTheme } from "@/components/ThemeProvider";

interface BackgroundWrapperProps {
  children: React.ReactNode;
}

const BackgroundWrapper: React.FC<BackgroundWrapperProps> = ({ children }) => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-background/95 relative">
      {/* Simple background gradient overlay with reduced intensity */}
      <div className={`fixed inset-0 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-brand-primary/5 via-transparent to-background/60'
          : 'bg-gradient-to-br from-brand-primary/3 via-transparent to-background/30'
      }`}></div>
      
      {/* Background grid pattern with reduced opacity */}
      <div className={`fixed inset-0 mercor-grid ${
        isDarkMode ? 'opacity-5' : 'opacity-20'
      }`}></div>
      
      {/* Content */}
      {children}
    </div>
  );
};

export default BackgroundWrapper;
