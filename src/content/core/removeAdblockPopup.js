export function removeAdblockPopup() {
  setInterval(() => {
    const modalOverlay = document.querySelector("tp-yt-iron-overlay-backdrop");
    const popup = document.querySelector(
      ".style-scope ytd-enforcement-message-view-model"
    );
    const dismissButton = document.getElementById("dismiss-button");
    const video = document.querySelector("video");

    const bodyStyle = document.body.style;
    bodyStyle.setProperty("overflow-y", "auto", "important");

    if (modalOverlay || popup) {
      if (modalOverlay) {
        modalOverlay.removeAttribute("opened");
        modalOverlay.remove();
      }

      if (popup) {
        if (dismissButton) {
          dismissButton.click();
        }
        popup.remove();
        // Only attempt to play the video if it was paused due to the popup
        if (video && video.paused) {
          video.play().catch((error) => {
            console.error("Failed to play video:", error);
          });
        }
      }

      if (modalOverlay) {
        modalOverlay.removeAttribute("opened");
        modalOverlay.remove();
      }
    }
  }, 1000);
}
