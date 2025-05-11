
import React from "react";
import { Button } from "@/components/ui/button";
import { Camera, CameraOff, Mic, MicOff, Volume2, VolumeX } from "lucide-react";

interface VideoControlsProps {
  isVideoOn: boolean;
  isAudioOn: boolean;
  isSystemAudioOn: boolean;
  toggleVideo: () => void;
  toggleAudio: () => void;
  toggleSystemAudio: () => void;
}

const VideoControls = ({
  isVideoOn,
  isAudioOn,
  isSystemAudioOn,
  toggleVideo,
  toggleAudio,
  toggleSystemAudio,
}: VideoControlsProps) => {
  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 p-2 bg-background/70 backdrop-blur-sm rounded-full">
      <Button 
        onClick={toggleVideo} 
        variant="ghost" 
        size="icon" 
        className={`rounded-full ${!isVideoOn ? 'bg-red-500/20 text-red-500' : ''}`}
      >
        {isVideoOn ? <Camera size={18} /> : <CameraOff size={18} />}
      </Button>
      
      <Button 
        onClick={toggleAudio} 
        variant="ghost" 
        size="icon" 
        className={`rounded-full ${!isAudioOn ? 'bg-red-500/20 text-red-500' : ''}`}
      >
        {isAudioOn ? <Mic size={18} /> : <MicOff size={18} />}
      </Button>
      
      <Button 
        onClick={toggleSystemAudio} 
        variant="ghost" 
        size="icon" 
        className={`rounded-full ${!isSystemAudioOn ? 'bg-red-500/20 text-red-500' : ''}`}
      >
        {isSystemAudioOn ? <Volume2 size={18} /> : <VolumeX size={18} />}
      </Button>
    </div>
  );
};

export default VideoControls;
