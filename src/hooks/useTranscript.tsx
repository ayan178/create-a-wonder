
import { useState, useCallback } from "react";
import { Transcript } from "@/types/transcript";

/**
 * Hook for managing interview transcript
 */
export const useTranscript = () => {
  const [transcript, setTranscript] = useState<Transcript[]>([]);

  /**
   * Add a message to the transcript
   * @param speaker Who is speaking
   * @param text What they said
   */
  const addToTranscript = useCallback((speaker: string, text: string) => {
    setTranscript(prev => [...prev, {
      speaker,
      text,
      timestamp: new Date()
    }]);
  }, []);

  return {
    transcript,
    setTranscript,
    addToTranscript
  };
};
