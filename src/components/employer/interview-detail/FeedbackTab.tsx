
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FeedbackTab = () => {
  const [candidateFeedback, setCandidateFeedback] = useState("");
  const [aiInterviewerFeedback, setAiInterviewerFeedback] = useState("");
  const [candidateRating, setCandidateRating] = useState("");
  const [aiInterviewerRating, setAiInterviewerRating] = useState("");
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  
  const handleSubmitFeedback = () => {
    console.log("Feedback submitted");
    setFeedbackSubmitted(true);
    
    // Reset feedback status after 3 seconds
    setTimeout(() => {
      setFeedbackSubmitted(false);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="py-4 px-4">
          <CardTitle className="text-base">Candidate Feedback</CardTitle>
          <CardDescription>
            Provide your feedback about the candidate's performance
          </CardDescription>
        </CardHeader>
        <CardContent className="py-2 px-4 space-y-4">
          <div>
            <label className="text-sm font-medium block mb-1">Candidate Rating</label>
            <Select
              value={candidateRating}
              onValueChange={setCandidateRating}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select candidate rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="excellent">Excellent</SelectItem>
                <SelectItem value="good">Good</SelectItem>
                <SelectItem value="average">Average</SelectItem>
                <SelectItem value="below-average">Below Average</SelectItem>
                <SelectItem value="poor">Poor</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Textarea 
            placeholder="Enter your feedback about the candidate here..."
            className="min-h-[120px]"
            value={candidateFeedback}
            onChange={(e) => setCandidateFeedback(e.target.value)}
          />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="py-4 px-4">
          <CardTitle className="text-base">AI Interviewer Feedback</CardTitle>
          <CardDescription>
            Provide your feedback about the AI interviewer's performance
          </CardDescription>
        </CardHeader>
        <CardContent className="py-2 px-4 space-y-4">
          <div>
            <label className="text-sm font-medium block mb-1">AI Interviewer Rating</label>
            <Select
              value={aiInterviewerRating}
              onValueChange={setAiInterviewerRating}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select AI interviewer rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="excellent">Excellent</SelectItem>
                <SelectItem value="good">Good</SelectItem>
                <SelectItem value="average">Average</SelectItem>
                <SelectItem value="below-average">Below Average</SelectItem>
                <SelectItem value="poor">Poor</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Textarea 
            placeholder="Enter your feedback about the AI interviewer here..."
            className="min-h-[120px]"
            value={aiInterviewerFeedback}
            onChange={(e) => setAiInterviewerFeedback(e.target.value)}
          />
        </CardContent>
      </Card>
      
      <div className="flex justify-end items-center">
        {feedbackSubmitted && (
          <div className="mr-4 text-green-600 dark:text-green-400">
            Feedback submitted successfully!
          </div>
        )}
        <Button onClick={handleSubmitFeedback}>
          Submit Feedback
        </Button>
      </div>
    </div>
  );
};

export default FeedbackTab;
