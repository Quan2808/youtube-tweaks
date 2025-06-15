function bypassYouTubePopup() {
  // Find and click the "Yes" button to continue
  const confirmButton = document.querySelector("#confirm-button button");
  if (confirmButton) {
    confirmButton.click();
    console.log("Đã bypass popup YouTube");
    return true;
  }

  // Backup: Find button by text content
  const buttons = document.querySelectorAll("button");
  for (let button of buttons) {
    if (button.textContent.trim().toLowerCase() === "yes") {
      button.click();
      console.log("Đã bypass popup YouTube (backup method)");
      return true;
    }
  }

  // Backup 2: Close dialog by clicking outside or ESC
  const dialog = document.querySelector('tp-yt-paper-dialog[role="dialog"]');
  if (dialog) {
    // Thử dispatch ESC key event
    const escEvent = new KeyboardEvent("keydown", {
      key: "Escape",
      keyCode: 27,
      bubbles: true,
    });
    dialog.dispatchEvent(escEvent);
    console.log("Đã thử đóng dialog bằng ESC");
    return true;
  }

  return false;
}

//Function to automatically bypass popup when it appears
function autoBypassYouTubePopup() {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === "childList") {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const popup = node.querySelector
              ? node.querySelector("yt-confirm-dialog-renderer")
              : node.matches && node.matches("yt-confirm-dialog-renderer")
                ? node
                : null;

            if (popup) {
              setTimeout(() => {
                bypassYouTubePopup();
              }, 100);
            }
          }
        });
      }
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  console.log("Auto bypass YouTube popup đã được kích hoạt");
  return observer;
}

// Function to prevent popup from appearing by override
function preventYouTubePopup() {
  // Override functions that can trigger popups
  const originalSetTimeout = window.setTimeout;
  window.setTimeout = function (callback, delay, ...args) {
    // Check if callback is related to popup
    if (typeof callback === "function") {
      const callbackStr = callback.toString();
      if (
        callbackStr.includes("paused") ||
        callbackStr.includes("Continue watching") ||
        callbackStr.includes("yt-confirm-dialog")
      ) {
        console.log("Đã chặn một timeout có thể trigger popup");
        return;
      }
    }
    return originalSetTimeout.call(this, callback, delay, ...args);
  };

  // Override requestIdleCallback if any
  if (window.requestIdleCallback) {
    const originalRequestIdleCallback = window.requestIdleCallback;
    window.requestIdleCallback = function (callback, options) {
      if (typeof callback === "function") {
        const callbackStr = callback.toString();
        if (
          callbackStr.includes("paused") ||
          callbackStr.includes("Continue watching")
        ) {
          console.log("Đã chặn một idle callback có thể trigger popup");
          return;
        }
      }
      return originalRequestIdleCallback.call(this, callback, options);
    };
  }

  console.log("Prevention methods đã được kích hoạt");
}

// Main function to setup bypass
export function setupYouTubePopupBypass() {
  // Bypass current popup if any
  bypassYouTubePopup();

  // Setup auto bypass for future
  const observer = autoBypassYouTubePopup();

  // Setup prevention methods
  preventYouTubePopup();

  const intervalId = setInterval(() => {
    bypassYouTubePopup();
  }, 5000);

  return () => {
    observer.disconnect();
    clearInterval(intervalId);
  };
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", setupYouTubePopupBypass);
} else {
  setupYouTubePopupBypass();
}

// Export functions to be used from console
// window.youtubeBypass = {
//   setup: setupYouTubePopupBypass,
//   bypass: bypassYouTubePopup,
//   auto: autoBypassYouTubePopup,
//   prevent: preventYouTubePopup,
// };
