
import React from "react";
import { motion } from "framer-motion";

import ConfigureInterviewSection from "@/components/employer/ConfigureInterviewSection";
import JobDescriptionUploadSection from "@/components/employer/JobDescriptionUploadSection";
import CandidateMatchesSection from "@/components/employer/CandidateMatchesSection";
import InterviewsListSection from "@/components/employer/InterviewsListSection";
import InterviewDetailSection from "@/components/employer/InterviewDetailSection";

interface DashboardContentProps {
  activeSection: string;
  selectedInterviewId: number | undefined;
  setSelectedInterviewId: (id: number | undefined) => void;
}

const DashboardContent = ({
  activeSection,
  selectedInterviewId,
  setSelectedInterviewId
}: DashboardContentProps) => {
  if (activeSection === "dashboard") {
    return (
      <>
        {/* First row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ConfigureInterviewSection />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <JobDescriptionUploadSection />
          </motion.div>
        </div>
        
        {/* Second row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <CandidateMatchesSection />
        </motion.div>
        
        {/* Interviews layout - Modified to make interview list take full width when no interview selected */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className={`${selectedInterviewId ? 'lg:col-span-1' : 'lg:col-span-3'}`}
          >
            <InterviewsListSection onSelectInterview={setSelectedInterviewId} />
          </motion.div>
          
          {selectedInterviewId && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="lg:col-span-2"
            >
              <InterviewDetailSection interviewId={selectedInterviewId} />
            </motion.div>
          )}
        </div>
      </>
    );
  }
  
  return null;
};

export default DashboardContent;
