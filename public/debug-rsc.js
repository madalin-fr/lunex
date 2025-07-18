// Debug script to track React Server Component initialization
console.log('[DEBUG-RSC] Script loaded at:', new Date().toISOString());

// Override console methods to add timestamps
const originalLog = console.log;
const originalError = console.error;
const originalWarn = console.warn;

console.log = function(...args) {
  originalLog('[DEBUG]', new Date().toISOString(), ...args);
};

console.error = function(...args) {
  originalError('[DEBUG-ERROR]', new Date().toISOString(), ...args);
};

console.warn = function(...args) {
  originalWarn('[DEBUG-WARN]', new Date().toISOString(), ...args);
};

// Track module loading
if (typeof window !== 'undefined') {
  window.__DEBUG_RSC__ = {
    modules: [],
    errors: []
  };
  
  // Intercept module errors
  window.addEventListener('error', (event) => {
    window.__DEBUG_RSC__.errors.push({
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      stack: event.error?.stack,
      timestamp: new Date().toISOString()
    });
  });
}

console.log('Debug RSC tracking initialized');