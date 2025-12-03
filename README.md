# react-error-logger

[![npm version](https://img.shields.io/npm/v/react-error-logger.svg)](https://www.npmjs.com/package/react-error-logger)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A comprehensive React component for catching, logging, and managing JavaScript errors, unhandled promise rejections, and React ErrorBoundary errors in your React applications. Perfect for debugging and error tracking during development and production.

## Features

- 🎯 **Comprehensive Error Catching**: Automatically captures JavaScript errors, unhandled promise rejections, and React ErrorBoundary errors
- 💾 **Persistent Storage**: Errors are saved to localStorage and persist across page reloads
- 🎨 **User-Friendly UI**: Clean, modern interface with a floating button and modal for viewing errors
- 📥 **Export Functionality**: Download error logs as a text file for further analysis
- 🔍 **Detailed Information**: Captures stack traces, component stacks, source locations, and timestamps
- ⚡ **Zero Configuration**: Works out of the box with minimal setup
- 📦 **TypeScript Support**: Fully typed with TypeScript definitions included
- 🎛️ **Customizable**: Easy to integrate with existing ErrorBoundary components

## Installation

```bash
npm install react-error-logger
```

or

```bash
yarn add react-error-logger
```

or

```bash
pnpm add react-error-logger
```

## Peer Dependencies

This library requires React 18.2.0 or higher:

```bash
npm install react@^18.2.0 react-dom@^18.2.0
```

## Quick Start

### Basic Usage

Simply add the `ReactErrorLogger` component to your app:

```tsx
import { ReactErrorLogger } from 'react-error-logger';

function App() {
  return (
    <div>
      {/* Your app content */}
      <ReactErrorLogger />
    </div>
  );
}
```

### With ErrorBoundary

For React ErrorBoundary errors, use the `handleReactErrorLogger` function with your ErrorBoundary:

```tsx
import { ErrorBoundary } from 'react-error-boundary';
import { ReactErrorLogger, handleReactErrorLogger } from 'react-error-logger';

function App() {
  return (
    <ErrorBoundary onError={handleReactErrorLogger} fallback={<div>Something went wrong</div>}>
      {/* Your app content */}
      <ReactErrorLogger />
    </ErrorBoundary>
  );
}
```

## API Reference

### `ReactErrorLogger`

The main component that provides the UI for viewing and managing error logs.

**Props**: None (component is self-contained)

**Features**:
- Floating button with error count badge
- Modal window for viewing all errors
- Download logs as text file
- Clear all logs functionality

### `handleReactErrorLogger`

A callback function for React ErrorBoundary components to log errors.

**Signature**:
```typescript
handleReactErrorLogger(error: Error, errorInfo: ErrorInfo): void
```

**Usage**:
```tsx
<ErrorBoundary onError={handleReactErrorLogger}>
  {/* Your components */}
</ErrorBoundary>
```

### `ErrorLogger`

A singleton class for programmatic error logging (optional advanced usage).

**Methods**:
- `getInstance()`: Get the ErrorLogger instance
- `saveLog(log: ErrorLog)`: Save an error log
- `loadLogs()`: Load all saved error logs
- `clearLogs()`: Clear all saved error logs
- `createErrorLogFromEvent(event: ErrorEvent)`: Create log from ErrorEvent
- `createErrorLogFromRejection(event: PromiseRejectionEvent)`: Create log from PromiseRejectionEvent
- `createErrorLogFromBoundary(error: Error, errorInfo: ErrorInfo)`: Create log from ErrorBoundary

## Error Types

The library captures three types of errors:

1. **JavaScript Errors** (`error`): Standard JavaScript errors caught by `window.onerror`
2. **Unhandled Promise Rejections** (`unhandledrejection`): Promise rejections that aren't handled
3. **React ErrorBoundary Errors** (`errorboundary`): Errors caught by React ErrorBoundary components

## Error Log Structure

Each error log contains the following information:

```typescript
interface ErrorLog {
  timestamp: string;        // ISO timestamp
  message: string;          // Error message
  type: 'error' | 'unhandledrejection' | 'errorboundary';
  source?: string;          // Source file URL
  lineno?: number;          // Line number
  colno?: number;           // Column number
  error?: string;           // Error string representation
  stack?: string;           // Stack trace
  componentStack?: string;  // React component stack (for ErrorBoundary)
}
```

## Styling

The component includes default styles that are automatically imported. The styles are scoped and won't interfere with your application's styles.

If you need to customize the appearance, you can override the CSS classes:

- `.floatingButton` - The floating action button
- `.modalOverlay` - The modal backdrop
- `.modalContent` - The modal container
- `.logItem` - Individual error log item
- And more...

## Browser Support

This library works in all modern browsers that support:
- ES6+ features
- localStorage API
- React 18+

## Storage

Errors are stored in the browser's `localStorage` under the key `debug_error_logs`. The storage is persistent across page reloads and browser sessions.

**Note**: Be aware of localStorage size limits (typically 5-10MB depending on the browser). The library doesn't implement automatic log rotation, so you may want to periodically clear logs in production.

## Development

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build library
pnpm build

# Lint code
pnpm lint

# Fix linting issues
pnpm lint:fix
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

If you encounter any issues or have questions, please open an issue on [GitHub](https://github.com/shopot/react-error-logger).

---

Made with ❤️ for the React community

