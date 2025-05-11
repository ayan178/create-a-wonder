
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface QuestionCardProps {
  isInterviewStarted: boolean;
  currentQuestion: string;
  startInterview: () => void;
  isLoading: boolean;
}

/**
 * QuestionCard component that displays:
 * - Before interview: Instructions and start button
 * - During interview: Current question being asked
 */
const QuestionCard = ({
  isInterviewStarted,
  currentQuestion,
  startInterview,
  isLoading,
}: QuestionCardProps) => {
  if (isInterviewStarted) {
    return (
      <Card className="glass-morphism border-primary/10">
        <CardContent className="p-4">
          <div className="text-center">
            <h3 className="text-lg font-medium mb-2">Current Question:</h3>
            <p className="text-md">{currentQuestion}</p>
          </div>
          {/* Removed the Simulate Answer button for a more natural interview flow */}
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="glass-morphism border-primary/10">
      <CardContent className="p-4">
        <div className="text-center">
          <h3 className="text-lg font-medium mb-2">Ready to begin your interview?</h3>
          <p className="text-sm text-muted-foreground mb-4">Make sure your camera and microphone are working properly.</p>
          <Button 
            onClick={startInterview} 
            disabled={isLoading}
            className="bg-primary hover:bg-primary/90"
          >
            {isLoading ? "Setting up..." : "Start Interview"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionCard;
