
/**
 * Configuration for video recording storage
 */
export const VIDEO_STORAGE_CONFIG = {
  // Change this path to your preferred storage location
  storagePath: "interview_recordings",
};

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
      
      // For web browsers, create a downloadable file
      const url = URL.createObjectURL(blob);
      
      // Create a download link and trigger it
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = fullPath;
      document.body.appendChild(a);
      a.click();
      
      // Clean up
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 100);
      
      console.log(`Recording saved to ${fullPath}`);
      
      return url;
    } catch (error) {
      console.error("Failed to save recording:", error);
      throw error;
    }
  }
}

// Export a singleton instance for use throughout the app
export const videoStorage = new VideoStorage();
