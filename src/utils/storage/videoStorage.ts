
import { VIDEO_STORAGE_CONFIG } from "@/config/storageConfig";
import { browserStorage } from "./browserStorage";

export class VideoStorage {
  /**
   * Save the recording to the configured storage location
   * @param blob The recorded video blob
   * @param fileName The name to save the file as (default: generates timestamp-based name)
   * @returns The URL to the saved recording
   */
  async saveRecording(blob: Blob, fileName?: string): Promise<string> {
    try {
      // Generate a filename if not provided
      const name = fileName || `interview-${new Date().toISOString().replace(/[:.]/g, "-")}`;
      const fullPath = `${VIDEO_STORAGE_CONFIG.storagePath}/${name}.webm`;
      
      // Use browser storage to handle the actual saving
      return await browserStorage.saveRecording(blob, fullPath);
    } catch (error) {
      console.error("Failed to save recording:", error);
      throw error;
    }
  }
}

// Export a singleton instance for use throughout the app
export const videoStorage = new VideoStorage();
