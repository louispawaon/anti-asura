function logMessage(message) {
    const timestamp = new Date().toLocaleTimeString();
    console.log(`[${timestamp}] ${message}`);
  }
  
  function removeElements() {
    const elementsToRemove = [
      {
        selector: '.fixed.inset-0.bg-gray-900.bg-opacity-75.flex.items-center.justify-center.z-50.p-4',
        name: 'Modal (Premium Upgrade Prompt)'
      },
      {
        selector: '.bg-gradient-to-br.from-indigo-900.via-purple-900.to-indigo-800.text-white.py-8.px-4.md\\:py-12.md\\:px-10.shadow-lg.relative.overflow-hidden',
        name: 'Header (Premium Benefits Section)'
      }
    ];
  
    elementsToRemove.forEach(({ selector, name }) => {
      const element = document.querySelector(selector);
      if (element) {
        element.remove(); 
        logMessage(`✅ Successfully removed: ${name}`);
      } else {
        logMessage(`⚠️ Element not found: ${name}`);
      }
    });
  }
  
  const observer = new MutationObserver((mutations) => {
    mutations.forEach(mutation => {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        logMessage('🔄 Detected dynamic content changes. Checking for elements to remove...');
        removeElements();
      }
    });
  });
  
  observer.observe(document.body, { childList: true, subtree: true });
  
  document.addEventListener('DOMContentLoaded', () => {
    logMessage('🚀 DOM fully loaded. Removing elements...');
    removeElements();
  });
  
  setTimeout(() => {
    logMessage('⏳ Fallback: Checking for elements after delay...');
    removeElements();
  }, 3000); 