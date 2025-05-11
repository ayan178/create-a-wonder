
/**
 * Mock implementation to use when backend connection fails
 * This provides fallback functionality when the backend is unavailable
 */

import { TranscriptionResult, ConversationOptions, TextToSpeechOptions } from './OpenAIServiceTypes';

/**
 * Mock implementation of OpenAI service functions for offline/fallback scenarios
 */
export class MockOpenAIService {
  /**
   * Provides a mock transcription response
   * @returns Mock transcription result with a warning message
   */
  async transcribe(): Promise<TranscriptionResult> {
    console.log("Using mock transcription service");
    return { 
      text: "This is a mock transcription. Please check your Flask backend connection."
    };
  }

  /**
   * Provides a mock real-time transcription response
   * @returns Mock transcription result with a warning message
   */
  async transcribeRealTime(): Promise<TranscriptionResult> {
    return this.transcribe();
  }

  /**
   * Generates a mock AI response
   * @param transcript - Ignored in mock implementation
   * @returns Mock AI response with a warning message
   */
  async generateResponse(transcript: string): Promise<string> {
    console.log("Using mock AI response service");
    return "I'm a mock AI interviewer. To get real responses, please check your Flask backend connection.";
  }

  /**
   * Provides a mock audio blob
   * @returns Empty audio blob
   */
  async textToSpeech(): Promise<Blob> {
    console.log("Using mock TTS service");
    // Create an empty audio blob
    return new Blob([], { type: "audio/mp3" });
  }

  /**
   * Simulates audio playback
   * @returns Promise that resolves after a simulated delay
   */
  async playAudio(): Promise<void> {
    console.log("Mock audio playback");
    // Wait a simulated time for "audio playback"
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}
