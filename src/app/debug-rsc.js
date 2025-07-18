// Temporary debug file to diagnose RSC loading issue
console.log('[DEBUG] React version:', require('react').version);
console.log('[DEBUG] React DOM version:', require('react-dom').version);
console.log('[DEBUG] Next.js webpack config loaded');

// Add to window for inspection
if (typeof window !== 'undefined') {
  window.__DEBUG_RSC__ = {
    react: require('react').version,
    reactDom: require('react-dom').version,
    timestamp: new Date().toISOString()
  };
  console.log('[DEBUG] Debug info attached to window.__DEBUG_RSC__');
}