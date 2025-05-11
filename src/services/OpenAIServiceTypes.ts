
/**
 * Types for OpenAI service operations
 */

export interface TranscriptionOptions {
  language?: string;
  prompt?: string;
  temperature?: number;
  response_format?: string;
}

export interface TranscriptionResult {
  text: string;
  language?: string;
  duration?: number;
}

export interface ConversationOptions {
  temperature?: number;
  maxTokens?: number;
  systemPrompt?: string;
  model?: string;
}

export interface TextToSpeechOptions {
  voice?: string;  // nova, alloy, echo, fable, onyx, shimmer
  speed?: number;
  pitch?: number;
  format?: string;
  model?: string;  // tts-1, tts-1-hd
}
