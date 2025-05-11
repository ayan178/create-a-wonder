
import { useEffect, useCallback } from "react";
import { videoRecorder } from "@/utils/videoRecording";
import { toast } from "@/hooks/use-toast";
import { useInterviewState } from "./interview/useInterviewState";
import { useInterviewActions } from "./interview/useInterviewActions";
import { useInterviewQuestions } from "@/hooks/useInterviewQuestions";
import { useAIResponse } from "@/hooks/useAIResponse";
import { useSpeechToText } from "@/hooks/useSpeechToText";
import { useSpeechMonitor } from "./useSpeechMonitor";
import { useInterviewInitialization } from "./useInterviewInitialization";

/**
 * Custom hook for managing interview logic and state
 */
const useInterview = (isSystemAudioOn: boolean) => {
  // Use the interview state hook
  const {
    isInterviewStarted,
    setIsInterviewStarted,
    isRecording,
    setIsRecording,
    videoUrl,
    setVideoUrl,
    transcript,
    addToTranscript,
    navigateToDashboard
  } = useInterviewState();
  
  // Use interview questions hook
  const { 
    currentQuestion, 
    setCurrentQuestion, 
    currentCodingQuestion, 
    showCodingChallenge,
    setShowCodingChallenge,
    advanceToNextQuestion,
    questions,
    codingQuestions,
    resetQuestions
  } = useInterviewQuestions(isSystemAudioOn, addToTranscript);
  
  // Use AI response hook
  const { 
    isProcessingAI, 
    processWithOpenAI,
    resetConversation 
  } = useAIResponse(
    isSystemAudioOn, 
    addToTranscript, 
    advanceToNextQuestion
  );
  
  // Handler for new speech transcription
  const handleSpeechTranscript = useCallback((text: string) => {
    if (!text || text.trim().length < 2) return;
    
    console.log("Speech transcription received:", text);
    addToTranscript("You", text);
    
    // Process with AI for meaningful content (2+ words)
    if (text.trim().split(/\s+/).length >= 2) {
      // Add a small delay to allow for transcript to be displayed
      setTimeout(() => {
        processWithOpenAI(text, currentQuestion)
          .catch(err => console.error("Error processing speech:", err));
      }, 500);
    }
  }, [addToTranscript, processWithOpenAI, currentQuestion]);
  
  // Use speech recognition with the enhanced handler
  const { 
    startListening,
    stopListening,
    clearTranscript: clearSpeechTranscript,
    isListening,
    browserSupportsSpeechRecognition,
    hasMicPermission,
    resetAndRestartListening
  } = useSpeechToText(handleSpeechTranscript, isInterviewStarted);

  // Use speech monitoring hook
  const { 
    isSpeechRecognitionActive, 
    activateSpeechRecognition, 
    deactivateSpeechRecognition 
  } = useSpeechMonitor(
    isInterviewStarted, 
    isProcessingAI, 
    isListening, 
    resetAndRestartListening
  );
  
  // Use interview initialization hook
  const {
    initializeInterview,
    startInterviewRecording
  } = useInterviewInitialization(
    questions,
    setCurrentQuestion,
    resetConversation,
    resetQuestions,
    setIsInterviewStarted,
    setIsRecording,
    addToTranscript,
    clearSpeechTranscript
  );
  
  // Use interview actions hook
  const {
    endInterview,
    speakFirstQuestion
  } = useInterviewActions(
    isSystemAudioOn,
    questions,
    isRecording,
    setIsRecording,
    setVideoUrl,
    navigateToDashboard,
    stopListening,
    deactivateSpeechRecognition
  );

  /**
   * Start the interview and recording
   * @param stream Media stream to record from
   */
  const startInterview = useCallback(async (stream: MediaStream) => {
    try {
      // Initialize interview with first question
      const initialized = await initializeInterview();
      
      if (!initialized) return;
      
      // Start recording
      const recordingStarted = await startInterviewRecording(stream);
      
      if (!recordingStarted) return;
      
      // Speak the first question
      await speakFirstQuestion();
      
      // Start listening for speech after AI finishes speaking
      startListening();
      activateSpeechRecognition();
      console.log("Started listening after AI spoke");
      
      // Add a test message to verify the system is working
      console.log("Interview started successfully");
      toast({
        title: "Interview Started",
        description: "Speak clearly when answering questions",
        duration: 5000,
      });
    } catch (error) {
      console.error("Failed to start interview:", error);
      toast({
        title: "Start failed",
        description: "Could not start interview recording",
        variant: "destructive",
      });
    }
  }, [
    initializeInterview,
    startInterviewRecording,
    speakFirstQuestion,
    startListening,
    activateSpeechRecognition
  ]);

  // Clean up on component unmount
  useEffect(() => {
    return () => {
      if (isRecording) {
        // Attempt to stop recording if component unmounts during recording
        videoRecorder.cleanup();
      }
      stopListening();
      deactivateSpeechRecognition();
    };
  }, [isRecording, stopListening, deactivateSpeechRecognition]);

  return {
    isInterviewStarted,
    isRecording,
    currentQuestion,
    transcript,
    startInterview,
    endInterview,
    currentCodingQuestion,
    showCodingChallenge,
    videoUrl,
    isProcessingAI,
    isListening,
    browserSupportsSpeechRecognition,
    hasMicPermission
  };
};

export { useInterview };
