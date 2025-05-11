
import React, { useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import HeroSection from "@/components/home/HeroSection";
import VideoTutorialSection from "@/components/home/VideoTutorialSection";
import InstructionSection from "@/components/home/InstructionSection";
import VideoCarousel from "@/components/VideoCarousel";

const Index = () => {
  const testimonialRef = useRef<HTMLDivElement>(null);
  const tutorialRef = useRef<HTMLDivElement>(null);

  // Function to scroll to testimonials section
  const scrollToTestimonials = () => {
    testimonialRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Function to scroll to tutorial section
  const scrollToTutorial = () => {
    tutorialRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />
      
      <main className="flex-grow flex flex-col relative z-10">
        <div className="container mx-auto">
          <HeroSection />
        </div>
        
        {/* Video Tutorial Section */}
        <div ref={tutorialRef}>
          <VideoTutorialSection />
        </div>
        
        {/* Instruction Section */}
        <InstructionSection />
        
        {/* Video Carousel Section */}
        <div className="bg-background py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Video Resources</h2>
              <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
                Explore our video resources to learn more about interview techniques and strategies
              </p>
            </div>
            <VideoCarousel />
          </div>
        </div>
        
        {/* Testimonial Section */}
        <div ref={testimonialRef} id="testimonials">
          <TestimonialCarousel />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
