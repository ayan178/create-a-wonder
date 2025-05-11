
import React from "react";
import { useTheme } from "@/components/ThemeProvider";

const DashboardFooter = () => {
  const { theme } = useTheme();
  
  return (
    <footer className={`py-4 px-4 ${
      theme === 'dark' ? 'border-t border-white/10' : 'border-t border-gray-200'
    }`}>
      <div className="container mx-auto">
        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} AI Interview - Employer Portal. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default DashboardFooter;
