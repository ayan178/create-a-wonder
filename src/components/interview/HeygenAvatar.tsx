
import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertCircle, Check } from "lucide-react";
import { heygenService } from "@/services/HeygenService";
import { toast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

interface HeygenAvatarProps {
  isInterviewStarted: boolean;
  currentQuestion: string;
  isSystemAudioOn: boolean;
  isSpeaking: boolean;
  isListening: boolean;
  currentAudioText?: string;
}

const HeygenAvatar: React.FC<HeygenAvatarProps> = ({ 
  isInterviewStarted, 
  currentQuestion,
  isSystemAudioOn,
  isSpeaking,
  isListening,
  currentAudioText
}) => {
  // State
  const [isConfigured, setIsConfigured] = useState<boolean | null>(null);
  const [isConfiguring, setIsConfiguring] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  
  // Refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const lastTextRef = useRef<string>("");
  
  // Check if Heygen is configured on mount
  useEffect(() => {
    const checkConfig = async () => {
      const configured = await heygenService.isConfigured();
      setIsConfigured(configured);
    };
    
    checkConfig();
  }, []);
  
  // Process audio text updates
  useEffect(() => {
    if (
      currentAudioText && 
      isSpeaking && 
      isSystemAudioOn && 
      currentAudioText.length > 10 &&
      currentAudioText !== lastTextRef.current
    ) {
      console.log("Creating new streaming session for:", currentAudioText);
      lastTextRef.current = currentAudioText;
      createStreamingVideo(currentAudioText);
    }
  }, [currentAudioText, isSpeaking, isSystemAudioOn]);
  
  // Handle API key setup
  const handleApiKeySubmit = async () => {
    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please enter your Heygen API key",
        variant: "destructive",
      });
      return;
    }
    
    setIsConfiguring(true);
    
    try {
      const success = await heygenService.setApiKey(apiKey);
      
      if (success) {
        setIsConfigured(true);
        toast({
          title: "Success",
          description: "Heygen API key configured successfully",
        });
      } else {
        toast({
          title: "Configuration Failed",
          description: "Could not configure Heygen API key",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error configuring API key:", error);
      toast({
        title: "Error",
        description: "An error occurred while setting up the API key",
        variant: "destructive",
      });
    } finally {
      setIsConfiguring(false);
    }
  };
  
  // Create streaming video
  const createStreamingVideo = async (text: string) => {
    if (!isConfigured || isStreaming) return;
    
    try {
      setIsStreaming(true);
      
      const session = await heygenService.createStreamingSession(text);
      
      if (session && session.url) {
        const proxyUrl = heygenService.getProxiedStreamUrl(session.url);
        setVideoUrl(proxyUrl);
        
        // Play the video if ref is available
        if (videoRef.current) {
          videoRef.current.load();
          const playPromise = videoRef.current.play();
          
          if (playPromise !== undefined) {
            playPromise.catch(error => {
              console.error("Error playing video:", error);
            });
          }
        }
      }
    } catch (error) {
      console.error("Error creating streaming video:", error);
    } finally {
      setIsStreaming(false);
    }
  };
  
  // Check if we need to show the configuration form
  if (isConfigured === false) {
    return (
      <Card className="glass-morphism h-full">
        <CardContent className="flex flex-col items-center justify-center h-full p-6 gap-4">
          <AlertCircle className="h-12 w-12 text-amber-500" />
          <h3 className="text-xl font-semibold text-center">Heygen API Configuration</h3>
          <p className="text-center text-muted-foreground">
            To use the Heygen avatar, please enter your API key below
          </p>
          
          <div className="w-full max-w-sm space-y-2 mt-4">
            <Input
              type="password" 
              placeholder="Heygen API Key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full"
            />
            
            <Button 
              onClick={handleApiKeySubmit} 
              disabled={isConfiguring || !apiKey} 
              className="w-full"
            >
              {isConfiguring ? (
                <>
                  <div className="spinner mr-2"></div>
                  Configuring...
                </>
              ) : (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Configure API Key
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  // Loading state
  if (isConfigured === null) {
    return (
      <div className="relative w-full h-full flex flex-col items-center justify-center">
        <div className="w-8 h-8 border-4 border-t-primary rounded-full animate-spin"></div>
        <p className="mt-2 text-sm text-muted-foreground">Checking configuration...</p>
      </div>
    );
  }
  
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-background/60 z-0"></div>
      <div className="absolute left-0 right-0 bottom-0 h-32 bg-gradient-to-t from-background/80 to-transparent z-0"></div>
      
      {/* AI avatar container */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="rounded-full bg-primary/10 p-1 mb-4">
            <div className={`rounded-full overflow-hidden border-4 ${
              isSpeaking && isSystemAudioOn ? 'border-primary animate-pulse' : 
              isListening ? 'border-green-400 animate-pulse' : 'border-primary/30'
            }`} style={{ width: '250px', height: '250px' }}>
              {videoUrl && isConfigured ? (
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  autoPlay
                  playsInline
                  muted
                >
                  <source src={videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img 
                  src="/images.jpg" 
                  alt="AI Interviewer Avatar" 
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </div>
          
          {/* Speaking indicator */}
          <AnimatePresence>
            {isSpeaking && isSystemAudioOn && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute bottom-2 right-2 bg-primary text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                Speaking
              </motion.div>
            )}
          </AnimatePresence>

          {/* Listening indicator */}
          <AnimatePresence>
            {isListening && !isSpeaking && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute bottom-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                Listening
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        
        {/* AI name and role */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center"
        >
          <h2 className="text-xl font-semibold">Anna</h2>
          <p className="text-sm text-muted-foreground">AI Interview Assistant</p>
        </motion.div>
      </div>
    </div>
  );
};

export default HeygenAvatar;
