import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.scss';

// https://nodejs.org/api/packages.html#packages_self_referencing_a_package_using_its_name
import { ReactErrorLogger } from 'react-error-logger';

const ErrorComponent = () => {
  throw new Error('Test ErrorBoundary error - компонент упал при рендеринге');
};

function App() {
  const [count, setCount] = useState(0);
  const [shouldThrowError, setShouldThrowError] = useState(false);

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h2>React</h2>
      <div className="card">
        <button onClick={() => setCount(count => count + 1)}>
          count is
          {' '}
          {count}
        </button>
      </div>
      <div
        style={{
          marginTop: '20px',
          display: 'flex',
          gap: '10px',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <button
          onClick={() => {
            throw new Error('Test error for DebugComponent check');
          }}
          style={{
            padding: '10px 20px',
            backgroundColor: '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          Generate error
        </button>
        <button
          onClick={() => {
            Promise.reject(new Error('Test promise error'));
          }}
          style={{
            padding: '10px 20px',
            backgroundColor: '#f59e0b',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          Generate promise error
        </button>
        <button
          onClick={() => {
            setShouldThrowError(true);
          }}
          style={{
            padding: '10px 20px',
            backgroundColor: '#8b5cf6',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          Generate ErrorBoundary error
        </button>
      </div>
      {shouldThrowError && <ErrorComponent />}
      <ReactErrorLogger />
    </>
  );
}

export default App;
