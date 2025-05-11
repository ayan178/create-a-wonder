
import { OpenAIService } from "@/services/OpenAIService";
import { toast } from "@/hooks/use-toast";
import { ConversationOptions } from "@/services/OpenAIServiceTypes";

// Create a single instance of the service
const openAIService = new OpenAIService();

/**
 * Process user input with OpenAI to generate interviewer response
 * @param contextString The conversation context
 * @param currentQuestion The current interview question
 * @param options Options for AI processing
 * @returns The AI response text
 */
export const processAIResponse = async (
  contextString: string,
  currentQuestion: string,
  options: ConversationOptions = {}
): Promise<string> => {
  try {
    console.log(`Processing context with current question: "${currentQuestion}"`);
    
    // Process with OpenAI
    const aiResponse = await openAIService.generateResponse(
      contextString,
      currentQuestion,
      { 
        temperature: options.temperature ?? 0.7,
        systemPrompt: options.systemPrompt ?? 
          `You are an AI interviewer conducting a job interview. 
          Your name is AI Interviewer. You are currently asking: "${currentQuestion}"
          Respond naturally to the candidate's answer. Keep your response brief (2-3 sentences maximum).
          Be conversational but professional. Ask thoughtful follow-up questions when appropriate.
          You must respond in complete sentences, even if the candidate's answer is unclear.
          If the candidate's answer shows they are done with this topic, end with "Let's move on to the next question."
          If the candidate's answer is unclear, ask them to clarify.
          IMPORTANT: Don't repeat yourself. Never say "Thank you for sharing" or similar phrases repeatedly.`,
        maxTokens: options.maxTokens ?? 250,
        model: options.model ?? "gpt-4o-mini"
      }
    );
    
    console.log("AI Response received:", aiResponse);
    return aiResponse;
  } catch (error) {
    console.error("AI processing error:", error);
    toast({
      title: "AI Processing Error",
      description: "Failed to generate AI response. Please check your API key.",
      variant: "destructive",
    });
    throw error;
  }
};

/**
 * Determine if a response indicates to move to next question
 * @param response The AI response text
 * @returns Boolean indicating if should move to next question
 */
export const shouldAdvanceToNextQuestion = (response: string): boolean => {
  const lowerResponse = response.toLowerCase();
  return lowerResponse.includes("next question") || 
         lowerResponse.includes("let's move on") ||
         lowerResponse.includes("move on to") ||
         lowerResponse.includes("next topic");
};
