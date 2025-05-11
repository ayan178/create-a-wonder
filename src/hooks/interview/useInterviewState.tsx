
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useTranscript } from "@/hooks/useTranscript";

/**
 * Custom hook for managing interview state
 */
export function useInterviewState() {
  const navigate = useNavigate();
  
  // Core interview state
  const [isInterviewStarted, setIsInterviewStarted] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  
  // Use transcript hook
  const { transcript, addToTranscript } = useTranscript();
  
  /**
   * Navigate to dashboard after interview
   */
  const navigateToDashboard = useCallback(() => {
    navigate("/candidate/dashboard");
  }, [navigate]);
  
  return {
    isInterviewStarted,
    setIsInterviewStarted,
    isRecording,
    setIsRecording,
    videoUrl,
    setVideoUrl,
    transcript,
    addToTranscript,
    navigateToDashboard
  };
}
