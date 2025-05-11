
/**
 * Custom error class for backend-related errors
 */
export class BackendError extends Error {
  public status?: number;
  public attempt?: number;
  
  constructor(message: string, status?: number, attempt?: number) {
    super(message);
    this.name = 'BackendError';
    this.status = status;
    this.attempt = attempt;
    
    // This is needed for proper inheritance in TypeScript
    Object.setPrototypeOf(this, BackendError.prototype);
  }
}
