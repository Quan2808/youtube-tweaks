function hideAdsStyle() {
  if (document.getElementById("yt-tweaks-hide-ads-style")) return;

  const style = document.createElement("style");
  style.id = "yt-tweaks-hide-ads-style";
  style.textContent = `
      .video-ads, .ytp-ad-module { display: none !important; }
    `;
  document.head.appendChild(style);
}

function removeHideAdsStyle() {
  const styleElement = document.getElementById("yt-tweaks-hide-ads-style");
  if (styleElement) {
    styleElement.remove();
  }
}

export function enable(isYouTubePage) {
  if (!isYouTubePage()) return;
  hideAdsStyle();
}

export function disable() {
  removeHideAdsStyle();
}
