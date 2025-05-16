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

  const [lastTranscribed, setLastTranscribed] = useState("");

  useEffect(() => {
    const checkBackendStatus = async () => {
      try {
        const response = await fetch("/api/health");
        if (response.ok) {
          const data = await response.json();
          setBackendReady(true);
          setApiKeyConfigured(data.api_key_configured);
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

  useEffect(() => {
    if (transcript.length > 0) {
      const lastEntry = transcript[transcript.length - 1];
      if (lastEntry.speaker === "You") {
        setLastTranscribed(lastEntry.text);
      }
    }
  }, [transcript]);

  const handleApiKeySuccess = () => {
    setApiKeyConfigured(true);
  };

  /**
   * Start interview and preserve live video
   */
  const handleStartInterview = async () => {
    if (!mediaStream) {
      if (requestMediaPermissions) {
        try {
          await requestMediaPermissions();
        } catch (error) {
          console.error("Please allow camera and mic access.");
          return;
        }
      }

      if (!mediaStream) {
        console.error("Media stream unavailable.");
        return;
      }
    }

    // Re-assign stream to video tag before recording
    if (videoRef.current && mediaStream) {
      videoRef.current.srcObject = mediaStream;
      await videoRef.current.play();
    }

    if (!browserSupportsSpeechRecognition) {
      console.warn("Speech recognition may not work in this browser.");
    }

    const clonedStream = mediaStream.clone();
    await startInterview(clonedStream);
  };

  if (backendReady === true && apiKeyConfigured === false) {
    return (
      <EnhancedBackground intensity="light" variant="default">
        <div className="flex flex-col min-h-screen p-4 justify-center items-center">
          <ApiKeySetup onSuccess={handleApiKeySuccess} />
        </div>
      </EnhancedBackground>
    );
  }

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

  if (backendReady === false) {
    return (
      <EnhancedBackground intensity="light" variant="default">
        <div className="flex flex-col min-h-screen p-4 justify-center items-center">
          <Card className="w-full max-w-md">
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="w-16 h-16 text-destructive mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold">Backend Connection Error</h2>
              <p className="text-center text-muted-foreground mt-2">
                Could not connect to the Flask backend. Please make sure it's running at http://localhost:5000.
              </p>
            </CardContent>
          </Card>
        </div>
      </EnhancedBackground>
    );
  }

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
