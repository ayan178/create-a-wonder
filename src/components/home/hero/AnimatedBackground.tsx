
import React, { useRef, useEffect } from "react";
import { useTheme } from "@/components/ThemeProvider";

interface AnimatedBackgroundProps {
  mousePosition: { x: number; y: number };
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    // Remove the 'loop' attribute by setting it to false
    if (videoRef.current) {
      videoRef.current.loop = false;
    }
  }, []);
  
  return (
    <div className="absolute inset-0 overflow-hidden w-full h-full z-0">
      {/* Video background - removed 'loop' attribute */}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="absolute object-cover w-full h-full"
      >
        <source 
          src="/WhatsApp Video 2025-04-10 at 03.57.49_10143aa7 (online-video-cutter.com).mp4"
          type="video/mp4"
        />
      </video>
      
      {/* Gradient overlay */}
      <div className={`absolute inset-0 ${
        isDark 
          ? 'bg-gradient-to-r from-background via-background/80 to-transparent'
          : 'bg-gradient-to-r from-white via-white/90 to-transparent'
      }`}></div>
      
      {/* Additional texture overlay */}
      <div className={`absolute inset-0 ${
        isDark ? 'bg-grid-white/5' : 'bg-grid-black/10'
      } opacity-20`}></div>

      {/* Regular style tag */}
      <style>
        {`.bg-grid-white {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(255 255 255 / 0.05)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e");
        }
        .bg-grid-black {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(0 0 0 / 0.05)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e");
        }`}
      </style>
    </div>
  );
};

export default AnimatedBackground;
