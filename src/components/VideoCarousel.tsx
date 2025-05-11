import React, { useRef, useState, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";

const carouselData = [
  {
    id: 1,
    title: "Mock Interview For Software Engineering",
    video: "/WhatsApp Video 2025-04-10 at 03.57.49_10143aa7 (online-video-cutter.com).mp4"
  },
  {
    id: 2,
    title: "How To Ace Your Data Science Interview",
    video: "/WhatsApp Video 2025-04-10 at 04.30.16_65d61047 (online-video-cutter.com).mp4"
  },
  {
    id: 3,
    title: "Product Management Interview Tips",
    video: "/WhatsApp Video 2025-04-10 at 04.30.19_21c3faf8 (online-video-cutter.com).mp4"
  },
  {
    id: 4,
    title: "UI/UX Design Interview Best Practices",
    video: "/WhatsApp Video 2025-04-10 at 04.30.19_a4e9d891 (online-video-cutter.com).mp4"
  },
  {
    id: 5,
    title: "Machine Learning Interview Questions",
    video: "/WhatsApp Video 2025-04-10 at 04.32.59_362c7b7b (online-video-cutter.com).mp4"
  },
];

const VideoCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState<boolean[]>(Array(carouselData.length).fill(false));
  const videoRefs = useRef<(HTMLVideoElement | null)[]>(Array(carouselData.length).fill(null));
  const carouselRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const nextSlide = () => {
    pauseAllVideos();
    setActiveIndex((prevIndex) => (prevIndex + 1) % carouselData.length);
  };

  const prevSlide = () => {
    pauseAllVideos();
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? carouselData.length - 1 : prevIndex - 1
    );
  };

  const pauseAllVideos = () => {
    videoRefs.current.forEach((videoRef, index) => {
      if (videoRef) {
        videoRef.pause();
        const newIsPlaying = [...isPlaying];
        newIsPlaying[index] = false;
        setIsPlaying(newIsPlaying);
      }
    });
  };

  const togglePlayVideo = (index: number) => {
    if (videoRefs.current[index]) {
      const video = videoRefs.current[index];
      if (video) {
        if (isPlaying[index]) {
          video.pause();
        } else {
          pauseAllVideos();
          video.play();
        }
        
        const newIsPlaying = [...isPlaying];
        newIsPlaying[index] = !isPlaying[index];
        setIsPlaying(newIsPlaying);
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPlaying.some(playing => playing)) {
        nextSlide();
      }
    }, 8000);
    
    return () => clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => {
    if (isInView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" }
      });
    }
  }, [controls, isInView]);

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      className="relative w-full max-w-5xl mx-auto mt-20 mb-24 overflow-hidden rounded-2xl shadow-xl"
    >
      <div className="relative h-[400px] md:h-[500px] bg-brand-primary/5">
        <div className={`absolute -top-10 -left-10 w-40 h-40 rounded-full ${isDark ? 'bg-brand-secondary/10' : 'bg-brand-secondary/20'} blur-3xl`}></div>
        <div className={`absolute -bottom-10 -right-10 w-40 h-40 rounded-full ${isDark ? 'bg-brand-primary/10' : 'bg-brand-primary/20'} blur-3xl`}></div>
        
        <motion.div 
          ref={carouselRef}
          className="flex h-full"
          animate={{ x: `-${activeIndex * 100}%` }}
          transition={{ type: "spring", stiffness: 80, damping: 20 }}
        >
          {carouselData.map((item, index) => (
            <div key={item.id} className="relative min-w-full h-full">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30 z-10"></div>
              
              <video 
                ref={el => videoRefs.current[index] = el}
                src={item.video}
                poster={`${item.video}#t=0.5`}
                className="w-full h-full object-cover"
                playsInline
                preload="metadata"
              />
              
              <div className="absolute bottom-0 left-0 p-6 z-20 w-full">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: activeIndex === index ? 1 : 0, y: activeIndex === index ? 0 : 20 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-white text-2xl md:text-3xl font-bold mb-4">{item.title}</h2>
                  <div className="flex space-x-4">
                    <Button 
                      className="bg-brand-secondary text-brand-primary hover:bg-brand-secondary/90 flex items-center gap-2"
                      onClick={() => togglePlayVideo(index)}
                    >
                      <Play className="h-4 w-4" />
                      {isPlaying[index] ? 'Pause' : 'Play Video'}
                    </Button>
                    <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                      Learn More
                    </Button>
                  </div>
                </motion.div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm hover:bg-white/30 rounded-full z-30 border-white/20 text-white shadow-md"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      
      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm hover:bg-white/30 rounded-full z-30 border-white/20 text-white shadow-md"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
        {carouselData.map((_, index) => (
          <button
            key={index}
            className={`h-2 rounded-full transition-all duration-500 ${
              index === activeIndex ? "bg-brand-secondary w-8" : "bg-white/50 w-2"
            }`}
            onClick={() => {
              pauseAllVideos();
              setActiveIndex(index);
            }}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </motion.div>
  );
};

export default VideoCarousel;
