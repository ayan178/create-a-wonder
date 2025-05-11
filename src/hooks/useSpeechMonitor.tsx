
import { useEffect, useCallback, useState } from 'react';

/**
 * Hook for monitoring speech recognition status
 */
export const useSpeechMonitor = (
  isInterviewStarted: boolean, 
  isProcessingAI: boolean, 
  isListening: boolean, 
  resetAndRestartListening: () => void
) => {
  const [isSpeechRecognitionActive, setIsSpeechRecognitionActive] = useState(false);
  
  // Monitor and restart speech recognition if it stops unexpectedly
  useEffect(() => {
    let checkInterval: NodeJS.Timeout | null = null;
    
    if (isInterviewStarted && !isProcessingAI) {
      checkInterval = setInterval(() => {
        if (!isListening && isSpeechRecognitionActive) {
          console.log("Speech recognition appears to have stopped, restarting...");
          resetAndRestartListening();
        }
      }, 5000); // Check every 5 seconds
    }
    
    return () => {
      if (checkInterval) {
        clearInterval(checkInterval);
      }
    };
  }, [
    isInterviewStarted, 
    isListening, 
    isSpeechRecognitionActive, 
    isProcessingAI, 
    resetAndRestartListening
  ]);

  const activateSpeechRecognition = useCallback(() => {
    setIsSpeechRecognitionActive(true);
  }, []);

  const deactivateSpeechRecognition = useCallback(() => {
    setIsSpeechRecognitionActive(false);
  }, []);

  return {
    isSpeechRecognitionActive,
    activateSpeechRecognition,
    deactivateSpeechRecognition
  };
};
