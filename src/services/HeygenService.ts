
/**
 * Service for interacting with Heygen avatar API via the backend
 */

import { BACKEND_CONFIG } from "@/config/backendConfig";

export interface HeygenAvatarConfig {
  avatar_id?: string;
  voice_id?: string;
}

export interface HeygenStreamingSession {
  stream_id: string;
  url: string;
  token: string;
  expires_in: number;
}

class HeygenService {
  private baseUrl: string;
  
  constructor() {
    this.baseUrl = BACKEND_CONFIG.baseUrl;
  }
  
  /**
   * Check if Heygen API is configured
   */
  async isConfigured(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/api/avatar/config`);
      if (!response.ok) return false;
      
      const data = await response.json();
      return data.configured === true;
    } catch (error) {
      console.error("Error checking Heygen configuration:", error);
      return false;
    }
  }
  
  /**
   * Set Heygen API key (for development only)
   */
  async setApiKey(apiKey: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/api/avatar/set-key`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ api_key: apiKey }),
      });
      
      if (!response.ok) throw new Error("Failed to set API key");
      
      return true;
    } catch (error) {
      console.error("Error setting Heygen API key:", error);
      return false;
    }
  }
  
  /**
   * Create streaming avatar session
   */
  async createStreamingSession(
    text: string,
    avatarConfig: HeygenAvatarConfig = {}
  ): Promise<HeygenStreamingSession | null> {
    try {
      const response = await fetch(`${this.baseUrl}/api/avatar/streaming`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          avatar_config: avatarConfig,
        }),
      });
      
      if (!response.ok) {
        const error = await response.json();
        console.error("Heygen streaming error:", error);
        throw new Error(error.error || "Failed to create streaming session");
      }
      
      return await response.json();
    } catch (error) {
      console.error("Error creating Heygen streaming session:", error);
      return null;
    }
  }
  
  /**
   * Get proxied streaming URL to avoid CORS issues
   */
  getProxiedStreamUrl(originalUrl: string): string {
    const encodedUrl = encodeURIComponent(originalUrl);
    return `${this.baseUrl}/api/avatar/proxy?url=${encodedUrl}`;
  }
}

// Export singleton instance
export const heygenService = new HeygenService();
