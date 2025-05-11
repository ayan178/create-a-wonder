
/**
 * Service for communicating with the Flask backend
 * This service handles all API calls to the backend server
 */

import { BACKEND_CONFIG } from "@/config/backendConfig";

interface BackendConfig {
  baseUrl: string;
  debug?: boolean;
  retry?: {
    maxAttempts: number;
    initialDelay: number;
    maxDelay: number;
    backoffFactor: number;
  };
}

/**
 * Custom error class for backend-related errors
 */
export class BackendError extends Error {
  public status?: number;
  public attempt?: number;
  
  constructor(message: string, status?: number, attempt?: number) {
    super(message);
    this.name = 'BackendError';
    this.status = status;
    this.attempt = attempt;
    
    // This is needed for proper inheritance in TypeScript
    Object.setPrototypeOf(this, BackendError.prototype);
  }
}

/**
 * Service for making requests to the Flask backend
 */
export class BackendService {
  private baseUrl: string;
  private debug: boolean;
  private retryConfig: {
    maxAttempts: number;
    initialDelay: number;
    maxDelay: number;
    backoffFactor: number;
  };
  
  constructor(config: BackendConfig = BACKEND_CONFIG) {
    this.baseUrl = config.baseUrl;
    this.debug = config.debug || false;
    this.retryConfig = config.retry || {
      maxAttempts: 3,
      initialDelay: 1000,
      maxDelay: 5000,
      backoffFactor: 2
    };
  }

  /**
   * Log messages when debug is enabled
   */
  private log(...args: any[]): void {
    if (this.debug) {
      console.log('[BackendService]', ...args);
    }
  }

  /**
   * Make a request to the backend API with retry capability
   * @param endpoint - API endpoint to call
   * @param method - HTTP method
   * @param data - Optional request data
   * @returns Promise with response data
   */
  private async makeRequest<T>(
    endpoint: string, 
    method: string = "GET", 
    data?: any
  ): Promise<T> {
    const url = `${this.baseUrl}/${endpoint}`;
    let attempt = 1;
    let delay = this.retryConfig.initialDelay;
    
    while (attempt <= this.retryConfig.maxAttempts) {
      try {
        this.log(`Attempt ${attempt}/${this.retryConfig.maxAttempts} for ${method} ${endpoint}`);
        
        // Check for network connectivity before making the request
        if (!navigator.onLine) {
          throw new BackendError("No internet connection available", 0, attempt);
        }
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout
        
        const response = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: data ? JSON.stringify(data) : undefined,
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        // Handle different HTTP status codes
        if (!response.ok) {
          const errorBody = await response.json().catch(() => ({}));
          const errorMessage = errorBody.error || `HTTP Error: ${response.status} ${response.statusText}`;
          
          // For certain status codes, we don't want to retry
          if (response.status === 401 || response.status === 403 || response.status === 404) {
            throw new BackendError(errorMessage, response.status, attempt);
          }
          
          throw new BackendError(errorMessage, response.status, attempt);
        }
        
        return await response.json() as T;
      } catch (error) {
        // Handle different error types
        if (error instanceof BackendError) {
          // For specific status codes, don't retry
          if (error.status === 401 || error.status === 403 || error.status === 404) {
            this.log(`Error ${error.status} won't be retried:`, error.message);
            throw error;
          }
        }
        
        // Don't retry if this was our last attempt
        if (attempt >= this.retryConfig.maxAttempts) {
          this.log(`All ${this.retryConfig.maxAttempts} attempts failed for ${endpoint}`);
          if (error instanceof DOMException && error.name === 'AbortError') {
            throw new BackendError(`Request timeout after 15 seconds for ${endpoint}`);
          }
          throw error instanceof BackendError ? error : new BackendError(`Failed to connect to backend: ${error instanceof Error ? error.message : String(error)}`);
        }
        
        // Log the error and prepare for retry
        this.log(`Attempt ${attempt} failed for ${endpoint}:`, error);
        
        // Wait before the next retry with exponential backoff
        await new Promise(resolve => setTimeout(resolve, delay));
        
        // Increase the delay for the next attempt (with maximum limit)
        delay = Math.min(delay * this.retryConfig.backoffFactor, this.retryConfig.maxDelay);
        attempt++;
      }
    }
    
    // This should never be reached due to the throw in the loop above
    throw new BackendError(`Unexpected error in retry loop for ${endpoint}`);
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
    // Convert blob to base64
    const base64Data = await this.blobToBase64(audioBlob);
    
    return this.makeRequest<{ text: string }>("transcribe", "POST", {
      audio_data: base64Data,
      mime_type: audioBlob.type,
      options
    });
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
    const response = await this.makeRequest<{ response: string }>(
      "generate-response", 
      "POST", 
      { transcript, currentQuestion, options }
    );
    
    return response.response;
  }
  
  /**
   * Convert text to speech through the backend
   * @param text - Text to convert to speech
   * @param options - TTS options
   * @returns Promise with audio URL
   */
  async textToSpeech(text: string, options: any = {}): Promise<Blob> {
    const response = await this.makeRequest<{ audio_data: string }>(
      "text-to-speech", 
      "POST", 
      { text, options }
    );
    
    // Convert base64 back to blob
    return this.base64ToBlob(response.audio_data, "audio/mp3");
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
