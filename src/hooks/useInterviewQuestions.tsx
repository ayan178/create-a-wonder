
import { useState, useCallback } from "react";
import { speakText } from "@/utils/speechUtils";

/**
 * Hook for managing interview questions
 */
const useInterviewQuestions = (
  isSystemAudioOn: boolean,
  addToTranscript: (speaker: string, text: string) => void
) => {
  // Interview questions - defined statically for this demo
  const [questions] = useState([
    "Tell me a little about yourself and your background.",
    "What interests you about this position?",
    "What are your greatest strengths that make you suitable for this role?",
    "Can you describe a challenging situation you faced at work and how you handled it?",
    "Where do you see yourself professionally in five years?",
  ]);

  // Coding questions - defined statically for this demo
  const [codingQuestions] = useState([
    "Write a function that finds the longest substring without repeating characters in a given string.",
    "Implement a function to check if a given string is a palindrome.",
    "Create a function that reverses a linked list.",
    "Write a function to find the missing number in an array of integers from 1 to n.",
    "Implement a binary search algorithm to find a target value in a sorted array.",
  ]);
  
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [currentCodingQuestion, setCurrentCodingQuestion] = useState("");
  const [showCodingChallenge, setShowCodingChallenge] = useState(false);

  /**
   * Advance to the next interview question
   */
  const advanceToNextQuestion = useCallback(() => {
    // Get index of current question
    const currentIndex = questions.indexOf(currentQuestion);
    
    // Move to the next question if available
    if (currentIndex < questions.length - 1) {
      const nextQuestion = questions[currentIndex + 1];
      setCurrentQuestion(nextQuestion);
      
      // Add next question to transcript
      addToTranscript("AI Interviewer", nextQuestion);
      
      // Speak the next question
      speakText(nextQuestion, isSystemAudioOn);
      
      // After the third question, introduce coding challenge
      if (currentIndex === 2) {
        setTimeout(() => {
          const codingIntro = "Now let's move on to a coding challenge. Please switch to the coding tab to solve the problem.";
          addToTranscript("AI Interviewer", codingIntro);
          speakText(codingIntro, isSystemAudioOn);
          setShowCodingChallenge(true);
        }, 1500);
      }
    } else {
      // End of interview message
      const endMessage = "Thank you for your time. The interview is now complete.";
      addToTranscript("AI Interviewer", endMessage);
      speakText(endMessage, isSystemAudioOn);
    }
  }, [currentQuestion, questions, addToTranscript, isSystemAudioOn]);
  
  /**
   * Reset interview questions to initial state
   */
  const resetQuestions = useCallback(() => {
    setCurrentQuestion("");
    setCurrentCodingQuestion("");
    setShowCodingChallenge(false);
  }, []);

  return {
    questions,
    codingQuestions,
    currentQuestion,
    setCurrentQuestion,
    currentCodingQuestion,
    setCurrentCodingQuestion,
    showCodingChallenge,
    setShowCodingChallenge,
    advanceToNextQuestion,
    resetQuestions
  };
};

export { useInterviewQuestions };
