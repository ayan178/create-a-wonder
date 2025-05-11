
/**
 * Handles browser-specific storage operations for video recordings
 */
export class BrowserStorage {
  /**
   * Save a recording in the browser and trigger download
   * @param blob The recorded video blob
   * @param filePath The path/name to save the file as
   * @returns The URL to the saved recording
   */
  async saveRecording(blob: Blob, filePath: string): Promise<string> {
    try {
      // For web browsers, create a downloadable file
      const url = URL.createObjectURL(blob);
      
      // Create a download link and trigger it
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = filePath;
      document.body.appendChild(a);
      a.click();
      
      // Clean up
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 100);
      
      console.log(`Recording saved to ${filePath}`);
      
      return url;
    } catch (error) {
      console.error("Failed to save recording in browser:", error);
      throw error;
    }
  }
}

// Export a singleton instance for use throughout the app
export const browserStorage = new BrowserStorage();
