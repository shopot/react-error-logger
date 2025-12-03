export interface ErrorLog {
  timestamp: string;
  message: string;
  source?: string;
  lineno?: number;
  colno?: number;
  error?: string;
  stack?: string;
  componentStack?: string;
  type: 'error' | 'unhandledrejection' | 'errorboundary';
}

const STORAGE_KEY = 'debug_error_logs';
const ERROR_LOG_ADDED_EVENT = 'errorLogAdded';

export class ErrorLogger {
  private static instance: ErrorLogger;

  private constructor() {}

  public static getInstance(): ErrorLogger {
    if (!ErrorLogger.instance) {
      ErrorLogger.instance = new ErrorLogger();
    }
    return ErrorLogger.instance;
  }

  public saveLog(log: ErrorLog): void {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const existingLogs: ErrorLog[] = stored ? JSON.parse(stored) : [];
      const updatedLogs = [log, ...existingLogs];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedLogs));

      window.dispatchEvent(
        new CustomEvent<ErrorLog>(ERROR_LOG_ADDED_EVENT, { detail: log }),
      );
    }
    catch (error) {
      console.error('Error saving log:', error);
    }
  }

  public loadLogs(): ErrorLog[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    }
    catch (error) {
      console.error('Error loading logs:', error);
    }
    return [];
  }

  public clearLogs(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
      window.dispatchEvent(new CustomEvent('errorLogsCleared'));
    }
    catch (error) {
      console.error('Error clearing logs:', error);
    }
  }

  public static getErrorLogAddedEventName(): string {
    return ERROR_LOG_ADDED_EVENT;
  }

  public createErrorLogFromEvent(event: ErrorEvent): ErrorLog {
    return {
      timestamp: new Date().toISOString(),
      message: event.message || 'Unknown error',
      source: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      error: event.error?.toString(),
      stack: event.error?.stack,
      type: 'error',
    };
  }

  public createErrorLogFromRejection(event: PromiseRejectionEvent): ErrorLog {
    return {
      timestamp: new Date().toISOString(),
      message:
        event.reason?.message
        || String(event.reason)
        || 'Unhandled promise rejection',
      error: event.reason?.toString(),
      stack: event.reason?.stack,
      type: 'unhandledrejection',
    };
  }

  public createErrorLogFromBoundary(
    error: Error,
    errorInfo: { componentStack?: string | null },
  ): ErrorLog {
    return {
      timestamp: new Date().toISOString(),
      message: error.message || 'React ErrorBoundary caught an error',
      error: error.toString(),
      stack: error.stack,
      componentStack: errorInfo.componentStack || undefined,
      type: 'errorboundary',
      source: 'ErrorBoundary',
    };
  }
}
