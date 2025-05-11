
/**
 * Configuration for backend API connection
 */
export const BACKEND_CONFIG = {
  // Use the relative URL path which will work in both development and production
  baseUrl: "/api",
  
  // Debug setting - set to true during development to see detailed logs
  debug: true,
  
  // Retry configuration
  retry: {
    maxAttempts: 3,      // Maximum number of retry attempts
    initialDelay: 1000,  // Initial delay between retries in ms
    maxDelay: 5000,      // Maximum delay between retries in ms
    backoffFactor: 2     // Exponential backoff factor
  }
};
