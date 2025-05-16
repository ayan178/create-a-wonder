
import { mediaRecorder } from './mediaRecorder';
import { transcriptionProcessor } from './transcriptionProcessor';
import { videoStorage } from './storage/videoStorage';
import { VIDEO_STORAGE_CONFIG, setStoragePath } from '@/config/storageConfig';

export interface RecordingOptions {
  fileName?: string;
  mimeType?: string;
  // Configuration for real-time transcription
  enableRealTimeTranscription?: boolean;
  transcriptionCallback?: (text: string) => void;
  // System audio source for capturing AI voice
  audioElement?: HTMLAudioElement;
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
      // Add system audio to the mix if an audio element is provided
      if (options.audioElement) {
        mediaRecorder.addSystemAudioToMix(options.audioElement);
      }
      
      // Start the media recorder
      await mediaRecorder.startRecording(stream, { 
        mimeType: options.mimeType || 'video/webm;codecs=vp9,opus'
      });
      
      // Set up real-time transcription if enabled
      if (options.enableRealTimeTranscription && options.transcriptionCallback) {
        transcriptionProcessor.startRealTimeTranscription(options.transcriptionCallback);
      }
      
      console.log("Video recording started with system audio capture");
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
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const name = fileName || `interview-${timestamp}`;
    return videoStorage.saveRecording(blob, name);
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

  /**
   * Set the storage path for recordings
   */
  setStoragePath(path: string): void {
    setStoragePath(path);
    console.log(`Recording storage path set to: ${path}`);
  }

  /**
   * Get the current storage path for recordings
   */
  getStoragePath(): string {
    return VIDEO_STORAGE_CONFIG.storagePath;
  }
}

// Export a singleton instance for use throughout the app
export const videoRecorder = new VideoRecorder();

// Re-export all utilities for convenience
export { mediaRecorder, transcriptionProcessor, videoStorage };
