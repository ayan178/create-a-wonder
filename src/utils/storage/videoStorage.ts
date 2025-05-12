
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
      
      console.log("Saving recording to:", fullPath, "blob size:", blob.size, "type:", blob.type);
      
      // Use browser storage to handle the actual saving
      const url = await browserStorage.saveRecording(blob, fullPath);
      console.log("Recording saved, URL:", url);
      return url;
    } catch (error) {
      console.error("Failed to save recording:", error);
      throw error;
    }
  }
  
  /**
   * Get the default storage path from config
   */
  getStoragePath(): string {
    return VIDEO_STORAGE_CONFIG.storagePath;
  }
}

// Export a singleton instance for use throughout the app
export const videoStorage = new VideoStorage();
