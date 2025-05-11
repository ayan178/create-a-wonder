
import React, { useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";

const VideoTutorialSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Animation when component comes into view
  React.useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <div className="py-16 md:py-24 bg-background" id="tutorial">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="text-center mb-10"
        >
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            See Our AI Interview Platform in Action
          </h2>
          <p className={`max-w-2xl mx-auto text-lg ${isDark ? 'text-white/80' : 'text-gray-600'}`}>
            Watch this quick tutorial to learn how our platform can help you ace your interviews
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mx-auto max-w-4xl rounded-2xl overflow-hidden shadow-2xl"
        >
          <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-r from-brand-primary/30 to-transparent' : 'bg-gradient-to-r from-brand-primary/10 to-transparent'} z-10 pointer-events-none`}></div>
          
          <video
            ref={videoRef}
            className="w-full aspect-video object-cover"
            poster="/WhatsApp Video 2025-04-10 at 04.30.16_65d61047 (online-video-cutter.com).mp4#t=0.5"
            muted={isMuted}
            playsInline
            preload="metadata"
          >
            <source src="/WhatsApp Video 2025-04-10 at 04.30.16_65d61047 (online-video-cutter.com).mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-black/80 to-transparent z-20">
            <div className="flex justify-between items-center">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20 rounded-full"
                onClick={handlePlayPause}
                aria-label={isPlaying ? "Pause video" : "Play video"}
              >
                {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20 rounded-full"
                onClick={handleMuteToggle}
                aria-label={isMuted ? "Unmute video" : "Mute video"}
              >
                {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VideoTutorialSection;
