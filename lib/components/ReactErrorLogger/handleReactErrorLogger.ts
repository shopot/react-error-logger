import { type ErrorInfo } from 'react';
import { ErrorLogger } from './ErrorLogger';

export const handleReactErrorLogger = (
  error: Error,
  errorInfo: ErrorInfo,
) => {
  const errorLogger = ErrorLogger.getInstance();
  const errorLog = errorLogger.createErrorLogFromBoundary(error, errorInfo);
  errorLogger.saveLog(errorLog);
};
