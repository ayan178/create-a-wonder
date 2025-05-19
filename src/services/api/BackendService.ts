
/**
 * Service for communicating with the Flask backend
 * This service handles all API calls to the backend server
 */

import { BACKEND_CONFIG } from "@/config/backendConfig";
import { BaseApiClient } from './BaseApiClient';

/**
 * Service for making requests to the Flask backend
 */
export class BackendService extends BaseApiClient {
  constructor() {
    super(
      BACKEND_CONFIG.baseUrl,
      BACKEND_CONFIG.debug
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
      if (this.debug) {
        console.error('Backend health check failed:', error);
      }
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
      
      if (this.debug) {
        console.log(`Sending audio for transcription, size: ${audioBlob.size}, type: ${audioBlob.type}`);
      }
      
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
  
  /**
   * Helper to convert blob to base64
   */
  private async blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        // Remove data URL prefix (e.g., "data:audio/webm;base64,")
        const base64 = result.split(",")[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }
  
  /**
   * Helper to convert base64 to blob
   */
  private base64ToBlob(base64: string, mimeType: string): Blob {
    const byteCharacters = atob(base64);
    const byteArrays = [];
    
    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    
    return new Blob(byteArrays, { type: mimeType });
  }
}

// Export singleton instance for use throughout the app
export const backendService = new BackendService();
