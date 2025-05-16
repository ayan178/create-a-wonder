
/**
 * Configuration for video recording storage
 */
export const VIDEO_STORAGE_CONFIG = {
  // Storage path for the recordings, can be customized in .env
  storagePath: import.meta.env.VITE_VIDEO_STORAGE_PATH || "interview_recordings",
  
  // Default file format for recordings
  fileFormat: "webm",
  
  // Default filename pattern (timestamp-based)
  filenamePattern: "interview-{timestamp}",
};

// Export function to get a configured storage path
export const getStoragePath = () => {
  return VIDEO_STORAGE_CONFIG.storagePath;
};

// Export function to set a custom storage path
export const setStoragePath = (path: string) => {
  VIDEO_STORAGE_CONFIG.storagePath = path;
};
