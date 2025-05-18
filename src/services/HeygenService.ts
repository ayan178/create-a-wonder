
import { HEYGEN_CONFIG } from "@/config/heygenConfig";
import { toast } from "@/hooks/use-toast";

export interface HeygenStreamOptions {
  avatarId?: string;
  voiceId?: string;
  template?: string;
  text?: string;
  quality?: "high" | "medium" | "low";
}

class HeygenService {
  private apiKey: string | null = null;
  private videoElement: HTMLVideoElement | null = null;
  private streamUrl: string | null = null;
  private isStreaming: boolean = false;

  /**
   * Set the Heygen API key
   */
  setApiKey(key: string) {
    this.apiKey = key;
    localStorage.setItem("heygen_api_key", key);
    return true;
  }

  /**
   * Get the saved API key
   */
  getApiKey(): string | null {
    if (!this.apiKey) {
      this.apiKey = localStorage.getItem("heygen_api_key");
    }
    return this.apiKey;
  }

  /**
   * Check if the API key is configured
   */
  isConfigured(): boolean {
    return !!this.getApiKey();
  }

  /**
   * Initialize the video element for streaming
   */
  initializeVideoElement(videoElement: HTMLVideoElement) {
    this.videoElement = videoElement;
  }

  /**
   * Start a streaming session
   */
  async startStream(options: HeygenStreamOptions = {}): Promise<boolean> {
    try {
      if (!this.isConfigured()) {
        toast({
          title: "Heygen API key not configured",
          description: "Please configure your Heygen API key in settings",
          variant: "destructive",
        });
        return false;
      }

      if (!this.videoElement) {
        console.error("Video element not initialized");
        return false;
      }

      // Set up streaming parameters
      const avatarId = options.avatarId || HEYGEN_CONFIG.defaultAvatarId;
      const voiceId = options.voiceId || HEYGEN_CONFIG.defaultVoiceId;
      const template = options.template || HEYGEN_CONFIG.defaultTemplate;
      const quality = options.quality || (HEYGEN_CONFIG.preferHighQuality ? "high" : "medium");

      // Initialize the streaming session
      const response = await fetch(`${HEYGEN_CONFIG.apiUrl}/v1/video.streaming`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": this.getApiKey() || "",
        },
        body: JSON.stringify({
          avatar_id: avatarId,
          voice_id: voiceId,
          template,
          quality,
          background_color: "#00000000", // Transparent background
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error("Heygen streaming initialization failed:", error);
        toast({
          title: "Avatar streaming failed",
          description: "Could not start avatar stream. Please check your API key.",
          variant: "destructive",
        });
        return false;
      }

      const data = await response.json();
      this.streamUrl = data.data.stream_url;

      // Connect the video element to the stream
      if (this.videoElement && this.streamUrl) {
        // Use Hls.js if needed for HLS streams or direct source if supported
        this.videoElement.src = this.streamUrl;
        await this.videoElement.play();
        this.isStreaming = true;
        return true;
      }

      return false;
    } catch (error) {
      console.error("Error starting Heygen stream:", error);
      toast({
        title: "Avatar streaming error",
        description: "An error occurred while starting the avatar stream",
        variant: "destructive",
      });
      return false;
    }
  }

  /**
   * Send text to be spoken by the avatar
   */
  async speakText(text: string): Promise<boolean> {
    if (!this.isStreaming || !this.streamUrl) {
      console.warn("Cannot speak text: stream not active");
      return false;
    }

    try {
      const response = await fetch(`${HEYGEN_CONFIG.apiUrl}/v1/streaming.talk`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": this.getApiKey() || "",
        },
        body: JSON.stringify({
          text,
          stream_url: this.streamUrl,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error("Heygen streaming talk failed:", error);
        return false;
      }

      return true;
    } catch (error) {
      console.error("Error sending text to Heygen stream:", error);
      return false;
    }
  }

  /**
   * Stop the streaming session
   */
  stopStream(): void {
    if (this.videoElement) {
      this.videoElement.pause();
      this.videoElement.src = "";
    }
    this.isStreaming = false;
    this.streamUrl = null;
  }

  /**
   * Check if currently streaming
   */
  getIsStreaming(): boolean {
    return this.isStreaming;
  }
}

// Export singleton instance
export const heygenService = new HeygenService();
