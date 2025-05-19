
import { BackendError } from './BackendError';
import { BACKEND_CONFIG } from '@/config/backendConfig';

export class RequestHelper {
  private debug: boolean;
  private maxAttempts: number;
  private initialDelay: number;
  private maxDelay: number;
  private backoffFactor: number;

  constructor(debug: boolean = false) {
    this.debug = debug;
    this.maxAttempts = BACKEND_CONFIG.retry?.maxAttempts || 3;
    this.initialDelay = BACKEND_CONFIG.retry?.initialDelay || 1000;
    this.maxDelay = BACKEND_CONFIG.retry?.maxDelay || 5000;
    this.backoffFactor = BACKEND_CONFIG.retry?.backoffFactor || 2;
  }

  /**
   * Fetch with exponential backoff retry
   */
  async fetchWithRetry(
    url: string,
    options: RequestInit,
    attempt: number = 1
  ): Promise<Response> {
    try {
      const response = await fetch(url, options);
      
      // Only retry on 5xx errors (server errors) and if we haven't exceeded maxAttempts
      if (response.status >= 500 && attempt < this.maxAttempts) {
        const delay = Math.min(
          this.initialDelay * Math.pow(this.backoffFactor, attempt - 1),
          this.maxDelay
        );
        
        if (this.debug) {
          console.info(`[RequestHelper] Request to ${url} failed with status ${response.status}. Retrying in ${delay}ms. Attempt ${attempt}/${this.maxAttempts}`);
        }
        
        await new Promise(resolve => setTimeout(resolve, delay));
        return this.fetchWithRetry(url, options, attempt + 1);
      }
      
      return response;
    } catch (error) {
      if (this.debug) {
        console.info(`[RequestHelper] Attempt ${attempt} failed for ${options.method || 'GET'} ${url}:`, error);
      }
      
      if (attempt < this.maxAttempts) {
        const delay = Math.min(
          this.initialDelay * Math.pow(this.backoffFactor, attempt - 1),
          this.maxDelay
        );
        
        if (this.debug) {
          console.info(`[RequestHelper] Retrying in ${delay}ms. Attempt ${attempt + 1}/${this.maxAttempts}`);
        }
        
        await new Promise(resolve => setTimeout(resolve, delay));
        return this.fetchWithRetry(url, options, attempt + 1);
      }
      
      throw new BackendError(
        `Failed after ${attempt} attempts: ${error instanceof Error ? error.message : 'Unknown error'}`,
        undefined,
        attempt
      );
    }
  }
}
