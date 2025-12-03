# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.1] - 2025-12-04

### Changed
- Moved `react-error-boundary` from dependencies to peer dependencies to avoid duplicate installations and give users control over the version

## [0.1.0] - 2025-11-27

### Added
- Initial release of `react-error-logger`
- `ReactErrorLogger` component for displaying error logs with floating button and modal UI
- `handleReactErrorLogger` function for React ErrorBoundary integration
- `ErrorLogger` singleton class for programmatic error logging
- Automatic error catching for:
  - JavaScript errors via `window.onerror`
  - Unhandled promise rejections
  - React ErrorBoundary errors
- Persistent error storage in localStorage
- Export functionality to download error logs as text file
- TypeScript support with full type definitions
- Detailed error information including:
  - Stack traces
  - Component stacks
  - Source locations
  - Timestamps
- Zero configuration setup

[Unreleased]: https://github.com/shopot/react-error-logger/compare/v0.1.1...HEAD
[0.1.1]: https://github.com/shopot/react-error-logger/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/shopot/react-error-logger/releases/tag/v0.1.0

