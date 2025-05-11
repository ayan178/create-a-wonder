
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/components/ThemeProvider';

const testimonials = [
  {
    id: 1,
    name: 'Alex Johnson',
    role: 'Software Engineer at Google',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFjZXxlbnwwfHwwfHx8MA%3D%3D',
    rating: 5,
    text: "The AI interview practice platform completely transformed my interview preparation. I was struggling with technical interviews, but after practicing with this tool, I landed my dream job at Google. The feedback was accurate and incredibly helpful.",
    company: 'Google',
    jobType: 'Technical Interview'
  },
  {
    id: 2,
    name: 'Sarah Martinez',
    role: 'Product Manager at Microsoft',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmFjZXxlbnwwfHwwfHx8MA%3D%3D',
    rating: 5,
    text: "I was nervous about my product management interviews until I found this platform. The AI asked me challenging questions and provided detailed feedback on my responses. It helped me refine my storytelling and product sense, which was exactly what I needed.",
    company: 'Microsoft',
    jobType: 'Product Management'
  },
  {
    id: 3,
    name: 'Michael Wang',
    role: 'Data Scientist at Amazon',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZmFjZXxlbnwwfHwwfHx8MA%3D%3D',
    rating: 4,
    text: "As someone transitioning into data science, I needed a way to practice technical interviews. This platform provided realistic scenarios and questions. The AI\"s ability to assess my technical explanations was impressive and helped me identify areas to improve.",
    company: 'Amazon',
    jobType: 'Data Science'
  },
  {
    id: 4,
    name: 'Emily Chen',
    role: 'UX Designer at Apple',
    image: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZmFjZXxlbnwwfHwwfHx8MA%3D%3D',
    rating: 5,
    text: "The design-specific interview questions and feedback were exactly what I needed to prepare for my UX role. The platform helped me articulate my design decisions and process clearly, which impressed my interviewers at Apple.",
    company: 'Apple',
    jobType: 'Design Interview'
  },
  {
    id: 5,
    name: 'David Kumar',
    role: 'Front-End Developer at Meta',
    image: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGZhY2V8ZW58MHx8MHx8fDA%3D',
    rating: 5,
    text: "I used this platform to prepare for my front-end developer interviews, and it was a game-changer. The technical questions were challenging and relevant. The platform\"s feedback helped me improve how I explain my coding decisions.",
    company: 'Meta',
    jobType: 'Technical Interview'
  }
];

const TestimonialCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const { theme } = useTheme();
  
  const nextTestimonial = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  // Reduced auto-rotation interval for better performance
  useEffect(() => {
    // Start auto-rotation
    intervalRef.current = window.setInterval(() => {
      nextTestimonial();
    }, 12000); // Increased from 8000ms to 12000ms
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);
  
  // Reset interval when manually navigating
  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = window.setInterval(() => {
        nextTestimonial();
      }, 12000); // Increased from 8000ms to 12000ms
    }
  }, [activeIndex]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        type: 'spring',
        stiffness: 80, // Reduced from 100
        damping: 15
      }
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
      transition: {
        duration: 0.5
      }
    })
  };

  // Generate star rating
  const renderStars = (count: number) => {
    return [...Array(count)].map((_, i) => (
      <Star key={i} className="h-5 w-5 fill-brand-secondary text-brand-secondary" />
    ));
  };

  return (
    <motion.div 
      className="relative py-20 md:py-32 overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      id="testimonials"
    >
      {/* Simplified background pattern */}
      <div className="absolute inset-0 z-0 opacity-10 bg-gradient-to-br from-brand-primary/10 to-transparent"></div>
      
      {/* Reduced decorative elements */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-brand-secondary/10 rounded-full filter blur-3xl opacity-30"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-brand-primary/10 rounded-full filter blur-3xl opacity-30"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            What Our Users Say
          </motion.h2>
          <motion.div 
            className="w-24 h-2 bg-brand-secondary mx-auto rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          />
        </div>
        
        <div className="relative max-w-5xl mx-auto">
          <div className="relative h-[500px] md:h-[400px]">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
                  {/* Left side - Testimonial */}
                  <div className="bg-white dark:bg-brand-primary/20 p-8 rounded-2xl shadow-xl relative flex flex-col justify-between border border-brand-secondary/20">
                    <div>
                      <div className="absolute top-6 right-6 text-brand-secondary opacity-30">
                        <Quote size={48} />
                      </div>
                      
                      <div className="flex items-center mb-6">
                        <div className="mr-4">
                          <img 
                            src={testimonials[activeIndex].image} 
                            alt={testimonials[activeIndex].name}
                            className="w-16 h-16 rounded-full object-cover border-2 border-brand-secondary"
                          />
                        </div>
                        <div>
                          <h3 className="font-bold text-xl">{testimonials[activeIndex].name}</h3>
                          <p className="text-sm opacity-70">{testimonials[activeIndex].role}</p>
                          <div className="flex mt-1">
                            {renderStars(testimonials[activeIndex].rating)}
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-lg mb-6 italic">"{testimonials[activeIndex].text}"</p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="border-brand-primary/30">
                        {testimonials[activeIndex].jobType}
                      </Badge>
                      <img 
                        src={`https://logo.clearbit.com/${testimonials[activeIndex].company.toLowerCase()}.com`}
                        alt={testimonials[activeIndex].company}
                        className="h-8 grayscale hover:grayscale-0 transition-all"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                  </div>
                  
                  {/* Right side - Stats/Animated elements */}
                  <div className="bg-brand-primary text-white p-8 rounded-2xl shadow-xl relative overflow-hidden flex flex-col justify-center">
                    {/* Simplified animated background elements */}
                    <div className="absolute top-0 right-0 w-40 h-40 bg-brand-secondary/10 rounded-full filter blur-xl"></div>
                    <div className="absolute bottom-0 left-0 w-40 h-40 bg-brand-secondary/5 rounded-full filter blur-xl"></div>
                    
                    <div className="relative z-10">
                      <h3 className="text-2xl font-bold mb-8">Why Candidates Love Us</h3>
                      
                      <div className="space-y-8">
                        <div className="flex items-start">
                          <div className="bg-white/10 p-3 rounded-full mr-4">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#FFE600" stroke="#FFE600" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-bold text-xl mb-1">98% Success Rate</h4>
                            <p className="opacity-70">Candidates who practiced with us landed their target roles.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="bg-white/10 p-3 rounded-full mr-4">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 8V16M8 12H16" stroke="#FFE600" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <circle cx="12" cy="12" r="10" stroke="#FFE600" strokeWidth="2"/>
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-bold text-xl mb-1">50+ Interview Types</h4>
                            <p className="opacity-70">From technical to behavioral interviews across industries.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="bg-white/10 p-3 rounded-full mr-4">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M20 7L12 3L4 7M20 7V17L12 21M20 7L12 11M12 21L4 17V7M12 21V11M4 7L12 11" stroke="#FFE600" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-bold text-xl mb-1">AI-Powered Feedback</h4>
                            <p className="opacity-70">Personalized insights to improve your performance.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Navigation controls */}
          <div className="flex justify-center mt-8 items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-brand-primary/30 hover:bg-brand-primary/10 hover:border-brand-primary"
              onClick={prevTestimonial}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > activeIndex ? 1 : -1);
                    setActiveIndex(index);
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeIndex 
                      ? "bg-brand-secondary w-8" 
                      : "bg-gray-300 dark:bg-gray-600"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-brand-primary/30 hover:bg-brand-primary/10 hover:border-brand-primary"
              onClick={nextTestimonial}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCarousel;
