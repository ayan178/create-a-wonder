
import { openAIService } from "@/services/OpenAIService";

/**
 * Processes audio chunks for real-time transcription
 */
export class TranscriptionProcessor {
  private audioBuffer: Blob[] = [];
  private bufferThreshold = 3; // Number of chunks to buffer before processing
  private isActive = false;
  private transcriptionCallback: ((text: string) => void) | null = null;
  
  /**
   * Start real-time transcription
   * @param callback Function to call with transcribed text
   */
  startRealTimeTranscription(callback: (text: string) => void): void {
    this.isActive = true;
    this.transcriptionCallback = callback;
    this.audioBuffer = []; // Clear any existing buffer
    console.log("Transcription processor started");
  }

  /**
   * Stop transcription and clear resources
   */
  stopTranscription(): void {
    this.isActive = false;
    this.transcriptionCallback = null;
    this.audioBuffer = [];
    console.log("Transcription processor stopped");
  }

  /**
   * Add an audio chunk for transcription
   * @param chunk The audio chunk to process
   */
  addAudioChunk(chunk: Blob): void {
    console.log("Transcription: received audio chunk, size:", chunk.size, "type:", chunk.type);
    
    // Skip if not actively processing
    if (!this.isActive) {
      console.log("Transcription: skipping chunk because processor is not active");
      return;
    }
    
    // Add to the buffer for batch processing
    this.audioBuffer.push(chunk);
    
    // Process if buffer reaches threshold
    if (this.audioBuffer.length >= this.bufferThreshold) {
      this.processBufferedAudio();
    }
  }

  /**
   * Process the buffered audio chunks
   */
  private async processBufferedAudio(): Promise<void> {
    if (!this.isActive || !this.transcriptionCallback) return;
    
    // Combine the audio chunks into a single blob
    const combinedBlob = new Blob(this.audioBuffer, { type: 'audio/webm' });
    this.audioBuffer = []; // Clear the buffer immediately
    
    try {
      console.log("Transcription: processing audio, size:", combinedBlob.size);
      
      // Transcribe the audio using OpenAI
      const transcriptionResult = await openAIService.transcribeRealTime(combinedBlob);
      
      if (transcriptionResult.text) {
        console.log("Transcription: sending text:", transcriptionResult.text);
        this.transcriptionCallback(transcriptionResult.text);
      } else {
        console.warn("Transcription: no text received");
      }
    } catch (error) {
      console.error("Transcription error:", error);
    }
  }

  /**
   * Transcribe a complete audio recording (non-real-time)
   * @param audioBlob The complete audio recording to transcribe
   * @param options Optional configuration for transcription
   * @returns Promise with the transcription result
   */
  async transcribeComplete(audioBlob: Blob, options: any = {}): Promise<{ text: string }> {
    console.log("Complete transcription requested for blob:", audioBlob.size, audioBlob.type);
    
    try {
      // Use the standard transcribe method from OpenAI service
      const result = await openAIService.transcribe(audioBlob, {
        language: options.language || "en",
        temperature: options.temperature || 0.2,
        prompt: options.prompt || "This is a complete interview recording. Please transcribe accurately."
      });
      
      console.log("Complete transcription result received");
      return result;
    } catch (error) {
      console.error("Complete transcription error:", error);
      throw error;
    }
  }
}

// Export a singleton instance for use throughout the app
export const transcriptionProcessor = new TranscriptionProcessor();
