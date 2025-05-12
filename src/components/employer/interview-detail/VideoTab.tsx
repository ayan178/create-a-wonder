
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, Download, Volume2, VolumeX } from "lucide-react";

const VideoTab = ({ videoUrl }: { videoUrl?: string }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Use a placeholder URL if no video URL is provided
  const effectiveVideoUrl = videoUrl || "/placeholder.mp4";

  const handlePlayPause = () => {
    if (!videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play()
        .catch(err => console.error("Error playing video:", err));
    }
    
    setIsPlaying(!isPlaying);
  };

  const handleMuteToggle = () => {
    if (!videoRef.current) return;
    
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleDownload = () => {
    if (videoUrl) {
      // Create a temporary anchor to trigger download
      const a = document.createElement('a');
      a.href = videoUrl;
      a.download = `interview-recording-${new Date().toISOString().slice(0, 10)}.mp4`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <div className="space-y-4">
      <div className="aspect-video bg-black/80 rounded-md flex items-center justify-center relative overflow-hidden">
        {videoUrl ? (
          // Render actual video when URL is provided
          <video 
            ref={videoRef}
            src={videoUrl}
            className="w-full h-full"
            onEnded={() => setIsPlaying(false)}
            onError={(e) => console.error("Video error:", e)}
            playsInline
          />
        ) : (
          // Render placeholder when no video URL
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white/50 text-sm">No interview recording available</span>
          </div>
        )}
        
        {/* Play button overlay */}
        {!isPlaying && videoUrl && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <Button 
              size="lg" 
              className="rounded-full h-14 w-14"
              onClick={handlePlayPause}
            >
              <Play className="h-6 w-6" />
            </Button>
          </div>
        )}
      </div>
      
      <div className="flex items-center gap-2">
        <Button 
          className="flex-1"
          onClick={handlePlayPause}
          disabled={!videoUrl}
        >
          {isPlaying ? (
            <>
              <Pause className="h-4 w-4 mr-1" />
              Pause
            </>
          ) : (
            <>
              <Play className="h-4 w-4 mr-1" />
              Play Interview
            </>
          )}
        </Button>
        
        <Button 
          variant="outline"
          onClick={handleMuteToggle}
          disabled={!videoUrl}
        >
          {isMuted ? (
            <VolumeX className="h-4 w-4" />
          ) : (
            <Volume2 className="h-4 w-4" />
          )}
        </Button>
        
        <Button 
          variant="outline"
          onClick={handleDownload}
          disabled={!videoUrl}
        >
          <Download className="h-4 w-4 mr-1" />
          Download
        </Button>
      </div>
    </div>
  );
};

export default VideoTab;
