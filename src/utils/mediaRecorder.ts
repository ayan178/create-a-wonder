
/**
 * Core functionality for media recording
 */
export class MediaRecorder {
  private mediaRecorder: globalThis.MediaRecorder | null = null;
  private recordedChunks: Blob[] = [];
  private stream: MediaStream | null = null;
  private isRecording = false;
  
  /**
   * Start recording from a given media stream
   * @param stream The media stream to record from
   * @param options Recording options
   * @returns Promise that resolves when recording starts
   */
  startRecording(stream: MediaStream, options: { mimeType?: string } = {}): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        // Check if already recording
        if (this.isRecording) {
          reject(new Error("Already recording"));
          return;
        }

        this.stream = stream;
        this.recordedChunks = [];
        
        // Determine the best supported mime type
        const mimeType = options.mimeType || 'video/webm;codecs=vp9,opus';
        
        // Check if the mime type is supported
        const isTypeSupported = globalThis.MediaRecorder && 
                               globalThis.MediaRecorder.isTypeSupported(mimeType);
                               
        // Log whether the type is supported
        console.log(`MediaRecorder: MIME type ${mimeType} is ${isTypeSupported ? 'supported' : 'not supported'}`);

        // Get supported MIME types for fallback
        const supportedTypes = [
          'video/webm;codecs=vp9,opus',
          'video/webm;codecs=vp8,opus',
          'video/webm',
          'video/mp4'
        ].filter(type => 
          globalThis.MediaRecorder && globalThis.MediaRecorder.isTypeSupported(type)
        );
        
        console.log("Supported MIME types:", supportedTypes);
        
        // Choose the best MIME type available
        const selectedMimeType = isTypeSupported ? mimeType : 
          (supportedTypes.length > 0 ? supportedTypes[0] : 'video/webm');

        // Initialize the media recorder with audio emphasis
        this.mediaRecorder = new globalThis.MediaRecorder(stream, {
          mimeType: selectedMimeType,
          videoBitsPerSecond: 2500000, // 2.5 Mbps for good quality
          audioBitsPerSecond: 128000   // 128 kbps for clear audio
        });

        console.log("MediaRecorder initialized with MIME type:", this.mediaRecorder.mimeType);

        // Collect data chunks as they become available
        this.mediaRecorder.ondataavailable = (event) => {
          if (event.data && event.data.size > 0) {
            console.log(`Received data chunk: ${event.data.size} bytes`);
            this.recordedChunks.push(event.data);
          }
        };

        // Handle recording start event
        this.mediaRecorder.onstart = () => {
          this.isRecording = true;
          console.log("Recording started successfully");
          resolve();
        };

        // Handle recording errors
        this.mediaRecorder.onerror = (event) => {
          console.error("Recording error:", event);
          reject(new Error("Error during recording"));
        };

        // Start recording in small chunks for more frequent processing
        this.mediaRecorder.start(1000); // Capture in one-second chunks for better handling
      } catch (error) {
        console.error("Failed to start recording:", error);
        reject(error);
      }
    });
  }

  /**
   * Stop the current recording
   * @returns Promise with the recording blob
   */
  stopRecording(): Promise<Blob> {
    return new Promise((resolve, reject) => {
      // Check if recording is active
      if (!this.mediaRecorder || !this.isRecording) {
        reject(new Error("Not recording"));
        return;
      }

      // Handle recording stop event
      this.mediaRecorder.onstop = () => {
        this.isRecording = false;
        
        // Check if we have recorded data
        if (this.recordedChunks.length === 0) {
          reject(new Error("No data recorded"));
          return;
        }

        console.log(`Creating blob from ${this.recordedChunks.length} chunks, total size: ${
          this.recordedChunks.reduce((total, chunk) => total + chunk.size, 0)
        } bytes`);

        // Create blob from recorded chunks
        const recordedBlob = new Blob(this.recordedChunks, { 
          type: this.recordedChunks[0].type 
        });
        
        console.log(`Recording complete, blob size: ${recordedBlob.size}, type: ${recordedBlob.type}`);
        
        resolve(recordedBlob);
      };

      // Ensure there's a fallback timeout for stopping
      const stopTimeout = setTimeout(() => {
        if (this.isRecording && this.mediaRecorder) {
          console.warn("Force stopping MediaRecorder due to timeout");
          this.mediaRecorder.stop();
        }
      }, 1000);

      // Try to stop the recording
      try {
        this.mediaRecorder.stop();
        clearTimeout(stopTimeout);
      } catch (error) {
        console.error("Error stopping MediaRecorder:", error);
        clearTimeout(stopTimeout);
        reject(error);
      }
    });
  }

  /**
   * Checks if recording is currently in progress
   */
  isCurrentlyRecording(): boolean {
    return this.isRecording;
  }

  /**
   * Clean up resources
   */
  cleanup(): void {
    // Stop media recorder if active
    if (this.mediaRecorder) {
      if (this.isRecording) {
        try {
          this.mediaRecorder.stop();
        } catch (error) {
          console.warn("Error stopping MediaRecorder during cleanup:", error);
        }
      }
      this.mediaRecorder = null;
    }
    
    // Stop and clean up media stream
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
    
    // Reset recording state
    this.isRecording = false;
    this.recordedChunks = [];
  }
}

// Export a singleton instance for use throughout the app
export const mediaRecorder = new MediaRecorder();
