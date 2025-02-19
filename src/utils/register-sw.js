export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('[Service Worker] Registered:', registration);
      })
      .catch((error) => {
        console.error('[Service Worker] Registration failed:', error);
      });
  }
}
