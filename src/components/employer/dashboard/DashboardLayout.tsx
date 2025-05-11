
import React, { ReactNode } from "react";
import { motion } from "framer-motion";

import DashboardHeader from "./DashboardHeader";
import DashboardFooter from "./DashboardFooter";
import MobileNavigation from "./MobileNavigation";

interface DashboardLayoutProps {
  children: ReactNode;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const DashboardLayout = ({ 
  children, 
  activeSection, 
  onSectionChange 
}: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col relative z-10">
      <DashboardHeader />
      
      <MobileNavigation 
        activeSection={activeSection} 
        onSectionChange={onSectionChange} 
      />
      
      <main className="flex-1 pt-20 pb-20 md:pb-6 px-4 md:px-6">
        <div className="container mx-auto space-y-6">
          {children}
        </div>
      </main>
      
      <DashboardFooter />
    </div>
  );
};

export default DashboardLayout;
