
export class BackendError extends Error {
  status?: number;
  attempt?: number;

  constructor(message: string, status?: number, attempt?: number) {
    super(message);
    this.name = 'BackendError';
    this.status = status;
    this.attempt = attempt;
  }
}
