
import "regenerator-runtime/runtime";
import { useState, useCallback, useEffect } from 'react';
import SpeechRecognition from 'react-speech-recognition';
import { requestAudioPermission } from "@/utils/speechUtils";
import { toast } from "@/hooks/use-toast";

/**
 * Hook for managing speech recognition start and stop
 */
export const useSpeechRecognition = () => {
  const [isRecognitionActive, setIsRecognitionActive] = useState(false);
  const [hasMicPermission, setHasMicPermission] = useState<boolean | null>(null);
  const [startAttempts, setStartAttempts] = useState(0);
  const [lastStartTime, setLastStartTime] = useState<number | null>(null);
  
  // Check browser support
  const browserSupportsSpeechRecognition = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
  
  /**
   * Start speech recognition with retry logic
   */
  const startListening = useCallback(async () => {
    if (!browserSupportsSpeechRecognition) {
      console.error('Browser does not support speech recognition');
      toast({
        title: "Browser not supported",
        description: "Your browser doesn't support speech recognition. Try Chrome or Edge.",
        variant: "destructive",
      });
      return;
    }
    
    // Check/request permission if needed
    if (hasMicPermission === null || hasMicPermission === false) {
      const hasPermission = await requestAudioPermission();
      setHasMicPermission(hasPermission);
      
      if (!hasPermission) {
        toast({
          title: "Microphone access needed",
          description: "Please allow microphone access for speech recognition."
        });
        return;
      }
    }
    
    // Prevent rapid restart attempts
    const now = Date.now();
    if (lastStartTime && now - lastStartTime < 2000) {
      console.log("Throttling speech recognition start attempts");
      return;
    }
    
    setLastStartTime(now);
    setStartAttempts(prev => prev + 1);
    
    try {
      console.log("Starting speech recognition...");
      // Use continuous mode with long sessions to avoid breaks
      await SpeechRecognition.startListening({ 
        continuous: true, 
        language: 'en-US',
      });
      
      setIsRecognitionActive(true);
      console.log('Started listening for speech');
      
      toast({
        title: "Listening started",
        description: "Speak clearly to begin transcription",
      });
      
      // Reset attempt counter on successful start
      setStartAttempts(0);
    } catch (error) {
      console.error('Error starting speech recognition:', error);
      
      // Check for permission issues
      if (!hasMicPermission) {
        toast({
          title: "Microphone access needed",
          description: "Please allow microphone access for speech recognition."
        });
      }
    }
  }, [browserSupportsSpeechRecognition, hasMicPermission, lastStartTime]);
  
  /**
   * Stop speech recognition
   */
  const stopListening = useCallback(() => {
    if (isRecognitionActive) {
      console.log('Stopping speech recognition');
      SpeechRecognition.stopListening();
      setIsRecognitionActive(false);
    }
  }, [isRecognitionActive]);
  
  /**
   * Check microphone permission
   */
  const checkMicPermission = useCallback(async () => {
    const hasPermission = await requestAudioPermission();
    setHasMicPermission(hasPermission);
    
    if (!hasPermission) {
      console.warn("Microphone permission not granted");
      toast({
        title: "Microphone access needed",
        description: "Please allow microphone access for speech recognition."
      });
    } else {
      console.log("Microphone permission granted!");
    }
    
    return hasPermission;
  }, []);

  // Check for permission on mount
  useEffect(() => {
    checkMicPermission();
  }, [checkMicPermission]);

  return {
    isRecognitionActive,
    browserSupportsSpeechRecognition,
    hasMicPermission,
    startAttempts,
    startListening,
    stopListening,
    checkMicPermission
  };
};
