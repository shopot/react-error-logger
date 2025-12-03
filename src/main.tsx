import React from 'react';
import ReactDOM from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import App from './App.tsx';
import './index.css';

// https://nodejs.org/api/packages.html#packages_self_referencing_a_package_using_its_name
import { handleReactErrorLogger } from 'react-error-logger';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary
      fallback={<div>Something went wrong</div>}
      onError={handleReactErrorLogger}
    >
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
);
