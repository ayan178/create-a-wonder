
import { useState, useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { speakText } from "@/utils/speechUtils";
import { useTranscript } from "@/hooks/useTranscript";
import { useInterviewQuestions } from "@/hooks/useInterviewQuestions";
import { useAIResponse } from "@/hooks/useAIResponse";
import { useRealTimeTranscription } from "@/hooks/useRealTimeTranscription";
import { useInterviewRecordingLogic } from "./useInterviewRecordingLogic";
import { videoRecorder } from "@/utils/videoRecording"; // Fixed: Added the missing import

/**
 * Custom hook for managing interview logic and state
 * @param isSystemAudioOn - Whether system audio is enabled
 */
export const useInterviewLogic = (isSystemAudioOn: boolean) => {
  // Core interview state
  const [isInterviewStarted, setIsInterviewStarted] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  // Use custom hooks
  const { transcript, addToTranscript } = useTranscript();
  
  const { 
    currentQuestion, 
    setCurrentQuestion, 
    currentCodingQuestion, 
    setCurrentCodingQuestion,
    showCodingChallenge,
    setShowCodingChallenge,
    advanceToNextQuestion,
    questions,
    codingQuestions
  } = useInterviewQuestions(isSystemAudioOn, addToTranscript);
  
  const { isProcessingAI, processWithOpenAI } = useAIResponse(
    isSystemAudioOn, 
    addToTranscript, 
    advanceToNextQuestion
  );
  
  const { handleRealTimeTranscription, transcriptionState, getTranscriptionStatus } = useRealTimeTranscription(
    addToTranscript,
    processWithOpenAI,
    currentQuestion
  );

  // Use recording logic hook - Fixed by adapting the type handling
  const { startRecording, endRecording } = useInterviewRecordingLogic(
    addToTranscript,
    // Use an adapter function to handle Blob type
    (blob: Blob) => {
      // For text blobs, extract the text content
      if (blob.type === 'text/plain') {
        const reader = new FileReader();
        reader.onload = (e) => {
          const text = e.target?.result as string;
          if (text) {
            handleRealTimeTranscription(text);
          }
        };
        reader.readAsText(blob);
      } else {
        // For other blob types, just log the info
        console.log("Received non-text blob:", blob.type, blob.size);
      }
    },
    setIsRecording,
    setVideoUrl
  );

  /**
   * Start the interview and recording
   * @param stream Media stream to record from
   */
  const startInterview = useCallback(async (stream: MediaStream) => {
    try {
      // Set interview as started
      setIsInterviewStarted(true);
      // Set the first question
      setCurrentQuestion(questions[0]);
      
      // Start recording
      const success = await startRecording(stream);
      
      if (success) {
        // Add initial AI question to transcript
        addToTranscript("AI Interviewer", questions[0]);
        
        // Set initial coding question but don't show it yet
        setCurrentCodingQuestion(codingQuestions[0]);
        
        // Simulate AI speaking the question
        speakText(questions[0], isSystemAudioOn);
      }
    } catch (error) {
      console.error("Failed to start interview:", error);
      toast({
        title: "Start failed",
        description: "Could not start interview properly",
        variant: "destructive",
      });
    }
  }, [
    questions, 
    codingQuestions,
    addToTranscript,
    isSystemAudioOn,
    setCurrentQuestion,
    setCurrentCodingQuestion,
    startRecording
  ]);

  /**
   * End the interview and save recording
   */
  const endInterview = useCallback(async () => { // Fixed: Implemented the missing function
    try {
      if (isRecording) {
        return await endRecording();
      }
      return true;
    } catch (error) {
      console.error("Error ending interview:", error);
      toast({
        title: "Error",
        description: "Failed to end interview properly",
        variant: "destructive",
      });
      
      const navigate = useNavigate();
      navigate("/candidate/dashboard");
      return false;
    }
  }, [isRecording, endRecording]);

  // Clean up on component unmount
  useEffect(() => {
    return () => {
      if (isRecording) {
        // Attempt to stop recording if component unmounts during recording
        videoRecorder.cleanup();
      }
    };
  }, [isRecording]);

  return {
    isInterviewStarted,
    isRecording,
    currentQuestion,
    transcript,
    startInterview,
    endInterview, // Fixed: Now including the implemented function
    currentCodingQuestion,
    showCodingChallenge,
    videoUrl,
    isProcessingAI,
    transcriptionState
  };
};
