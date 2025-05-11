
/**
 * Service for communicating with the Flask backend
 * This service handles all API calls to the backend server
 */

import { BACKEND_CONFIG } from "@/config/backendConfig";
import { BaseApiClient } from './BaseApiClient';
import { BackendError } from './BackendError';

/**
 * Service for making requests to the Flask backend
 */
export class BackendService extends BaseApiClient {
  constructor(config = BACKEND_CONFIG) {
    super(
      config.baseUrl,
      config.debug,
      config.retry
    );
  }

  /**
   * Check if the backend is accessible
   * @returns Promise resolving to true if backend is available, false otherwise
   */
  async isBackendAvailable(): Promise<boolean> {
    try {
      await this.makeRequest<{status: string}>('health');
      return true;
    } catch (error) {
      this.log('Backend health check failed:', error);
      return false;
    }
  }
  
  /**
   * Transcribe audio using the backend
   * @param audioBlob - Audio blob to transcribe
   * @param options - Transcription options
   * @returns Promise with transcription result
   */
  async transcribe(audioBlob: Blob, options: any = {}): Promise<{ text: string }> {
    try {
      // Convert blob to base64
      const base64Data = await this.blobToBase64(audioBlob);
      
      this.log(`Sending audio for transcription, size: ${audioBlob.size}, type: ${audioBlob.type}`);
      
      return this.makeRequest<{ text: string }>("transcribe", "POST", {
        audio_data: base64Data,
        mime_type: audioBlob.type,
        options
      });
    } catch (error) {
      console.error("Transcription request error:", error);
      throw error;
    }
  }
  
  /**
   * Generate AI response through the backend
   * @param transcript - User transcript
   * @param currentQuestion - Current interview question
   * @param options - Generation options
   * @returns Promise with AI response text
   */
  async generateResponse(
    transcript: string,
    currentQuestion: string,
    options: any = {}
  ): Promise<string> {
    try {
      const response = await this.makeRequest<{ response: string }>(
        "generate-response", 
        "POST", 
        { transcript, currentQuestion, options }
      );
      
      return response.response;
    } catch (error) {
      console.error("Generate response request error:", error);
      throw error;
    }
  }
  
  /**
   * Convert text to speech through the backend
   * @param text - Text to convert to speech
   * @param options - TTS options
   * @returns Promise with audio URL
   */
  async textToSpeech(text: string, options: any = {}): Promise<Blob> {
    try {
      const response = await this.makeRequest<{ audio_data: string }>(
        "text-to-speech", 
        "POST", 
        { text, options }
      );
      
      // Convert base64 back to blob
      return this.base64ToBlob(response.audio_data, "audio/mp3");
    } catch (error) {
      console.error("Text-to-speech request error:", error);
      throw error;
    }
  }
  
  // Removed the private blobToBase64 and base64ToBlob methods as they're inherited from BaseApiClient
}

// Export singleton instance for use throughout the app
export const backendService = new BackendService();
