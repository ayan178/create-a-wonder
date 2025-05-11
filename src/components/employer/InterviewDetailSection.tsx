
import React from "react";
import { 
  Card, 
  CardContent, 
  CardHeader,
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import {
  FileText,
  MessageSquare,
  Play,
  Star,
} from "lucide-react";

// Import refactored components
import VideoTab from "./interview-detail/VideoTab";
import AnalysisTab from "./interview-detail/AnalysisTab";
import TranscriptTab from "./interview-detail/TranscriptTab";
import FeedbackTab from "./interview-detail/FeedbackTab";
import InterviewHeader from "./interview-detail/InterviewHeader";

// Import types
import { InterviewDetail } from "@/types/interview";

// Mock interview details
const mockInterviewDetail: InterviewDetail = {
  id: 1,
  candidate: "John Doe",
  position: "Frontend Developer",
  date: "2025-04-08",
  time: "10:30 AM",
  duration: 28,
  status: "completed",
  score: 85,
  videoUrl: "https://example.com/interview-video.mp4",
  transcript: [
    { speaker: "AI Interviewer", text: "Tell me about your experience with React.", timestamp: "00:01:20" },
    { speaker: "John Doe", text: "I've been working with React for over 3 years now. I've built multiple web applications using React and have experience with state management libraries like Redux and context API.", timestamp: "00:01:35" },
    { speaker: "AI Interviewer", text: "How do you handle state management in your React applications?", timestamp: "00:02:15" },
    { speaker: "John Doe", text: "It depends on the project requirements. For smaller applications, I typically use React's built-in useState and useContext hooks. For more complex applications with deep component trees and many state interactions, I might reach for Redux or Zustand.", timestamp: "00:02:30" },
    { speaker: "AI Interviewer", text: "Can you explain how you optimize React application performance?", timestamp: "00:03:45" },
    { speaker: "John Doe", text: "I focus on several areas for optimization. First, I use React.memo and useMemo for expensive calculations and to prevent unnecessary re-renders. I also implement useCallback for functions passed as props. For lists, I make sure to provide stable keys. Additionally, I use code splitting with React.lazy and Suspense to reduce the initial bundle size.", timestamp: "00:04:02" },
  ],
  analysis: {
    technicalScore: 88,
    communicationScore: 92,
    confidenceScore: 85,
    problemSolvingScore: 82,
    overallScore: 85,
    strengths: [
      "Strong technical knowledge of React",
      "Clear communication skills",
      "Good understanding of performance optimization",
      "Practical experience with state management"
    ],
    weaknesses: [
      "Could provide more concrete examples",
      "Limited exposure to testing frameworks"
    ],
    notes: "John demonstrates strong React knowledge and would be a valuable addition to the frontend team. Consider a follow-up interview focusing on testing practices and real-world problem solving."
  }
};

const InterviewDetailSection = ({ interviewId }: { interviewId?: number }) => {
  // In a real app, you would fetch the interview details based on the ID
  const interview = mockInterviewDetail;
  
  if (!interviewId) {
    // Return null when no interview is selected
    return null;
  }
  
  return (
    <Card className="glass-morphism h-full">
      <CardHeader>
        <InterviewHeader 
          candidate={interview.candidate}
          position={interview.position}
          date={interview.date}
          time={interview.time}
          duration={interview.duration}
          status={interview.status}
        />
      </CardHeader>
      
      <CardContent className="space-y-4">
        <Tabs defaultValue="video" className="w-full">
          <TabsList className="grid grid-cols-4 mb-2">
            <TabsTrigger value="video">
              <Play className="h-4 w-4 mr-2" />
              Interview
            </TabsTrigger>
            <TabsTrigger value="analysis">
              <Star className="h-4 w-4 mr-2" />
              Analysis
            </TabsTrigger>
            <TabsTrigger value="transcript">
              <FileText className="h-4 w-4 mr-2" />
              Transcript
            </TabsTrigger>
            <TabsTrigger value="feedback">
              <MessageSquare className="h-4 w-4 mr-2" />
              Feedback
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="video" className="space-y-4">
            <VideoTab videoUrl={interview.videoUrl} />
          </TabsContent>
          
          <TabsContent value="analysis" className="space-y-4">
            <AnalysisTab analysis={interview.analysis} />
          </TabsContent>
          
          <TabsContent value="transcript" className="h-[500px]">
            <TranscriptTab transcript={interview.transcript} />
          </TabsContent>
          
          <TabsContent value="feedback" className="space-y-6">
            <FeedbackTab />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default InterviewDetailSection;
