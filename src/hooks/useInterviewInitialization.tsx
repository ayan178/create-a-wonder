
import { useCallback } from "react";
import { toast } from "@/hooks/use-toast";
import { videoRecorder } from "@/utils/videoRecording";

/**
 * Hook for managing interview initialization and cleanup
 */
const useInterviewInitialization = (
  questions: string[],
  setCurrentQuestion: (question: string) => void,
  resetConversation: () => void,
  resetQuestions: () => void,
  setIsInterviewStarted: (isStarted: boolean) => void,
  setIsRecording: (isRecording: boolean) => void,
  addToTranscript: (speaker: string, text: string) => void,
  clearSpeechTranscript: () => void
) => {
  /**
   * Initialize the interview with first question
   */
  const initializeInterview = useCallback(async () => {
    try {
      // Reset any previous state
      resetConversation();
      resetQuestions();
      
      // Set interview as started
      setIsInterviewStarted(true);
      
      // Set the first question
      setCurrentQuestion(questions[0]);
      
      return true;
    } catch (error) {
      console.error("Failed to initialize interview:", error);
      toast({
        title: "Initialization failed",
        description: "Could not initialize interview properly",
        variant: "destructive",
      });
      return false;
    }
  }, [
    questions,
    resetConversation,
    resetQuestions,
    setCurrentQuestion,
    setIsInterviewStarted
  ]);

  /**
   * Start recording the interview
   */
  const startInterviewRecording = useCallback(async (stream: MediaStream) => {
    try {
      // Start recording
      await videoRecorder.startRecording(stream);
      setIsRecording(true);
      
      // Clear any previous transcript
      clearSpeechTranscript();
      
      // Add initial AI question to transcript
      addToTranscript("AI Interviewer", questions[0]);
      
      console.log("Interview recording started successfully");
      return true;
    } catch (error) {
      console.error("Failed to start interview recording:", error);
      toast({
        title: "Start failed",
        description: "Could not start interview recording",
        variant: "destructive",
      });
      return false;
    }
  }, [questions, addToTranscript, clearSpeechTranscript, setIsRecording]);

  /**
   * Clean up recording if it's still active
   */
  const cleanupRecording = useCallback(() => {
    videoRecorder.cleanup();
  }, []);

  return {
    initializeInterview,
    startInterviewRecording,
    cleanupRecording
  };
};

export { useInterviewInitialization };
