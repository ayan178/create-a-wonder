
import { useCallback, useEffect, useRef } from "react";
import { toast } from "@/hooks/use-toast";
import { videoRecorder } from "@/utils/videoRecording";
import { speakText, getCurrentAudioElement } from "@/utils/speechUtils";

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
  // Reference to track if we've configured the recording with system audio
  const systemAudioConfigured = useRef(false);

  // Effect to monitor for audio elements to include in recording
  useEffect(() => {
    if (isRecording && isSystemAudioOn && !systemAudioConfigured.current) {
      // Set up an interval to check for new audio elements during the interview
      const checkInterval = setInterval(() => {
        const audioElement = getCurrentAudioElement();
        if (audioElement && !systemAudioConfigured.current) {
          // Configure the recorder to capture this audio element
          videoRecorder.startRecording(
            new MediaStream(), // This is a dummy stream, real stream is already started
            { audioElement }
          ).catch(error => {
            console.error("Failed to add system audio to recording:", error);
          });
          
          systemAudioConfigured.current = true;
          clearInterval(checkInterval);
        }
      }, 1000);
      
      return () => {
        clearInterval(checkInterval);
      };
    }
    
    return () => {}; // No cleanup needed if not recording
  }, [isRecording, isSystemAudioOn]);
  
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
          description: "Recording saved successfully to " + videoRecorder.getStoragePath(),
        });
      }
      
      // Reset system audio configuration flag
      systemAudioConfigured.current = false;
      
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

  /**
   * Set a custom storage path for the recordings
   */
  const setStoragePath = useCallback((path: string) => {
    if (!path) return;
    
    videoRecorder.setStoragePath(path);
    toast({
      title: "Storage path updated",
      description: `Recordings will be saved to: ${path}`,
    });
  }, []);
  
  return {
    endInterview,
    speakFirstQuestion,
    setStoragePath
  };
}
