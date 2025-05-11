
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { videoRecorder } from "@/utils/videoRecording";
import { toast } from "@/hooks/use-toast";
import { useTranscriptionHandling } from "./useTranscriptionHandling";

/**
 * Hook for handling interview recording start and end
 */
export const useInterviewRecordingLogic = (
  addToTranscript: (speaker: string, text: string) => void,
  handleRealTimeTranscription: (blob: Blob) => void, // Fixed: Changed type to match expected Blob
  setIsRecording: (isRecording: boolean) => void,
  setVideoUrl: (url: string | null) => void
) => {
  const navigate = useNavigate();
  const { generateFullTranscript, isTranscriptionInProgress } = useTranscriptionHandling(addToTranscript);

  /**
   * Start the interview recording
   * @param stream Media stream to record from
   */
  const startRecording = useCallback(async (stream: MediaStream) => {
    try {
      // Verify audio tracks are present and active
      const audioTracks = stream.getAudioTracks();
      if (audioTracks.length === 0) {
        toast({
          title: "Microphone not detected",
          description: "Voice recognition requires a microphone. Please connect one and try again.",
          variant: "destructive",
        });
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
          // Handle text transcriptions directly
          console.log("Received transcription text:", text);
          
          // If we have text, add it to the transcript
          if (text && typeof text === 'string') {
            // For demonstration, add the transcribed text to the transcript
            console.log("Adding transcribed text to transcript");
            
            // For backward compatibility with the expected Blob interface in parent components
            // Create a text blob with the transcribed text
            const textBlob = new Blob([text], { type: 'text/plain' });
            
            // Pass the blob to the handler
            handleRealTimeTranscription(textBlob);
          }
        }
      });
      
      // Update recording state
      setIsRecording(true);

      // Add a test message to verify transcription is working
      setTimeout(() => {
        console.log("Adding test transcript entry to verify system");
        addToTranscript("System", "Interview recording started. Speak clearly into your microphone.");
      }, 1000);

      return true;
    } catch (error) {
      console.error("Failed to start recording:", error);
      toast({
        title: "Start failed",
        description: "Could not start interview recording",
        variant: "destructive",
      });
      return false;
    }
  }, [addToTranscript, handleRealTimeTranscription, setIsRecording]);

  /**
   * End the interview and save recording
   */
  const endRecording = useCallback(async () => {
    try {
      // Stop recording and get the blob
      const recordedBlob = await videoRecorder.stopRecording();
      setIsRecording(false);
      
      // Save the recording and get the URL
      const url = await videoRecorder.saveRecording(recordedBlob);
      setVideoUrl(url);
      
      // Final transcription of the full recording for completeness
      if (!isTranscriptionInProgress()) {
        generateFullTranscript(recordedBlob);
      }
      
      toast({
        title: "Interview completed",
        description: "Recording saved successfully",
      });
      
      // Navigate back to dashboard
      navigate("/candidate/dashboard");
      return true;
    } catch (error) {
      console.error("Error ending interview:", error);
      toast({
        title: "Error",
        description: "Failed to end interview properly",
        variant: "destructive",
      });
      navigate("/candidate/dashboard");
      return false;
    }
  }, [generateFullTranscript, isTranscriptionInProgress, navigate, setIsRecording, setVideoUrl]);

  return {
    startRecording,
    endRecording
  };
};
