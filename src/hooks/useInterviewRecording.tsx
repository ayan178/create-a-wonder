
import { useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { videoRecorder } from "@/utils/videoRecording";
import { speakText } from "@/utils/speechUtils";
import { useTranscript } from "@/hooks/useTranscript";
import { useInterviewState } from "@/hooks/useInterviewState";

/**
 * Custom hook for managing interview recording functionality
 */
export const useInterviewRecording = (
  isSystemAudioOn: boolean,
  addToTranscript: (speaker: string, text: string) => void
) => {
  const navigate = useNavigate();
  const { isRecording, startRecording, stopRecording } = useInterviewState();
  
  // Flag to track transcription status
  const transcriptionInProgress = useRef(false);

  /**
   * Generate a complete transcript from the full recording
   * @param audioOrVideoBlob The complete recording blob
   */
  const generateFullTranscript = useCallback(async (audioOrVideoBlob: Blob) => {
    try {
      transcriptionInProgress.current = true;
      console.log("Finalizing transcript: Processing complete interview...");
      
      // Process the complete recording for transcription
      const { transcriptionProcessor } = await import('@/utils/videoRecording');
      
      const result = await transcriptionProcessor.transcribeComplete(audioOrVideoBlob, {
        language: "en", // Default to English
      });
      
      // Parse the result and update transcript with a final, complete version
      if (result.text) {
        // Add a final, complete transcription to the end of the transcript
        addToTranscript("Complete Interview Transcript", result.text);
        console.log("Transcript finalized");
      }
    } catch (error) {
      console.error("Final transcription error:", error);
      console.log("Final transcription incomplete: Could not generate complete transcript");
    } finally {
      transcriptionInProgress.current = false;
    }
  }, [addToTranscript]);

  /**
   * Start the interview recording
   * @param stream Media stream to record from
   * @param initialQuestion First question to ask
   */
  const startInterviewRecording = useCallback(async (
    stream: MediaStream,
    initialQuestion: string
  ) => {
    try {
      // Verify audio tracks are present and active
      const audioTracks = stream.getAudioTracks();
      if (audioTracks.length === 0) {
        console.log("Microphone not detected: Voice recognition requires a microphone");
        return false;
      }
      
      // Log audio track info for debugging
      console.log("Audio tracks available:", audioTracks.length);
      audioTracks.forEach((track, i) => {
        console.log(`Track ${i}:`, track.label, track.enabled, track.readyState);
      });
      
      // Start recording with real-time transcription enabled
      await videoRecorder.startRecording(stream, {
        enableRealTimeTranscription: true,
        transcriptionCallback: (text: string) => {
          // Pass transcribed text to the parent component
          if (text && text.trim()) {
            addToTranscript("You", text);
          }
        }
      });
      
      // Update recording state
      startRecording();
      
      // Add initial AI question to transcript
      addToTranscript("AI Interviewer", initialQuestion);
      
      // Simulate AI speaking the question
      speakText(initialQuestion, isSystemAudioOn);

      // Add a test message to verify transcription is working
      setTimeout(() => {
        console.log("Adding test transcript entry to verify system");
        addToTranscript("System", "Interview recording started. Speak clearly into your microphone.");
      }, 1000);
      
      return true;
    } catch (error) {
      console.error("Failed to start interview:", error);
      console.log("Start failed: Could not start interview recording");
      return false;
    }
  }, [isSystemAudioOn, addToTranscript, startRecording]);

  /**
   * End the interview and save recording
   */
  const endInterviewRecording = useCallback(async () => {
    try {
      if (isRecording) {
        // Stop recording and get the blob
        const recordedBlob = await videoRecorder.stopRecording();
        stopRecording();
        
        // Save the recording and get the URL
        const url = await videoRecorder.saveRecording(recordedBlob);
        stopRecording(url);
        
        // Final transcription of the full recording for completeness
        if (!transcriptionInProgress.current) {
          generateFullTranscript(recordedBlob);
        }
        
        console.log("Interview completed: Recording saved successfully");
      }
      
      return true;
    } catch (error) {
      console.error("Error ending interview:", error);
      console.log("Error: Failed to end interview properly");
      return false;
    }
  }, [isRecording, stopRecording, generateFullTranscript]);

  return {
    startInterviewRecording,
    endInterviewRecording,
    isRecording
  };
};
