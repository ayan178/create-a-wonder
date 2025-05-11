
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, X, Circle, Mic, MessageSquare } from "lucide-react";

interface InterviewHeaderProps {
  onEndInterview: () => void;
  isRecording?: boolean;
  isProcessingAI?: boolean;
}

/**
 * InterviewHeader component for the top navigation/header of the interview page
 * 
 * @param onEndInterview - Function to handle ending the interview
 * @param isRecording - Whether the interview is currently being recorded
 * @param isProcessingAI - Whether the AI is currently processing a response
 */
const InterviewHeader = ({ 
  onEndInterview, 
  isRecording, 
  isProcessingAI 
}: InterviewHeaderProps) => {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        {/* Back button - returns to dashboard */}
        <Button variant="ghost" onClick={onEndInterview} className="flex items-center gap-1">
          <ChevronLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>

        {/* Title with recording and transcription status */}
        <div className="flex items-center gap-2">
          {isRecording && (
            <>
              {/* Recording indicator */}
              <Circle className="h-3 w-3 fill-red-500 text-red-500 animate-pulse" />
              {/* Transcription indicator */}
              <Mic className="h-3 w-3 text-green-500 animate-pulse" />
              {/* AI Processing indicator */}
              {isProcessingAI && (
                <MessageSquare className="h-3 w-3 text-blue-500 animate-pulse" />
              )}
            </>
          )}
          <h1 className="text-lg font-semibold">AI Interview</h1>
          {isRecording && (
            <span className="text-xs opacity-75">
              {isProcessingAI 
                ? "(AI responding...)" 
                : "(Real-time transcription active)"}
            </span>
          )}
        </div>

        {/* End button to finish the interview */}
        <Button 
          variant="ghost" 
          onClick={onEndInterview}
          className="text-destructive"
        >
          <X className="h-4 w-4 mr-1" />
          End Interview
        </Button>
      </div>
    </header>
  );
};

export default InterviewHeader;
