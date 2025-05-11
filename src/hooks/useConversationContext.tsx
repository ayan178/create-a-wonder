import { useRef, useCallback } from "react";

/**
 * Hook for managing conversation context between AI and user
 * @returns Functions and state for conversation context management
 */
export const useConversationContext = () => {
  const conversationContext = useRef<string[]>([]);

  /**
   * Add a message to the conversation context
   * @param role The speaker (e.g., "Candidate", "AI Interviewer")
   * @param message The content of the message
   */
  const addToContext = useCallback((role: string, message: string) => {
    conversationContext.current.push(`${role}: ${message}`);
    
    // Keep context to last 6 messages for better performance
    if (conversationContext.current.length > 6) {
      conversationContext.current = conversationContext.current.slice(-6);
    }
  }, []);

  /**
   * Reset the conversation context
   */
  const resetContext = useCallback(() => {
    conversationContext.current = [];
  }, []);

  /**
   * Get the current conversation context
   * @param currentQuestion Optional current question to include in context
   * @returns The formatted conversation context
   */
  const getContextString = useCallback((currentQuestion?: string) => {
    const contextItems = [];
    
    if (currentQuestion) {
      contextItems.push(`Current question: "${currentQuestion}"`);
    }
    
    return [
      ...contextItems,
      ...conversationContext.current
    ].join("\n\n");
  }, []);

  return {
    addToContext,
    resetContext,
    getContextString
  };
};
