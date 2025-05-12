
/**
 * Configuration for video recording storage
 */
export const VIDEO_STORAGE_CONFIG = {
  // Change this path to your preferred storage location
  storagePath: "interview_recordings",
  
  // Recording settings
  videoSettings: {
    mimeType: "video/webm;codecs=vp9,opus",
    videoBitsPerSecond: 2500000, // 2.5 Mbps video quality
    audioBitsPerSecond: 128000   // 128 Kbps audio quality
  },
  
  // Whether to download recordings automatically
  autoDownload: true
};
