// Cache for dislike data to avoid repeated API calls
const dislikeCache = {};

// CSS styles for the dislike counter
function addDislikeStyles() {
  if (document.getElementById("yt-tweaks-dislike-counter")) return;

  const style = document.createElement("style");
  style.id = "yt-tweaks-dislike-counter";
  style.textContent = `
    .yt-tweaks-dislike-count {
      height: 36px;
      line-height: 36px;
      display: inline-flex;
      margin-left: 4px;
      font-family: "Roboto", "Arial", sans-serif;
      font-size: 14px;
      font-weight: 500;
      color: var(--yt-spec-text-primary);
    }
    .dislike-button-expanded {
      width: auto !important;
      padding-right: 12px !important;
    }
  `;
  document.head.appendChild(style);
}

// Remove CSS styles
function removeDislikeStyles() {
  const styleElement = document.getElementById("yt-tweaks-dislike-counter");
  if (styleElement) {
    styleElement.remove();
  }
}

// Format a number as a YouTube-style count (e.g., 1.2K, 3.5M)
function formatCount(count) {
  if (count >= 1_000_000_000)
    return (count / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B";
  if (count >= 1_000_000)
    return (count / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (count >= 1_000)
    return (count / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  return count.toString();
}

// Get video ID from URL
function getVideoId() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("v");
}

// Fetch dislike count from Return YouTube Dislike API
async function fetchDislikeCount(videoId) {
  if (dislikeCache[videoId]) return dislikeCache[videoId];

  const apiUrl = `https://returnyoutubedislikeapi.com/votes?videoId=${videoId}`;
  try {
    const response = await fetch(apiUrl);
    // if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    if (data && data.dislikes !== undefined) {
      const formattedCount = formatCount(data.dislikes);
      dislikeCache[videoId] = formattedCount;
      return formattedCount;
    }
    return null;
  } catch (error) {
    console.error("Error fetching dislike data:", error);
    return null;
  }
}

// Add dislike counts to dislike buttons
async function addDislikeCounts() {
  const videoId = getVideoId();
  if (!videoId) return;

  const dislikeButtons = document.querySelectorAll(
    "dislike-button-view-model button:not(.yt-tweaks-dislike-processed)"
  );

  for (const button of dislikeButtons) {
    button.classList.add(
      "yt-tweaks-dislike-processed",
      "dislike-button-expanded"
    );

    const dislikeCountEl = document.createElement("span");
    dislikeCountEl.className = "yt-tweaks-dislike-count";
    dislikeCountEl.dataset.videoId = videoId;
    button.appendChild(dislikeCountEl);

    // dislikeCountEl.textContent = "..."; // Loading indicator
    const dislikeCount = await fetchDislikeCount(videoId);
    if (dislikeCountEl.dataset.videoId === videoId) {
      dislikeCountEl.textContent = dislikeCount;
    }
  }
}

// Clean up dislike counts
function removeDislikeCounts() {
  document
    .querySelectorAll(".yt-tweaks-dislike-processed")
    .forEach((button) => {
      button.classList.remove(
        "yt-tweaks-dislike-processed",
        "dislike-button-expanded"
      );
      const countEl = button.querySelector(".yt-tweaks-dislike-count");
      if (countEl) countEl.remove();
    });
}

// Observe page changes for new dislike buttons or video changes
function observeChanges(callback) {
  let currentVideoId = getVideoId();

  const observer = new MutationObserver((mutations) => {
    const videoId = getVideoId();
    const hasDislikeButton = mutations.some((mutation) =>
      mutation.target.querySelector("dislike-button-view-model button")
    );

    if (videoId !== currentVideoId || hasDislikeButton) {
      currentVideoId = videoId;
      removeDislikeCounts(); // Reset for new video
      callback();
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  // Handle SPA navigation
  const oldPushState = history.pushState;
  history.pushState = function (...args) {
    oldPushState.apply(this, args);
    setTimeout(() => {
      const videoId = getVideoId();
      if (videoId !== currentVideoId) {
        currentVideoId = videoId;
        removeDislikeCounts();
        callback();
      }
    }, 500);
  };

  window.addEventListener("popstate", () => {
    setTimeout(() => {
      const videoId = getVideoId();
      if (videoId !== currentVideoId) {
        currentVideoId = videoId;
        removeDislikeCounts();
        callback();
      }
    }, 500);
  });

  // Initial check
  if (getVideoId()) callback();
}

// Enable the feature
export function enable(isYouTubePage) {
  if (!isYouTubePage()) return;
  addDislikeStyles();
  observeChanges(addDislikeCounts);
}

// Disable the feature
export function disable() {
  removeDislikeStyles();
  removeDislikeCounts();
}
