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

    if (modalOverlay) {
      modalOverlay.removeAttribute("opened");
      modalOverlay.remove();
    }

    if (popup) {
      if (dismissButton) {
        dismissButton.click();
      }
      popup.remove();
      video.play();

      setTimeout(() => {
        video.play();
      }, 500);
    }

    if (!video.paused) {
      return;
    }
    video.play();
  }, 1000);
}
