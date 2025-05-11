
import React from "react";
import {
  Tabs,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";

interface MobileNavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const MobileNavigation = ({ activeSection, onSectionChange }: MobileNavigationProps) => {
  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 py-2 px-4 bg-background border-t">
      <Tabs 
        defaultValue="dashboard" 
        value={activeSection} 
        onValueChange={onSectionChange} 
        className="w-full"
      >
        <TabsList className="grid grid-cols-1 w-full">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default MobileNavigation;
