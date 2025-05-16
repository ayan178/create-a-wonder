
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, Download, Pause, Volume2, VolumeX } from "lucide-react";
import { Slider } from "@/components/ui/slider";

const VideoTab = ({ videoUrl }: { videoUrl?: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  const handleDownload = () => {
    if (videoUrl) {
      const a = document.createElement('a');
      a.href = videoUrl;
      a.download = `interview-recording-${new Date().toISOString()}.webm`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <div className="space-y-4">
      <div className="aspect-video bg-black/80 rounded-md flex items-center justify-center relative overflow-hidden">
        {videoUrl ? (
          <video 
            ref={videoRef}
            src={videoUrl}
            className="w-full h-full object-contain"
            onEnded={() => setIsPlaying(false)}
          />
        ) : (
          <span className="text-white/50 text-sm">Interview video preview</span>
        )}

        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <Button 
              size="lg" 
              className="rounded-full h-14 w-14"
              onClick={togglePlay}
            >
              <Play className="h-6 w-6" />
            </Button>
          </div>
        )}
      </div>
      
      <div className="flex flex-col space-y-2">
        <div className="flex items-center gap-2">
          <Button onClick={togglePlay} className="flex-1">
            {isPlaying ? (
              <>
                <Pause className="h-4 w-4 mr-1" />
                Pause
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-1" />
                Play Full Interview
              </>
            )}
          </Button>
          <Button variant="outline" onClick={handleDownload} disabled={!videoUrl}>
            <Download className="h-4 w-4 mr-1" />
            Download
          </Button>
        </div>

        {videoUrl && (
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8" 
              onClick={toggleMute}
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </Button>
            <Slider 
              value={[isMuted ? 0 : volume]} 
              min={0} 
              max={1} 
              step={0.01} 
              onValueChange={handleVolumeChange}
              className="flex-1"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoTab;
