
import { useCallback, useRef, useState } from "react";
import { TranscriptionState } from "@/types/transcript";

/**
 * Hook for managing real-time transcription during interview
 */
export const useRealTimeTranscription = (
  addToTranscript: (speaker: string, text: string) => void,
  processWithOpenAI: (text: string, currentQuestion: string) => Promise<void>,
  currentQuestion: string
) => {
  // Track the accumulated transcript text
  const accumulatedText = useRef<string>("");
  
  // Transcription state for debugging
  const [transcriptionState, setTranscriptionState] = useState<TranscriptionState>({
    isTranscribing: false,
    lastTranscriptionTime: null,
    transcriptionErrors: 0,
  });
  
  // Debounce timer to avoid processing too frequently
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  // Timeout for no response from AI
  const aiResponseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Callback function for handling real-time transcriptions 
   * @param text The transcribed text from speech recognition
   */
  const handleRealTimeTranscription = useCallback((text: string) => {
    // Update state and log for debugging
    setTranscriptionState(prev => ({
      isTranscribing: true,
      lastTranscriptionTime: Date.now(),
      transcriptionErrors: prev.transcriptionErrors,
    }));
    
    console.log("Received transcription text:", text);
    
    if (text && text.trim()) {
      // Add transcribed text to the transcript UI
      addToTranscript("You", text);
      
      // Accumulate text for better context
      accumulatedText.current = `${accumulatedText.current} ${text}`.trim();
      
      // Clear previous timer if exists
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      
      // Set new timer to process with delay
      debounceTimerRef.current = setTimeout(() => {
        console.log("Processing accumulated text:", accumulatedText.current);
        if (accumulatedText.current.length > 0) {
          processWithOpenAI(accumulatedText.current, currentQuestion)
            .catch(err => {
              console.error("Error processing with OpenAI:", err);
              setTranscriptionState(prev => ({
                ...prev,
                transcriptionErrors: prev.transcriptionErrors + 1
              }));
              
              // Instead of showing toast, just log the error
              if (transcriptionState.transcriptionErrors > 3) {
                console.error("AI Processing Issue: We're having trouble processing your responses. Please check your API key.");
              }
            });
          
          // Reset accumulated text after processing
          accumulatedText.current = "";
          
          // Set timeout for AI response
          if (aiResponseTimeoutRef.current) {
            clearTimeout(aiResponseTimeoutRef.current);
          }
          
          aiResponseTimeoutRef.current = setTimeout(() => {
            console.log("AI response timeout - might need to prompt again");
          }, 15000); // 15 second timeout for AI response
        }
      }, 1500); // 1.5 seconds delay to collect more speech
    } else {
      console.log("Empty transcription received");
    }
  }, [addToTranscript, processWithOpenAI, currentQuestion, transcriptionState.transcriptionErrors]);

  // Function to debug transcription status
  const getTranscriptionStatus = useCallback(() => {
    return {
      ...transcriptionState,
      timeSinceLastTranscription: transcriptionState.lastTranscriptionTime 
        ? Date.now() - transcriptionState.lastTranscriptionTime 
        : null,
      accumulatedTextLength: accumulatedText.current.length
    };
  }, [transcriptionState]);

  // Function to reset the transcription state
  const resetTranscription = useCallback(() => {
    accumulatedText.current = "";
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    if (aiResponseTimeoutRef.current) {
      clearTimeout(aiResponseTimeoutRef.current);
    }
  }, []);

  return {
    handleRealTimeTranscription,
    transcriptionState,
    getTranscriptionStatus,
    resetTranscription
  };
};
