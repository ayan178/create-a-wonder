
import { useState, useRef, useEffect, useCallback } from "react";
import { toast } from "@/components/ui/use-toast";

export const useInterviewMedia = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isSystemAudioOn, setIsSystemAudioOn] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  
  // New state to expose media stream to other components
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);

  // Initialize user media stream
  useEffect(() => {
    const initializeMedia = async () => {
      try {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          const stream = await navigator.mediaDevices.getUserMedia({ 
            video: isVideoOn, 
            audio: isAudioOn 
          });
          
          mediaStreamRef.current = stream;
          setMediaStream(stream);
          
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }

          // Check specifically if audio tracks are available
          const audioTracks = stream.getAudioTracks();
          if (audioTracks.length === 0) {
            console.warn("No audio tracks available");
          }
        } else {
          console.error("getUserMedia is not supported in this browser");
        }
        
        // Set loading to false after a small delay
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
        
      } catch (error) {
        console.error("Error accessing media devices:", error);
        setIsLoading(false);
        
        if (error instanceof DOMException && error.name === "NotAllowedError") {
          console.log("User denied permission for media devices");
        }
      }
    };

    initializeMedia();
    
    return () => {
      // Clean up media streams when component unmounts
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop());
        mediaStreamRef.current = null;
        setMediaStream(null);
      }
    };
  }, []);

  // Toggle video
  const toggleVideo = useCallback(async () => {
    const stream = mediaStreamRef.current;
    
    if (stream) {
      const videoTracks = stream.getVideoTracks();
      if (videoTracks.length > 0) {
        const isEnabled = videoTracks[0].enabled;
        videoTracks.forEach(track => {
          track.enabled = !isEnabled;
        });
        setIsVideoOn(!isVideoOn);
      } else if (isVideoOn) {
        // Need to get video access
        try {
          const newStream = await navigator.mediaDevices.getUserMedia({ video: true });
          const videoTrack = newStream.getVideoTracks()[0];
          stream.addTrack(videoTrack);
          setIsVideoOn(true);
        } catch (error) {
          console.error("Could not access camera.", error);
          toast({
            title: "Camera Access Failed",
            description: "Could not access your camera.",
            variant: "destructive",
          });
        }
      }
    }
  }, [isVideoOn]);

  // Toggle audio
  const toggleAudio = useCallback(async () => {
    const stream = mediaStreamRef.current;
    
    if (stream) {
      const audioTracks = stream.getAudioTracks();
      if (audioTracks.length > 0) {
        const isEnabled = audioTracks[0].enabled;
        audioTracks.forEach(track => {
          track.enabled = !isEnabled;
        });
        setIsAudioOn(!isAudioOn);
      } else if (isAudioOn) {
        // Need to get audio access
        try {
          const newStream = await navigator.mediaDevices.getUserMedia({ audio: true });
          const audioTrack = newStream.getAudioTracks()[0];
          stream.addTrack(audioTrack);
          setIsAudioOn(true);
        } catch (error) {
          console.error("Could not access microphone.", error);
          toast({
            title: "Microphone Access Failed",
            description: "Could not access your microphone.",
            variant: "destructive",
          });
        }
      }
    }
  }, [isAudioOn]);

  // Toggle system audio
  const toggleSystemAudio = useCallback(() => {
    setIsSystemAudioOn(prev => !prev);
  }, []);

  // Function to request media permissions again
  const requestMediaPermissions = useCallback(async () => {
    setIsLoading(true);
    try {
      // Explicitly request both audio and video permissions
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: true, 
        video: true 
      });
      
      // Update refs and state
      mediaStreamRef.current = stream;
      setMediaStream(stream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      
      setIsVideoOn(true);
      setIsAudioOn(true);
      
      toast({
        title: "Permissions Granted",
        description: "Microphone and camera access successful.",
      });
    } catch (error) {
      console.error("Error requesting media permissions:", error);
      toast({
        title: "Permission Request Failed",
        description: "Could not get access to your camera and microphone.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
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
  };
};
