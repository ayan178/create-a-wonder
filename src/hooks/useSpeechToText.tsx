
import { useEffect, useCallback } from 'react';
import { useTranscriptProcessing } from './speech/useTranscriptProcessing';
import { useSpeechRecognition } from './speech/useSpeechRecognition';

/**
 * A hook for speech-to-text functionality
 */
export function useSpeechToText(
  onTranscript: (text: string) => void,
  isInterviewActive: boolean = false
) {
  // Use our speech recognition hooks
  const {
    isRecognitionActive,
    browserSupportsSpeechRecognition,
    hasMicPermission,
    startAttempts,
    startListening,
    stopListening,
    checkMicPermission
  } = useSpeechRecognition();
  
  // Use our transcript processing hook
  const {
    transcript,
    listening,
    clearTranscript,
    resetTranscript,
    resetAndRestartListening,
    isMicrophoneAvailable
  } = useTranscriptProcessing(isInterviewActive, onTranscript);
  
  // Check microphone permission on mount
  useEffect(() => {
    checkMicPermission();
  }, [checkMicPermission]);
  
  // Check for recognition errors or silent periods
  useEffect(() => {
    if (isInterviewActive && !listening && isRecognitionActive) {
      // Only restart after multiple failures to avoid false positives
      if (startAttempts > 3) {
        console.warn("Speech recognition stopped unexpectedly. Attempting to restart...");
        // Add small delay before restart
        setTimeout(() => {
          startListening();
        }, 1000);
      }
    }
  }, [listening, isInterviewActive, isRecognitionActive, startAttempts, startListening]);
  
  // Auto-start listening when interview becomes active with exponential backoff
  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    
    if (isInterviewActive && !isRecognitionActive) {
      const delay = Math.min(1000 * Math.pow(2, startAttempts), 10000);
      timeoutId = setTimeout(() => {
        startListening();
      }, delay);
    } else if (!isInterviewActive && isRecognitionActive) {
      stopListening();
    }
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isInterviewActive, isRecognitionActive, startAttempts, startListening, stopListening]);
  
  return {
    isListening: listening,
    currentTranscript: transcript,
    startListening,
    stopListening,
    clearTranscript,
    resetTranscript,
    browserSupportsSpeechRecognition,
    hasMicPermission,
    resetAndRestartListening
  };
}
