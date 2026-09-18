// vitest.config.js
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // 'node', not 'jsdom': the scaffold defaulted to jsdom but never added it
    // as a dependency, so the suite could not start. No test touches the DOM.
    environment: 'node',
    globals: true,
  },
});
