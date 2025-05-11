
import { useState, useCallback } from "react";

/**
 * Hook for managing core interview state
 */
export const useInterviewState = () => {
  // Core interview state
  const [isInterviewStarted, setIsInterviewStarted] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  
  // Start the interview
  const startInterview = useCallback(() => {
    setIsInterviewStarted(true);
  }, []);
  
  // Start recording
  const startRecording = useCallback(() => {
    setIsRecording(true);
  }, []);
  
  // Stop recording and save URL
  const stopRecording = useCallback((url: string | null = null) => {
    setIsRecording(false);
    if (url) {
      setVideoUrl(url);
    }
  }, []);
  
  // End the interview completely
  const endInterview = useCallback(() => {
    setIsInterviewStarted(false);
    setIsRecording(false);
  }, []);
  
  return {
    isInterviewStarted,
    isRecording,
    videoUrl,
    startInterview,
    startRecording,
    stopRecording,
    endInterview,
  };
};
