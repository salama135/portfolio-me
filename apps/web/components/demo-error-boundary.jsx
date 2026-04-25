'use client';

import { Component } from 'react';

/**
 * Isolates demo runtime errors from the marketing shell (contracts/demo-module-interface.md).
 */
export class DemoErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          className="rounded-xl border border-apple-border-mid bg-apple-gray px-5 py-4 text-apple-ink"
        >
          <p className="font-semibold">This demo hit an error.</p>
          <p className="mt-2 text-sm text-apple-gray-secondary">{this.state.error?.message ?? 'Unknown error'}</p>
          <button
            type="button"
            className="mt-4 rounded-full bg-[#0071e3] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#0077ed] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
            onClick={() => this.setState({ hasError: false, error: null })}
          >
            Reset demo
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
