// Store target selectors
const MODAL_SELECTOR = '.fixed.inset-0.bg-gray-900.bg-opacity-75.flex.items-center.justify-center.z-50.p-4';
const HEADER_SELECTOR = '.bg-gradient-to-br.from-indigo-900.via-purple-900.to-indigo-800.text-white.py-8.px-4.md\\:py-12.md\\:px-10.shadow-lg.relative.overflow-hidden';

// Immediately inject blocking styles
function injectBlockingStyles() {
  const style = document.createElement('style');
  style.textContent = `
    ${MODAL_SELECTOR}, 
    ${HEADER_SELECTOR} {
      display: none !important;
      visibility: hidden !important;
      opacity: 0 !important;
      pointer-events: none !important;
    }
  `;
  
  // Insert styles as early as possible
  (document.head || document.documentElement).appendChild(style);
}

// Direct element removal function
function removeModalElement() {
  const modal = document.querySelector(MODAL_SELECTOR);
  if (modal) {
    modal.remove();
    return true;
  }
  return false;
}

// Performance-optimized observer
function createObserver() {
  let timeoutId = null;
  const observer = new MutationObserver((mutations) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
    timeoutId = setTimeout(() => {
      if (removeModalElement()) {
        observer.disconnect();
      }
    }, 0);
  });

  return observer;
}

// Initialize everything
function initialize() {
  injectBlockingStyles();

  if (!removeModalElement()) {
    const observer = createObserver();
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true
    });
    
    setTimeout(() => {
      observer.disconnect();
    }, 5000);
  }
}

// Run initialization as early as possible
initialize();

// Add a backup check when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialize);
} else {
  initialize();
}