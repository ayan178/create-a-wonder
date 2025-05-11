
/**
 * OpenAI Media Utilities
 * 
 * Handles audio/video processing for OpenAI services
 */

/**
 * Extract audio track from video blob
 * @param videoBlob - Video blob to extract audio from
 * @returns Audio blob suitable for transcription
 */
export async function extractAudioFromVideo(videoBlob: Blob): Promise<Blob> {
  return new Promise((resolve, reject) => {
    try {
      const video = document.createElement('video');
      const audioContext = new AudioContext();
      const videoObjectUrl = URL.createObjectURL(videoBlob);
      
      video.src = videoObjectUrl;
      video.addEventListener('loadedmetadata', async () => {
        try {
          // Extract audio from video using MediaStream API
          const mediaStream = (video as any).captureStream(); // This may need special permissions
          const mediaStreamSource = audioContext.createMediaStreamSource(mediaStream);
          const mediaRecorder = new MediaRecorder(mediaStream, { 
            mimeType: 'audio/webm' // Format compatible with OpenAI API
          });
          
          const audioChunks: Blob[] = [];
          mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
              audioChunks.push(event.data);
            }
          };
          
          mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
            URL.revokeObjectURL(videoObjectUrl);
            resolve(audioBlob);
          };
          
          mediaRecorder.start();
          video.play();
          
          // Process audio for 30 seconds or duration of video
          setTimeout(() => {
            mediaRecorder.stop();
            video.pause();
          }, Math.min(30000, video.duration * 1000 || 30000));
        } catch (err) {
          // Fallback if browser doesn't support captureStream
          console.warn("Could not extract audio track, returning video blob:", err);
          resolve(videoBlob);
        }
      });
      
      video.addEventListener('error', (err) => {
        reject(new Error(`Failed to load video: ${err}`));
      });
      
      // Mute to prevent playback sound
      video.muted = true;
    } catch (error) {
      console.error("Error extracting audio:", error);
      reject(error);
    }
  });
}

/**
 * Play audio from a blob using the browser's audio capabilities
 * @param audioBlob - The audio blob to play
 * @returns Promise that resolves when audio playback starts
 */
export async function playAudio(audioBlob: Blob): Promise<void> {
  try {
    // Create an audio URL from the blob
    const audioUrl = URL.createObjectURL(audioBlob);
    
    // Create and configure audio element
    const audioElement = new Audio(audioUrl);
    
    // Return promise that resolves when playback starts
    return new Promise((resolve, reject) => {
      audioElement.onended = () => {
        URL.revokeObjectURL(audioUrl);
        resolve();
      };
      
      audioElement.onerror = (err) => {
        URL.revokeObjectURL(audioUrl);
        reject(new Error(`Audio playback error: ${err}`));
      };
      
      // Play the audio
      audioElement.play().catch(error => {
        console.error("Audio play error:", error);
        URL.revokeObjectURL(audioUrl);
        reject(error);
      });
    });
  } catch (error) {
    console.error("Error playing audio:", error);
    throw error;
  }
}
