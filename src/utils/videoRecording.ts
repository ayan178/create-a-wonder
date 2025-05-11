import { mediaRecorder } from './mediaRecorder';
import { transcriptionProcessor } from './transcriptionProcessor';
import { videoStorage } from './storage/videoStorage';

export interface RecordingOptions {
  fileName?: string;
  mimeType?: string;
  // Configuration for real-time transcription
  enableRealTimeTranscription?: boolean;
  transcriptionCallback?: (text: string) => void;
}

/**
 * Combined video recorder with real-time transcription capabilities
 */
export class VideoRecorder {
  /**
   * Start recording from a given media stream
   * @param stream The media stream to record from
   * @param options Recording options including transcription settings
   * @returns Promise that resolves when recording starts
   */
  async startRecording(stream: MediaStream, options: RecordingOptions = {}): Promise<void> {
    try {
      // Start the media recorder
      await mediaRecorder.startRecording(stream, { 
        mimeType: options.mimeType 
      });
      
      // Set up real-time transcription if enabled
      if (options.enableRealTimeTranscription && options.transcriptionCallback) {
        transcriptionProcessor.startRealTimeTranscription(options.transcriptionCallback);
      }
    } catch (error) {
      console.error("Failed to start recording:", error);
      throw error;
    }
  }

  /**
   * Stop the current recording
   * @returns Promise with the recording blob
   */
  async stopRecording(): Promise<Blob> {
    try {
      // Stop the media recorder and get the blob
      const recordedBlob = await mediaRecorder.stopRecording();
      
      // Stop transcription processing
      transcriptionProcessor.stopTranscription();
      
      return recordedBlob;
    } catch (error) {
      console.error("Failed to stop recording:", error);
      throw error;
    }
  }

  /**
   * Save the recording to the configured storage location
   * @param blob The recorded video blob
   * @param fileName Optional name for the recording file
   */
  async saveRecording(blob: Blob, fileName?: string): Promise<string> {
    return videoStorage.saveRecording(blob, fileName);
  }

  /**
   * Checks if recording is currently in progress
   */
  isCurrentlyRecording(): boolean {
    return mediaRecorder.isCurrentlyRecording();
  }

  /**
   * Clean up resources
   */
  cleanup(): void {
    mediaRecorder.cleanup();
    transcriptionProcessor.stopTranscription();
  }
}

// Export a singleton instance for use throughout the app
export const videoRecorder = new VideoRecorder();

// Add an event listener to handle ondataavailable events
// This patch connects the MediaRecorder and TranscriptionProcessor
if (typeof window !== 'undefined') {
  const originalMediaRecorderStart = MediaRecorder.prototype.start;
  MediaRecorder.prototype.start = function(...args) {
    this.ondataavailable = this.ondataavailable || (() => {});
    const originalOnDataAvailable = this.ondataavailable;
    
    this.ondataavailable = (event) => {
      // Call the original handler
      originalOnDataAvailable.call(this, event);
      
      // Forward data to the transcription processor if it has content
      if (event.data && event.data.size > 0) {
        transcriptionProcessor.addAudioChunk(event.data);
      }
    };
    
    return originalMediaRecorderStart.apply(this, args);
  };
}

// Re-export all utilities for convenience
export { mediaRecorder, transcriptionProcessor, videoStorage };
