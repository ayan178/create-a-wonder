
import { useEffect, useCallback, useRef } from 'react';
import { useTranscriptProcessing } from './speech/useTranscriptProcessing';
import { useSpeechRecognition } from './speech/useSpeechRecognition';
import { getIsSpeaking } from '@/utils/speechUtils';

/**
 * A hook for speech-to-text functionality with improved silence detection
 */
export function useSpeechToText(
  onTranscript: (text: string) => void,
  isInterviewActive: boolean = false
) {
  // Silence detection configuration
  const silenceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastSpeechTimeRef = useRef<number>(Date.now());
  const MIN_SILENCE_BEFORE_PROCESSING = 3000; // Wait 3 seconds of silence before processing
  
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
  
  // Use our transcript processing hook with the enhanced transcript handler
  const {
    transcript,
    listening,
    clearTranscript,
    resetTranscript,
    resetAndRestartListening,
    isMicrophoneAvailable
  } = useTranscriptProcessing(isInterviewActive, (text) => {
    // Reset the silence timer whenever we get new speech
    if (text.trim()) {
      lastSpeechTimeRef.current = Date.now();
      
      // Clear any existing timeout
      if (silenceTimeoutRef.current) {
        clearTimeout(silenceTimeoutRef.current);
      }
      
      // Set a new timeout to process after silence
      silenceTimeoutRef.current = setTimeout(() => {
        console.log(`${MIN_SILENCE_BEFORE_PROCESSING/1000}s silence detected, processing transcript`);
        onTranscript(text);
      }, MIN_SILENCE_BEFORE_PROCESSING);
    }
  });
  
  // Check microphone permission on mount
  useEffect(() => {
    checkMicPermission();
  }, [checkMicPermission]);

  // Stop listening when AI is speaking
  useEffect(() => {
    const checkSpeakingInterval = setInterval(() => {
      const aiIsSpeaking = getIsSpeaking();
      
      if (aiIsSpeaking && listening) {
        console.log("AI is speaking, temporarily pausing recognition");
        stopListening();
      } else if (!aiIsSpeaking && isInterviewActive && !listening && !isRecognitionActive) {
        console.log("AI stopped speaking, resuming recognition");
        startListening();
      }
    }, 300);
    
    return () => {
      clearInterval(checkSpeakingInterval);
      if (silenceTimeoutRef.current) {
        clearTimeout(silenceTimeoutRef.current);
      }
    };
  }, [listening, isInterviewActive, isRecognitionActive, startListening, stopListening]);
  
  // Auto-start listening when interview becomes active with exponential backoff
  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    
    if (isInterviewActive && !isRecognitionActive && !getIsSpeaking()) {
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
