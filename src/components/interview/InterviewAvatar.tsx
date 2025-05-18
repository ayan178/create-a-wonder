
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface InterviewAvatarProps {
  isInterviewStarted: boolean;
  currentQuestion: string;
  isSystemAudioOn: boolean;
  isSpeaking: boolean;
  isListening: boolean;
}

const InterviewAvatar: React.FC<InterviewAvatarProps> = ({ 
  isInterviewStarted, 
  currentQuestion,
  isSystemAudioOn,
  isSpeaking,
  isListening
}) => {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-background/60 z-0"></div>
      <div className="absolute left-0 right-0 bottom-0 h-32 bg-gradient-to-t from-background/80 to-transparent z-0"></div>
      
      {/* AI avatar container */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="rounded-full bg-primary/10 p-1 mb-4">
            <div className={`rounded-full overflow-hidden border-4 ${
              isSpeaking && isSystemAudioOn ? 'border-primary animate-pulse' : 
              isListening ? 'border-green-400 animate-pulse' : 'border-primary/30'
            }`} style={{ width: '250px', height: '250px' }}>
              <img 
                src="/images.jpg" 
                alt="AI Interviewer Avatar" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* Speaking indicator */}
          <AnimatePresence>
            {isSpeaking && isSystemAudioOn && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute bottom-2 right-2 bg-primary text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                Speaking
              </motion.div>
            )}
          </AnimatePresence>

          {/* Listening indicator */}
          <AnimatePresence>
            {isListening && !isSpeaking && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute bottom-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                Listening
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        
        {/* AI name and role */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center"
        >
          <h2 className="text-xl font-semibold">Anna</h2>
          <p className="text-sm text-muted-foreground">AI Interview Assistant</p>
        </motion.div>
      </div>
    </div>
  );
};

export default InterviewAvatar;
