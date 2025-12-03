import { useEffect, useState } from 'react';
import { ErrorLogger } from './ErrorLogger';
import type { ErrorLog } from './ErrorLogger';

import styles from './ReactErrorLogger.module.scss';

export const ReactErrorLogger = () => {
  const errorLogger = ErrorLogger.getInstance();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [logs, setLogs] = useState<ErrorLog[]>(errorLogger.loadLogs());

  const loadLogs = () => {
    const loadedLogs = errorLogger.loadLogs();
    setLogs(loadedLogs);
  };

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      const errorLog = errorLogger.createErrorLogFromEvent(event);
      errorLogger.saveLog(errorLog);
      setLogs(prev => [errorLog, ...prev]);
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const errorLog = errorLogger.createErrorLogFromRejection(event);
      errorLogger.saveLog(errorLog);
      setLogs(prev => [errorLog, ...prev]);
    };

    const handleErrorLogAdded = (event: CustomEvent<ErrorLog>) => {
      setLogs(prev => [event.detail, ...prev]);
    };

    const handleErrorLogsCleared = () => {
      setLogs([]);
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    window.addEventListener(
      ErrorLogger.getErrorLogAddedEventName(),
      handleErrorLogAdded as EventListener,
    );
    window.addEventListener('errorLogsCleared', handleErrorLogsCleared);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener(
        'unhandledrejection',
        handleUnhandledRejection,
      );
      window.removeEventListener(
        ErrorLogger.getErrorLogAddedEventName(),
        handleErrorLogAdded as EventListener,
      );
      window.removeEventListener('errorLogsCleared', handleErrorLogsCleared);
    };
  }, [errorLogger]);

  const openModal = () => {
    loadLogs();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const downloadLogs = () => {
    const logText = logs
      .map((log, index) => {
        const typeLabel
          = log.type === 'error'
            ? 'JavaScript Error'
            : log.type === 'unhandledrejection'
              ? 'Unhandled Promise Rejection'
              : 'React ErrorBoundary';
        return `
=== Error #${index + 1} ===
Type: ${typeLabel}
Time: ${new Date(log.timestamp).toLocaleString('en-US')}
Message: ${log.message}
${log.source ? `Source: ${log.source}` : ''}
${log.lineno ? `Line: ${log.lineno}` : ''}
${log.colno ? `Column: ${log.colno}` : ''}
${log.error ? `Error: ${log.error}` : ''}
${log.stack ? `Stack trace:\n${log.stack}` : ''}
${log.componentStack ? `Component stack:\n${log.componentStack}` : ''}
`;
      })
      .join('\n');

    const blob = new Blob([logText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `error_logs_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Clear logs
  const clearLogs = () => {
    if (window.confirm('Are you sure you want to clear all logs?')) {
      errorLogger.clearLogs();
      setLogs([]);
    }
  };

  return (
    <>
      <button
        className={styles.floatingButton}
        onClick={openModal}
        title="View error logs"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        {logs.length > 0 && <span className={styles.badge}>{logs.length}</span>}
      </button>

      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div
            className={styles.modalContent}
            onClick={e => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <h2>Error logs</h2>
              <button className={styles.closeButton} onClick={closeModal}>
                ×
              </button>
            </div>

            <div className={styles.modalBody}>
              {logs.length === 0
                ? (
                  <div className={styles.emptyState}>No recorded errors</div>
                )
                : (
                  <div className={styles.logsContainer}>
                    {logs.map((log, index) => (
                      <div key={index} className={styles.logItem}>
                        <div className={styles.logHeader}>
                          <span className={styles.logType}>
                            {log.type === 'error'
                              ? 'JS Error'
                              : log.type === 'unhandledrejection'
                                ? 'Promise Rejection'
                                : 'ErrorBoundary'}
                          </span>
                          <span className={styles.logTimestamp}>
                            {new Date(log.timestamp).toLocaleString('en-US')}
                          </span>
                        </div>
                        <div className={styles.logMessage}>{log.message}</div>
                        {log.source && (
                          <div className={styles.logDetail}>
                            <strong>Source:</strong>
                            {' '}
                            {log.source}
                            {log.lineno && `:${log.lineno}:${log.colno}`}
                          </div>
                        )}
                        {log.stack && (
                          <details className={styles.logStack}>
                            <summary>Stack trace</summary>
                            <pre>{log.stack}</pre>
                          </details>
                        )}
                        {log.componentStack && (
                          <details className={styles.logStack}>
                            <summary>Component stack</summary>
                            <pre>{log.componentStack}</pre>
                          </details>
                        )}
                      </div>
                    ))}
                  </div>
                )}
            </div>

            <div className={styles.modalFooter}>
              <button
                className={styles.downloadButton}
                onClick={downloadLogs}
                disabled={logs.length === 0}
              >
                Download
              </button>
              <button
                className={styles.clearButton}
                onClick={clearLogs}
                disabled={logs.length === 0}
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
