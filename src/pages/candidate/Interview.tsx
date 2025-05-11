
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import InterviewHeader from "@/components/interview/InterviewHeader";
import InterviewAvatar from "@/components/interview/InterviewAvatar";
import VideoFeed from "@/components/interview/VideoFeed";
import QuestionCard from "@/components/interview/QuestionCard";
import InterviewTabs from "@/components/interview/InterviewTabs";
import { useInterviewMedia } from "@/hooks/useInterviewMedia";
import { useInterview } from "@/hooks/useInterview";
import { Card, CardContent } from "@/components/ui/card";
import EnhancedBackground from "@/components/EnhancedBackground";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ApiKeySetup } from "@/components/interview/ApiKeySetup";
import { backendService } from "@/services/api/BackendService";

/**
 * Main Interview Page Component
 * Facilitates an AI-powered interview experience with real-time video, 
 * transcription, and AI-generated responses
 */
const InterviewPage = () => {
  const [backendReady, setBackendReady] = useState<boolean | null>(null);
  const [apiKeyConfigured, setApiKeyConfigured] = useState<boolean | null>(null);
  
  const { 
    videoRef, 
    isVideoOn, 
    isAudioOn, 
    isSystemAudioOn, 
    isLoading, 
    toggleVideo, 
    toggleAudio, 
    toggleSystemAudio,
    mediaStream,
    requestMediaPermissions
  } = useInterviewMedia();
  
  const { 
    isInterviewStarted, 
    isRecording,
    isProcessingAI,
    currentQuestion, 
    transcript,
    startInterview,
    endInterview,
    currentCodingQuestion,
    browserSupportsSpeechRecognition,
    isListening
  } = useInterview(isSystemAudioOn);

  // Check backend status on component mount
  useEffect(() => {
    const checkBackendStatus = async () => {
      try {
        const response = await fetch("/api/health");
        if (response.ok) {
          const data = await response.json();
          setBackendReady(true);
          setApiKeyConfigured(data.api_key_configured);
          console.log("Backend health check:", data);
        } else {
          setBackendReady(false);
          setApiKeyConfigured(false);
        }
      } catch (error) {
        console.error("Backend connection error:", error);
        setBackendReady(false);
        setApiKeyConfigured(false);
      }
    };

    checkBackendStatus();
  }, []);

  // Debug state to show speech recognition status
  const [lastTranscribed, setLastTranscribed] = useState("");
  
  // Effect to monitor transcription updates
  useEffect(() => {
    if (transcript.length > 0) {
      const lastEntry = transcript[transcript.length - 1];
      if (lastEntry.speaker === "You") {
        setLastTranscribed(lastEntry.text);
      }
    }
  }, [transcript]);

  // Handle API key setup success
  const handleApiKeySuccess = () => {
    setApiKeyConfigured(true);
  };

  /**
   * Start interview with recording when user clicks start button
   * Checks if media stream is available
   */
  const handleStartInterview = async () => {
    if (!mediaStream) {
      // Try requesting permissions silently
      if (requestMediaPermissions) {
        try {
          await requestMediaPermissions();
        } catch (error) {
          console.error("Camera access needed: Please allow camera and microphone access to continue.");
          return;
        }
      }
      
      // If still no media stream, log error
      if (!mediaStream) {
        console.error("Camera access needed: Please allow camera and microphone access to continue.");
        return;
      }
    }
    
    // Check if browser supports speech recognition
    if (!browserSupportsSpeechRecognition) {
      console.info("Browser compatibility: For best experience, use Chrome, Edge, or Safari for speech recognition.");
    }
    
    // Start interview logic with media stream for recording
    await startInterview(mediaStream);
  };

  // Show API key setup if backend is ready but API key isn't configured
  if (backendReady === true && apiKeyConfigured === false) {
    return (
      <EnhancedBackground intensity="light" variant="default">
        <div className="flex flex-col min-h-screen p-4 justify-center items-center">
          <ApiKeySetup onSuccess={handleApiKeySuccess} />
        </div>
      </EnhancedBackground>
    );
  }

  // Show loading message while checking backend status
  if (backendReady === null) {
    return (
      <EnhancedBackground intensity="light" variant="default">
        <div className="flex flex-col min-h-screen p-4 justify-center items-center">
          <Card className="w-full max-w-md">
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="w-16 h-16 border-4 border-t-primary rounded-full animate-spin mb-4"></div>
              <h2 className="text-xl font-semibold">Connecting to backend...</h2>
              <p className="text-muted-foreground">Please wait while we establish connection</p>
            </CardContent>
          </Card>
        </div>
      </EnhancedBackground>
    );
  }

  // Show error message if backend is not ready
  if (backendReady === false) {
    return (
      <EnhancedBackground intensity="light" variant="default">
        <div className="flex flex-col min-h-screen p-4 justify-center items-center">
          <Card className="w-full max-w-md">
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="w-16 h-16 text-destructive mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
              </div>
              <h2 className="text-xl font-semibold">Backend Connection Error</h2>
              <p className="text-center text-muted-foreground mt-2">
                Could not connect to the Flask backend. Please make sure it's running at http://localhost:5000.
              </p>
              <div className="mt-6 p-4 bg-muted rounded-md text-sm">
                <p className="font-mono">Running Flask backend:</p>
                <p className="font-mono mt-2">1. Navigate to flask_backend folder</p>
                <p className="font-mono">2. Run: pip install -r requirements.txt</p>
                <p className="font-mono">3. Run: python app.py</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </EnhancedBackground>
    );
  }

  // Main interview interface
  return (
    <EnhancedBackground intensity="light" variant="default">
      <div className="flex flex-col min-h-screen relative z-10">
        <div className="absolute top-4 right-4 z-50">
          <ThemeToggle />
        </div>
        
        <InterviewHeader 
          onEndInterview={endInterview} 
          isRecording={isRecording} 
          isProcessingAI={isProcessingAI} 
        />
        
        <main className="flex-1 flex flex-col md:flex-row gap-4 p-4 overflow-auto container mx-auto">
          {/* Left side - AI Avatar */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full md:w-1/2 flex flex-col gap-4"
          >
            <Card className="relative overflow-hidden glass-morphism border-primary/10 h-[calc(100vh-300px)]"> 
              <CardContent className="p-0 h-full flex flex-col justify-center items-center">
                <InterviewAvatar 
                  isInterviewStarted={isInterviewStarted}
                  currentQuestion={currentQuestion} 
                  isSystemAudioOn={isSystemAudioOn}
                />
              </CardContent>
            </Card>
            
            <QuestionCard 
              isInterviewStarted={isInterviewStarted}
              currentQuestion={currentQuestion}
              startInterview={handleStartInterview}
              isLoading={isLoading}
            />
          </motion.div>
          
          {/* Right side - Video feed and tabs for transcript/coding */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full md:w-1/2 flex flex-col gap-4"
          >
            <VideoFeed 
              videoRef={videoRef}
              isVideoOn={isVideoOn}
              isAudioOn={isAudioOn}
              isSystemAudioOn={isSystemAudioOn}
              toggleVideo={toggleVideo}
              toggleAudio={toggleAudio}
              toggleSystemAudio={toggleSystemAudio}
              isRecording={isRecording}
              isListening={isListening}
              lastTranscribed={lastTranscribed}
            />
            
            <InterviewTabs 
              transcript={transcript}
              codingQuestion={currentCodingQuestion}
            />
          </motion.div>
        </main>
      </div>
    </EnhancedBackground>
  );
};

export default InterviewPage;
