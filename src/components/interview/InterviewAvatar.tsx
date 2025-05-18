
import React from "react";
import HeygenAvatar from "./HeygenAvatar";

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
    <HeygenAvatar 
      isSpeaking={isSpeaking && isSystemAudioOn}
      isListening={isListening}
      isInterviewStarted={isInterviewStarted}
    />
  );
};

export default InterviewAvatar;
