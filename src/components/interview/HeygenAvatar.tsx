
import React, { useEffect, useRef, useState } from "react";
import { heygenService } from "@/services/HeygenService";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../ui/dialog";
import { toast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

interface HeygenAvatarProps {
  isSpeaking: boolean;
  isListening: boolean;
  isInterviewStarted: boolean;
}

const HeygenAvatar: React.FC<HeygenAvatarProps> = ({ 
  isSpeaking, 
  isListening,
  isInterviewStarted
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [showApiKeyDialog, setShowApiKeyDialog] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Initialize the avatar when the component mounts
  useEffect(() => {
    if (videoRef.current) {
      heygenService.initializeVideoElement(videoRef.current);
      
      // Check if API key is already configured
      if (!heygenService.isConfigured()) {
        setShowApiKeyDialog(true);
      } else {
        setIsReady(true);
      }
    }
    
    return () => {
      // Clean up when component unmounts
      heygenService.stopStream();
    };
  }, []);

  // Start streaming when the interview begins
  useEffect(() => {
    const startAvatarStream = async () => {
      if (isInterviewStarted && isReady && videoRef.current) {
        setIsLoading(true);
        const success = await heygenService.startStream();
        setIsLoading(false);
        
        if (!success) {
          toast({
            title: "Avatar initialization failed",
            description: "Could not start the AI avatar. Using fallback instead.",
          });
        }
      }
    };
    
    startAvatarStream();
  }, [isInterviewStarted, isReady]);

  const handleSaveApiKey = async () => {
    if (!apiKey.trim()) {
      toast({
        title: "API Key Required",
        description: "Please enter your Heygen API key",
        variant: "destructive",
      });
      return;
    }

    heygenService.setApiKey(apiKey.trim());
    setShowApiKeyDialog(false);
    setIsReady(true);
    
    toast({
      title: "API Key Saved",
      description: "Heygen API key configured successfully",
    });
  };

  return (
    <>
      <div className="relative w-full h-full flex flex-col items-center justify-center">
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-background/60 z-0"></div>
        <div className="absolute left-0 right-0 bottom-0 h-32 bg-gradient-to-t from-background/80 to-transparent z-0"></div>
        
        {/* Heygen Avatar container */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 w-full h-full flex flex-col items-center justify-center"
        >
          <div className="relative">
            <div className={`rounded-full bg-primary/10 p-1 mb-4 overflow-hidden ${
              isSpeaking ? 'border-2 border-primary animate-pulse' : 
              isListening ? 'border-2 border-green-400 animate-pulse' : ''
            }`}>
              {(!isInterviewStarted || isLoading || !heygenService.getIsStreaming()) && (
                <div className="rounded-full overflow-hidden" style={{ width: '250px', height: '250px' }}>
                  <img 
                    src="/images.jpg" 
                    alt="AI Interviewer Avatar" 
                    className="w-full h-full object-cover"
                  />
                  {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                      <div className="w-12 h-12 border-4 border-t-primary rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>
              )}
              
              {isInterviewStarted && !isLoading && (
                <div className="rounded-full overflow-hidden" style={{ width: '250px', height: '250px' }}>
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    muted
                    playsInline
                    autoPlay
                  />
                </div>
              )}
            </div>
            
            {/* Speaking indicator */}
            <AnimatePresence>
              {isSpeaking && (
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
          </div>
          
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
        </motion.div>
      </div>
      
      {/* API Key Dialog */}
      <Dialog open={showApiKeyDialog} onOpenChange={setShowApiKeyDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Heygen API Key Required</DialogTitle>
            <DialogDescription>
              Enter your Heygen API key to enable the animated avatar feature.
              You can get an API key by signing up at <a href="https://www.heygen.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">heygen.com</a>.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              id="apiKey"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your Heygen API key"
              className="w-full"
            />
          </div>
          <DialogFooter>
            <Button onClick={handleSaveApiKey} className="w-full">
              Save API Key
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default HeygenAvatar;
