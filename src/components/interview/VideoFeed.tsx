
import React, { RefObject, useEffect, useState } from "react";
import { UserCheck, MicOff, Mic, Volume2, VolumeX } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import VideoControls from "./VideoControls";

interface VideoFeedProps {
  videoRef: RefObject<HTMLVideoElement>;
  isVideoOn: boolean;
  isAudioOn: boolean;
  isSystemAudioOn: boolean;
  toggleVideo: () => void;
  toggleAudio: () => void;
  toggleSystemAudio: () => void;
  isRecording?: boolean;
  isListening?: boolean;
  requestMediaPermissions?: () => Promise<void>;
  lastTranscribed?: string;
}

/**
 * VideoFeed component for displaying the candidate's video feed
 */
const VideoFeed = ({
  videoRef,
  isVideoOn,
  isAudioOn,
  isSystemAudioOn,
  toggleVideo,
  toggleAudio,
  toggleSystemAudio,
  isRecording = false,
  isListening = false,
  requestMediaPermissions,
  lastTranscribed = ""
}: VideoFeedProps) => {
  const [showTranscribed, setShowTranscribed] = useState(false);
  
  // Show the transcribed text briefly when it changes
  useEffect(() => {
    if (lastTranscribed) {
      setShowTranscribed(true);
      const timer = setTimeout(() => {
        setShowTranscribed(false);
      }, 5000); // Hide after 5 seconds
      
      return () => clearTimeout(timer);
    }
  }, [lastTranscribed]);
  
  return (
    <Card className="relative glass-morphism border-primary/10">
      <CardContent className="p-2 aspect-video relative">
        {/* Warning for audio being off during recording */}
        {isRecording && !isAudioOn && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-background/90 p-4 rounded-md z-10 text-center">
            <MicOff className="mx-auto mb-2 text-red-500" size={32} />
            <p className="font-medium">Microphone is off</p>
            <p className="text-sm text-muted-foreground">Your voice will not be recorded</p>
            <Button 
              onClick={toggleAudio} 
              variant="default" 
              size="sm" 
              className="mt-2"
            >
              Enable Microphone
            </Button>
          </div>
        )}
        
        {/* Main video element that displays the user's camera feed */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover rounded-md"
        />
        
        {/* Live transcription overlay */}
        {isRecording && showTranscribed && lastTranscribed && (
          <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 bg-background/80 backdrop-blur-sm p-3 rounded-lg max-w-[90%] text-center">
            <p className="text-sm font-medium">{lastTranscribed}</p>
          </div>
        )}
        
        {/* Video controls for toggling camera, microphone, and system audio */}
        <VideoControls
          isVideoOn={isVideoOn}
          isAudioOn={isAudioOn}
          isSystemAudioOn={isSystemAudioOn}
          toggleVideo={toggleVideo}
          toggleAudio={toggleAudio}
          toggleSystemAudio={toggleSystemAudio}
        />
        
        {/* Video status indicators */}
        <div className="absolute top-4 left-4 flex items-center gap-2 p-1 px-2 bg-background/70 backdrop-blur-sm rounded-full">
          {isRecording ? (
            <>
              {/* Recording indicator */}
              <span className="animate-pulse w-2 h-2 bg-red-500 rounded-full"></span>
              <span className="text-xs font-medium text-red-500">REC</span>
            </>
          ) : (
            <>
              {/* Live indicator when not recording */}
              <span className="animate-pulse w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="text-xs font-medium">LIVE</span>
            </>
          )}
        </div>
        
        {/* Speech recognition status */}
        {isRecording && (
          <div className="absolute top-4 left-24 flex items-center gap-2 p-1 px-2 bg-background/70 backdrop-blur-sm rounded-full">
            {isListening ? (
              <>
                <Mic className="h-3 w-3 text-green-500" />
                <span className="text-xs font-medium text-green-500">Listening</span>
              </>
            ) : (
              <>
                <MicOff className="h-3 w-3 text-yellow-500" />
                <span className="text-xs font-medium text-yellow-500">Not listening</span>
              </>
            )}
          </div>
        )}
        
        {/* AI voice indicator */}
        {isRecording && (
          <div className="absolute top-4 right-16 flex items-center gap-2 p-1 px-2 bg-background/70 backdrop-blur-sm rounded-full">
            {isSystemAudioOn ? (
              <>
                <Volume2 className="h-3 w-3 text-green-500" />
                <span className="text-xs font-medium text-green-500">AI Voice On</span>
              </>
            ) : (
              <>
                <VolumeX className="h-3 w-3 text-yellow-500" />
                <span className="text-xs font-medium text-yellow-500">AI Voice Off</span>
              </>
            )}
          </div>
        )}
        
        {/* User indicator */}
        <div className="absolute top-4 right-4 flex items-center gap-2 p-1 px-2 bg-background/70 backdrop-blur-sm rounded-full">
          <UserCheck size={14} className="text-green-500" />
          <span className="text-xs font-medium">You</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoFeed;
