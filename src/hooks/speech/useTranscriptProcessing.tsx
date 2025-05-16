
import { useState, useEffect, useCallback, useRef } from 'react';
import SpeechRecognition, { useSpeechRecognition as useSpeechRecognitionLib } from 'react-speech-recognition';
import { toast } from "@/hooks/use-toast";
import { getIsSpeaking } from "@/utils/speechUtils";

/**
 * Hook for processing speech recognition transcript
 */
export const useTranscriptProcessing = (
  isInterviewActive: boolean,
  onTranscript: (text: string) => void,
) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable
  } = useSpeechRecognitionLib();
  
  const [lastProcessedTranscript, setLastProcessedTranscript] = useState('');
  const silentPeriodTimer = useRef<NodeJS.Timeout | null>(null);
  const firstTranscriptReceived = useRef<boolean>(false);
  const lastActivityTime = useRef<number>(Date.now());
  
  // Configure longer silence detection (10 seconds to 15 seconds)
  const SILENCE_PERIOD = 15000; // Wait 15 seconds of silence before processing
  
  /**
   * Reset transcript and processed state
   */
  const clearTranscript = useCallback(() => {
    resetTranscript();
    setLastProcessedTranscript('');
    firstTranscriptReceived.current = false;
    lastActivityTime.current = Date.now();
  }, [resetTranscript]);

  /**
   * Reset and restart recognition
   */
  const resetAndRestartListening = useCallback(() => {
    // Don't restart if AI is speaking
    if (getIsSpeaking()) {
      console.log("AI is currently speaking, delaying speech recognition restart");
      return;
    }
    
    SpeechRecognition.stopListening().then(() => {
      resetTranscript();
      console.log("Speech recognition reset, restarting...");
      setTimeout(() => {
        SpeechRecognition.startListening({ 
          continuous: true, 
          language: 'en-US',
        }).then(() => {
          console.log("Speech recognition restarted successfully");
          lastActivityTime.current = Date.now();
        }).catch(err => {
          console.error("Failed to restart speech recognition:", err);
          toast({
            title: "Recognition Error",
            description: "Failed to restart speech recognition. Please try again.",
            variant: "destructive"
          });
        });
      }, 1000);
    }).catch(err => {
      console.error("Error resetting speech recognition:", err);
    });
  }, [resetTranscript]);
  
  // Process transcript changes with intelligent chunking
  useEffect(() => {
    if (!isInterviewActive || !transcript) return;
    
    // When first transcript is received
    if (!firstTranscriptReceived.current && transcript.length > 0) {
      firstTranscriptReceived.current = true;
      console.log("First transcript received:", transcript);
      
      toast({
        title: "Transcription active",
        description: "Your speech is being transcribed",
      });
    }
    
    // Update activity timestamp when new transcript is received
    if (transcript !== lastProcessedTranscript) {
      lastActivityTime.current = Date.now();
    }
    
    // Process only after a significant pause (2 seconds)
    // This allows collecting more complete sentences
    const timeoutId = setTimeout(() => {
      if (transcript === lastProcessedTranscript) return;
      
      // Check if enough new text to process
      const newText = transcript.substring(lastProcessedTranscript.length).trim();
      
      if (newText && newText.length >= 5) { // At least 5 chars to process
        console.log("Processing new speech:", newText);
        onTranscript(newText);
        setLastProcessedTranscript(transcript);
      }
    }, 2000); // 2 second debounce for collecting complete phrases
    
    return () => clearTimeout(timeoutId);
  }, [transcript, lastProcessedTranscript, onTranscript, isInterviewActive]);
  
  // Monitor for silent periods with increased duration
  useEffect(() => {
    // Clear previous timer if exists
    if (silentPeriodTimer.current) {
      clearTimeout(silentPeriodTimer.current);
    }
    
    if (isInterviewActive && listening && !getIsSpeaking()) {
      // Set new timer to check if user stopped speaking
      silentPeriodTimer.current = setTimeout(() => {
        const now = Date.now();
        const timeSinceLastActivity = now - lastActivityTime.current;
        
        if (timeSinceLastActivity >= SILENCE_PERIOD && lastProcessedTranscript === transcript) {
          console.log(`Detected ${SILENCE_PERIOD/1000}s silence period. Processing final transcript.`);
          
          // If there's unprocessed transcript, process it now
          if (transcript !== lastProcessedTranscript) {
            const remainingText = transcript.substring(lastProcessedTranscript.length).trim();
            if (remainingText) {
              onTranscript(remainingText);
              setLastProcessedTranscript(transcript);
            }
          }
          
          // Restart recognition to prevent issues with long sessions
          resetAndRestartListening();
        }
      }, SILENCE_PERIOD); // Check after silence period
    }
    
    return () => {
      if (silentPeriodTimer.current) {
        clearTimeout(silentPeriodTimer.current);
      }
    };
  }, [
    listening, 
    isInterviewActive, 
    transcript, 
    lastProcessedTranscript, 
    resetAndRestartListening,
    onTranscript
  ]);
  
  return {
    transcript,
    listening,
    clearTranscript,
    resetTranscript,
    resetAndRestartListening,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable
  };
};
