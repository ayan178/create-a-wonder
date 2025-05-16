
/**
 * Core functionality for media recording
 */
export class MediaRecorder {
  private mediaRecorder: globalThis.MediaRecorder | null = null;
  private recordedChunks: Blob[] = [];
  private stream: MediaStream | null = null;
  private isRecording = false;
  private systemAudioStream: MediaStream | null = null;
  private audioContext: AudioContext | null = null;
  private mixedDestination: MediaStreamAudioDestinationNode | null = null;
  
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
        
        // Set up audio context for mixing audio streams
        this.setupAudioMixing(stream);
        
        // Get the final mixed stream (video + user audio + system audio)
        const finalStream = this.getMixedStream(stream);
        
        // Determine the best supported mime type
        const mimeType = options.mimeType || 'video/webm;codecs=vp9,opus';
        
        if (!globalThis.MediaRecorder.isTypeSupported(mimeType)) {
          console.warn(`${mimeType} is not supported, falling back to default`);
        }

        // Initialize the media recorder with audio emphasis
        this.mediaRecorder = new globalThis.MediaRecorder(finalStream, {
          mimeType: globalThis.MediaRecorder.isTypeSupported(mimeType) ? mimeType : 'video/webm',
          audioBitsPerSecond: 128000, // Prioritize audio quality
        });

        // Collect data chunks as they become available
        this.mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            this.recordedChunks.push(event.data);
          }
        };

        // Handle recording start event
        this.mediaRecorder.onstart = () => {
          this.isRecording = true;
          console.log("Recording started successfully with system audio capture");
          resolve();
        };

        // Handle recording errors
        this.mediaRecorder.onerror = (event) => {
          console.error("Recording error:", event);
          reject(new Error("Error during recording"));
        };

        // Start recording in small chunks for more frequent processing
        this.mediaRecorder.start(500); // Capture in half-second chunks
      } catch (error) {
        console.error("Failed to start recording:", error);
        reject(error);
      }
    });
  }

  /**
   * Set up audio mixing to capture both user microphone and system audio
   */
  private setupAudioMixing(stream: MediaStream): void {
    try {
      // Create audio context
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Create a destination for our mixed audio
      this.mixedDestination = this.audioContext.createMediaStreamDestination();
      
      // Connect user microphone to the mixed destination
      const micSource = this.audioContext.createMediaStreamSource(stream);
      micSource.connect(this.mixedDestination);
      
      // Create a gain node to adjust microphone volume if needed
      const micGain = this.audioContext.createGain();
      micGain.gain.value = 1.0; // Normal volume
      micSource.connect(micGain);
      micGain.connect(this.mixedDestination);
      
      console.log("Audio mixing setup complete");
    } catch (error) {
      console.error("Failed to set up audio mixing:", error);
    }
  }

  /**
   * Add system audio to the recording mix
   * @param audioStream System audio stream to capture
   */
  public addSystemAudioToMix(audioElement: HTMLAudioElement): void {
    try {
      if (!this.audioContext || !this.mixedDestination) {
        console.error("Audio context not initialized");
        return;
      }
      
      // Create a media element source from the audio element
      const systemSource = this.audioContext.createMediaElementSource(audioElement);
      
      // Create a gain node for system audio
      const systemGain = this.audioContext.createGain();
      systemGain.gain.value = 1.0; // Normal volume
      
      // Connect system audio to the mixed destination
      systemSource.connect(systemGain);
      systemGain.connect(this.mixedDestination);
      
      // Also connect to destination so audio still plays normally
      systemGain.connect(this.audioContext.destination);
      
      console.log("System audio added to mix");
    } catch (error) {
      console.error("Failed to add system audio to mix:", error);
    }
  }

  /**
   * Get the mixed media stream (video + all audio)
   */
  private getMixedStream(originalStream: MediaStream): MediaStream {
    try {
      if (!this.mixedDestination) {
        console.warn("Audio mixing not set up, using original stream");
        return originalStream;
      }
      
      // Get video tracks from original stream
      const videoTracks = originalStream.getVideoTracks();
      
      // Get mixed audio tracks
      const audioTracks = this.mixedDestination.stream.getAudioTracks();
      
      // Create a new stream with both video and mixed audio
      const mixedStream = new MediaStream([
        ...videoTracks,
        ...audioTracks
      ]);
      
      return mixedStream;
    } catch (error) {
      console.error("Failed to create mixed stream:", error);
      return originalStream; // Fallback to original stream
    }
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
        
        // Clean up audio context
        if (this.audioContext && this.audioContext.state !== 'closed') {
          this.audioContext.close().catch(console.error);
        }
        this.audioContext = null;
        this.mixedDestination = null;
        
        // Check if we have recorded data
        if (this.recordedChunks.length === 0) {
          reject(new Error("No data recorded"));
          return;
        }

        // Create blob from recorded chunks
        const recordedBlob = new Blob(this.recordedChunks, { 
          type: this.recordedChunks[0].type 
        });
        
        resolve(recordedBlob);
      };

      // Stop the recording
      this.mediaRecorder.stop();
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
        this.mediaRecorder.stop();
      }
      this.mediaRecorder = null;
    }
    
    // Clean up audio context
    if (this.audioContext && this.audioContext.state !== 'closed') {
      this.audioContext.close().catch(console.error);
    }
    this.audioContext = null;
    this.mixedDestination = null;
    
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
