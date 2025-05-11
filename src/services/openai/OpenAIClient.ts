
/**
 * OpenAI Client
 * 
 * Handles the core functionality of communicating with OpenAI APIs
 */

import { backendService } from "../api/BackendService";
import { MockOpenAIService } from "../MockOpenAIService";
import { 
  TranscriptionOptions, 
  TranscriptionResult,
  TextToSpeechOptions 
} from "../OpenAIServiceTypes";

export class OpenAIClient {
  private mockService: MockOpenAIService | null = null;
  private backendConnected: boolean = true;
  
  constructor() {
    // Check if backend is accessible
    this.checkBackendConnection();
  }
  
  /**
   * Check if the backend service is accessible
   */
  private async checkBackendConnection(): Promise<void> {
    try {
      const isAvailable = await backendService.isBackendAvailable();
      
      if (!isAvailable) {
        console.warn("Backend health check failed. Using mock service instead.");
        this.backendConnected = false;
        this.mockService = new MockOpenAIService();
      } else {
        console.log("Backend connection successful");
        this.backendConnected = true;
      }
    } catch (error) {
      console.warn("Could not connect to Flask backend. Using mock service instead:", error);
      this.backendConnected = false;
      this.mockService = new MockOpenAIService();
    }
  }

  /**
   * Transcribe audio content using backend service
   */
  async transcribe(audioBlob: Blob, options: TranscriptionOptions = {}): Promise<TranscriptionResult> {
    // Use mock service if backend is not connected
    if (!this.backendConnected && this.mockService) return this.mockService.transcribe();
    
    try {
      console.log("Sending audio for transcription to backend");
      // Send to backend for transcription
      return await backendService.transcribe(audioBlob, options);
    } catch (error) {
      console.error("Transcription error:", error);
      throw error;
    }
  }

  /**
   * Generate AI response through the backend
   */
  async generateResponse(
    transcript: string, 
    currentQuestion: string, 
    options: any = {}
  ): Promise<string> {
    // Use mock service if backend is not connected
    if (!this.backendConnected && this.mockService) return this.mockService.generateResponse(transcript);
    
    try {
      console.log("Sending transcript for AI response to backend");
      // Send to backend for processing
      return await backendService.generateResponse(transcript, currentQuestion, options);
    } catch (error) {
      console.error("Error generating AI response:", error);
      throw error;
    }
  }

  /**
   * Convert text to speech using backend service
   */
  async textToSpeech(text: string, options: TextToSpeechOptions = {}): Promise<Blob> {
    // Use mock service if backend is not connected
    if (!this.backendConnected && this.mockService) return this.mockService.textToSpeech();
    
    try {
      console.log("Sending text for TTS to backend");
      // Send to backend for TTS processing
      return await backendService.textToSpeech(text, options);
    } catch (error) {
      console.error("Error converting text to speech:", error);
      throw error;
    }
  }
}

// Export a default instance for easy imports
export const openAIClient = new OpenAIClient();
