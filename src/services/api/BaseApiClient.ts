
import { RequestHelper } from './RequestHelper';
import { BackendError } from './BackendError';

export class BaseApiClient {
  protected baseUrl: string;
  protected debug: boolean;
  protected requestHelper: RequestHelper;

  constructor(baseUrl: string, debug: boolean = false) {
    // Make sure baseUrl doesn't end with a slash
    this.baseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    this.debug = debug;
    this.requestHelper = new RequestHelper(debug);
  }

  protected async makeRequest<T>(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    data?: any,
    customHeaders?: Record<string, string>
  ): Promise<T> {
    try {
      // Make sure endpoint doesn't start with a slash
      const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
      const url = `${this.baseUrl}/${cleanEndpoint}`;
      
      const headers = {
        ...this.getHeaders(),
        ...(customHeaders || {})
      };

      if (this.debug) {
        console.log(`[BaseApiClient] Making ${method} request to ${url}`);
        if (data) console.log('[BaseApiClient] Request data:', data);
      }

      const response = await this.requestHelper.fetchWithRetry(
        url,
        {
          method,
          headers,
          body: data ? JSON.stringify(data) : undefined,
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ 
          message: `HTTP error! Status: ${response.status}` 
        }));
        
        throw new BackendError(
          errorData.error || errorData.message || `Request failed with status ${response.status}`,
          response.status
        );
      }

      const result = await response.json() as T;
      
      if (this.debug) {
        console.log(`[BaseApiClient] Response for ${url}:`, result);
      }

      return result;
    } catch (error) {
      if (this.debug) {
        console.error(`[BaseApiClient] Error in ${method} request:`, error);
      }
      throw error instanceof BackendError 
        ? error 
        : new BackendError(error instanceof Error ? error.message : 'Unknown error');
    }
  }

  protected getHeaders(): Record<string, string> {
    return {
      'Content-Type': 'application/json',
    };
  }

  async isBackendAvailable(): Promise<boolean> {
    try {
      await this.makeRequest('health', 'GET');
      return true;
    } catch (error) {
      if (this.debug) {
        console.error('[BaseApiClient] Backend health check failed:', error);
      }
      return false;
    }
  }
}
