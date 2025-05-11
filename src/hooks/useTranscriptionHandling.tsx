import { useRef, useCallback } from "react";
import { OpenAIService } from "@/services/OpenAIService";
import { toast } from "@/hooks/use-toast";

const openAIService = new OpenAIService();

/**
 * Hook for handling transcription-related functionality
 */
export const useTranscriptionHandling = (addToTranscript: (speaker: string, text: string) => void) => {
  // References to keep track of transcription status
  const transcriptionInProgress = useRef(false);

  /**
   * Generate a complete transcript from the full recording
   * @param audioOrVideoBlob The complete recording blob
   */
  const generateFullTranscript = useCallback(async (audioOrVideoBlob: Blob) => {
    try {
      transcriptionInProgress.current = true;
      toast({
        title: "Finalizing transcript",
        description: "Processing complete interview...",
      });
      
      // Send the complete recording to OpenAI for transcription
      const result = await openAIService.transcribe(audioOrVideoBlob, {
        language: "en", // Default to English
      });
      
      // Parse the result and update transcript with a final, complete version
      if (result.text) {
        // Add a final, complete transcription to the end of the transcript
        addToTranscript("Complete Interview Transcript", result.text);
        
        toast({
          title: "Transcript finalized",
          description: "Complete interview transcript has been created",
        });
      }
    } catch (error) {
      console.error("Final transcription error:", error);
      toast({
        title: "Final transcription incomplete",
        description: "Could not generate complete transcript from recording",
        variant: "destructive",
      });
    } finally {
      transcriptionInProgress.current = false;
    }
  }, [addToTranscript]);

  /**
   * Check if transcription is currently in progress
   */
  const isTranscriptionInProgress = useCallback(() => {
    return transcriptionInProgress.current;
  }, []);

  return {
    generateFullTranscript,
    isTranscriptionInProgress
  };
};
