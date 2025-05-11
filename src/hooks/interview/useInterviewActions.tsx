
import { useCallback } from "react";
import { toast } from "@/hooks/use-toast";
import { videoRecorder } from "@/utils/videoRecording";
import { speakText } from "@/utils/speechUtils";

/**
 * Custom hook for managing interview actions
 */
export function useInterviewActions(
  isSystemAudioOn: boolean,
  questions: string[],
  isRecording: boolean,
  setIsRecording: (value: boolean) => void,
  setVideoUrl: (url: string | null) => void,
  navigateToDashboard: () => void,
  stopListening: () => void,
  deactivateSpeechRecognition: () => void
) {
  /**
   * End the interview and save recording
   */
  const endInterview = useCallback(async () => {
    try {
      // Stop speech recognition
      stopListening();
      deactivateSpeechRecognition();
      
      if (isRecording) {
        // Stop recording and get the blob
        const recordedBlob = await videoRecorder.stopRecording();
        setIsRecording(false);
        
        // Save the recording and get the URL
        const url = await videoRecorder.saveRecording(recordedBlob);
        setVideoUrl(url);
        
        toast({
          title: "Interview completed",
          description: "Recording saved successfully",
        });
      }
      
      // Navigate back to dashboard
      navigateToDashboard();
    } catch (error) {
      console.error("Error ending interview:", error);
      toast({
        title: "Error",
        description: "Failed to end interview properly",
        variant: "destructive",
      });
      navigateToDashboard();
    }
  }, [
    isRecording,
    navigateToDashboard, 
    stopListening, 
    deactivateSpeechRecognition,
    setIsRecording,
    setVideoUrl
  ]);

  /**
   * Speak the first question
   */
  const speakFirstQuestion = useCallback(async () => {
    // Delay speaking slightly to ensure UI updates first
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        // Simulate AI speaking the question
        speakText(questions[0], isSystemAudioOn)
          .then(() => resolve())
          .catch(err => {
            console.error("Error during AI speech:", err);
            resolve(); // Still resolve even if speech fails
          });
      }, 500);
    });
  }, [questions, isSystemAudioOn]);
  
  return {
    endInterview,
    speakFirstQuestion
  };
}
