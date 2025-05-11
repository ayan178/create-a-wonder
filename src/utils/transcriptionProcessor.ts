import { OpenAIService } from "@/services/OpenAIService";

// Create a singleton instance of OpenAIService
const openAIService = new OpenAIService();

export interface TranscriptionOptions {
  prompt?: string;
  language?: string;
}

export class TranscriptionProcessor {
  private audioChunks: Blob[] = [];
  private transcriptionInterval: ReturnType<typeof setInterval> | null = null;
  
  /**
   * Start real-time transcription
   * @param callback Function to call with transcription text
   * @param intervalMs How often to process audio chunks (default: 3000ms)
   */
  startRealTimeTranscription(
    callback: (text: string) => void, 
    intervalMs = 3000
  ): void {
    // Clear any existing transcription interval
    if (this.transcriptionInterval) {
      clearInterval(this.transcriptionInterval);
    }
    
    this.audioChunks = [];
    
    // Set up new interval for transcription
    this.transcriptionInterval = setInterval(async () => {
      if (this.audioChunks.length > 0) {
        try {
          // Create a blob from the collected audio chunks
          const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
          
          // Keep some recent audio for context
          const maxChunks = 4; // Keep last 4 chunks for context
          if (this.audioChunks.length > maxChunks) {
            this.audioChunks = this.audioChunks.slice(-maxChunks);
          }
          
          console.log(`Processing audio chunk: ${audioBlob.size} bytes`);
          
          // Send to OpenAI API for transcription
          const result = await openAIService.transcribeRealTime(audioBlob, {
            prompt: "This is part of a job interview conversation. The speaker is answering interview questions."
          });
          
          // Call the callback with the transcribed text
          if (result.text && result.text.trim()) {
            console.log("Transcription result:", result.text);
            callback(result.text);
          } else {
            console.log("Empty transcription received");
          }
        } catch (error) {
          console.error("Real-time transcription error:", error);
        }
      } else {
        console.log("No audio chunks for transcription");
      }
    }, intervalMs);
  }
  
  /**
   * Add audio chunk for transcription processing
   * @param chunk Audio data chunk
   */
  addAudioChunk(chunk: Blob): void {
    this.audioChunks.push(chunk);
  }
  
  /**
   * Process a complete audio recording for transcription
   * @param audioBlob Complete audio recording
   * @param options Transcription options
   * @returns Transcription result
   */
  async transcribeComplete(
    audioBlob: Blob, 
    options: TranscriptionOptions = {}
  ): Promise<{ text: string }> {
    try {
      return await openAIService.transcribe(audioBlob, {
        language: options.language || "en",
        prompt: options.prompt,
      });
    } catch (error) {
      console.error("Complete transcription error:", error);
      throw error;
    }
  }
  
  /**
   * Stop real-time transcription
   */
  stopTranscription(): void {
    if (this.transcriptionInterval) {
      clearInterval(this.transcriptionInterval);
      this.transcriptionInterval = null;
    }
    this.audioChunks = [];
  }
}

// Export a singleton instance for use throughout the app
export const transcriptionProcessor = new TranscriptionProcessor();
