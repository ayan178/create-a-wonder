
import React, { useState, useEffect } from "react";
import { useTheme } from "@/components/ThemeProvider";
import ThreeBackground from "@/components/ThreeBackground";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Calendar, Video } from "lucide-react";

// Importing our components
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ProfileSection from "@/components/dashboard/ProfileSection";
import InterviewsSection from "@/components/dashboard/InterviewsSection";
import InterviewSection from "@/components/dashboard/PracticeSection";

const CandidateDashboard = () => {
  const { theme } = useTheme();
  const [progress, setProgress] = useState(30);
  const [activeTab, setActiveTab] = useState("profile");
  const [selectedRole, setSelectedRole] = useState("");

  // Profile data
  const profileData = {
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    role: "Software Engineer",
    location: "San Francisco, CA",
    bio: "Experienced software engineer with a passion for building great products. Currently looking for new opportunities.",
    skills: ["JavaScript", "React", "Node.js", "TypeScript", "Python"],
    experience: [
      {
        title: "Senior Software Engineer",
        company: "Tech Solutions Inc.",
        duration: "2020 - Present",
      },
      {
        title: "Software Developer",
        company: "WebApps Co.",
        duration: "2017 - 2020",
      },
    ],
    education: [
      {
        degree: "Master of Computer Science",
        institution: "Stanford University",
        year: "2017",
      },
      {
        degree: "Bachelor of Engineering",
        institution: "MIT",
        year: "2015",
      },
    ],
  };

  // Interview data
  const upcomingInterviews = [
    {
      id: 1,
      role: "Senior Frontend Developer",
      company: "TechCorp",
      date: "2025-04-10T14:00:00",
      duration: 60,
      status: "scheduled",
    },
    {
      id: 2,
      role: "Full Stack Engineer",
      company: "InnovateX",
      date: "2025-04-15T11:30:00",
      duration: 45,
      status: "scheduled",
    },
  ];

  const pastInterviews = [
    {
      id: 3,
      role: "React Developer",
      company: "WebSolutions",
      date: "2025-03-28T10:00:00",
      duration: 60,
      status: "completed",
      score: 85,
    },
    {
      id: 4,
      role: "JavaScript Engineer",
      company: "AppDev Inc.",
      date: "2025-03-20T15:30:00",
      duration: 45,
      status: "completed",
      score: 92,
    },
    {
      id: 5,
      role: "Frontend Specialist",
      company: "UX Masters",
      date: "2025-03-15T13:00:00",
      duration: 60,
      status: "completed",
      score: 78,
    },
  ];

  const interviewRoles = [
    "Software Engineer",
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Engineer",
    "Data Scientist",
    "Product Manager",
    "UX Designer",
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(66);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <ThreeBackground isDarkMode={theme === "dark"} />
      
      <DashboardHeader profileData={profileData} />
      
      <main className="container mx-auto py-24 px-4 md:px-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-6">
          <TabsList className="w-full grid grid-cols-3 gap-4">
            <TabsTrigger value="profile" className="flex items-center">
              <User className="h-4 w-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="interviews" className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              My Interviews
            </TabsTrigger>
            <TabsTrigger value="interview" className="flex items-center">
              <Video className="h-4 w-4 mr-2" />
              Interview
            </TabsTrigger>
          </TabsList>
          
          {/* Profile Tab Content */}
          <TabsContent value="profile">
            <ProfileSection profileData={profileData} progress={progress} />
          </TabsContent>
          
          {/* My Interviews Tab Content */}
          <TabsContent value="interviews">
            <InterviewsSection 
              upcomingInterviews={upcomingInterviews}
              pastInterviews={pastInterviews}
            />
          </TabsContent>
          
          {/* Interview Tab Content - Changed from "practice" to "interview" */}
          <TabsContent value="interview">
            <InterviewSection
              interviewRoles={interviewRoles}
              selectedRole={selectedRole}
              setSelectedRole={setSelectedRole}
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default CandidateDashboard;
