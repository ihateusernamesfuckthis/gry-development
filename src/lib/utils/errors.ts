/**
 * Safely extracts an error message from an unknown error type
 * @param error - Error of unknown type
 * @returns Error message string
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  return 'An unknown error occurred';
}

/**
 * Logs errors in development only
 * @param message - Error context message
 * @param error - The error to log
 */
export function logError(message: string, error: unknown): void {
  if (process.env.NODE_ENV === 'development') {
    console.error(message, error);
  }
}

/**
 * Logs debug information in development only
 * @param message - Debug message
 * @param data - Optional data to log
 */
export function logDebug(message: string, data?: unknown): void {
  if (process.env.NODE_ENV === 'development') {
    console.log(message, data);
  }
}
