
import React, { useState } from "react";
import EnhancedBackground from "@/components/EnhancedBackground";
import DashboardLayout from "@/components/employer/dashboard/DashboardLayout";
import DashboardContent from "@/components/employer/dashboard/DashboardContent";

const EmployerDashboard = () => {
  const [selectedInterviewId, setSelectedInterviewId] = useState<number | undefined>(undefined);
  const [activeSection, setActiveSection] = useState("dashboard");
  
  return (
    <EnhancedBackground intensity="medium">
      <DashboardLayout 
        activeSection={activeSection} 
        onSectionChange={setActiveSection}
      >
        <DashboardContent 
          activeSection={activeSection}
          selectedInterviewId={selectedInterviewId}
          setSelectedInterviewId={setSelectedInterviewId}
        />
      </DashboardLayout>
    </EnhancedBackground>
  );
};

export default EmployerDashboard;
