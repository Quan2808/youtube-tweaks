let observer = null;

function setupVolumeBoost(player, volumeBoostAmount) {
  if (!player || window.audioCtx || window.gainNode) return;
  try {
    window.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const source = window.audioCtx.createMediaElementSource(player);
    const gainNode = window.audioCtx.createGain();
    source.connect(gainNode);
    gainNode.connect(window.audioCtx.destination);
    window.gainNode = gainNode;
    applyVolumeBoost(volumeBoostAmount);
    console.log(
      `%cVolume boost enabled: ${volumeBoostAmount}dB`,
      "color: magenta"
    );
  } catch (error) {
    console.log(
      `%cFailed to enable volume boost: ${error.message}`,
      "color: red"
    );
  }
}

function applyVolumeBoost(volumeBoostAmount) {
  if (window.gainNode) {
    const gainValue = Math.pow(10, volumeBoostAmount / 20); // Convert dB to linear gain
    window.gainNode.gain.value = gainValue;
  }
}

function disableVolumeBoost() {
  if (window.gainNode) {
    window.gainNode.gain.value = 1; // Reset to default
    window.gainNode.disconnect();
    window.audioCtx.close();
    window.gainNode = null;
    window.audioCtx = null;
    console.log(`%cVolume boost disabled`, "color: magenta");
  }
}

function applyVolumeBoostToVideos() {
  chrome.storage.sync.get(["ytTweaksSettings"], (result) => {
    const settings = result.ytTweaksSettings || {};
    if (!settings.volumeBoost) {
      disableVolumeBoost();
      return;
    }
    const volumeBoostAmount = settings.volumeBoostAmount || 6;
    const videos = document.querySelectorAll("video");
    videos.forEach((video) => {
      if (!window.audioCtx) {
        setupVolumeBoost(video, volumeBoostAmount);
      } else {
        applyVolumeBoost(volumeBoostAmount);
      }
    });
  });
}

function observeChanges() {
  observer = new MutationObserver(() => {
    applyVolumeBoostToVideos();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  // Initial application
  applyVolumeBoostToVideos();
}

export function enable(isYouTubePage) {
  if (!isYouTubePage()) return;
  observeChanges();
  // Listen for storage changes to update volume boost dynamically
  chrome.storage.onChanged.addListener((changes) => {
    if (changes.ytTweaksSettings) {
      applyVolumeBoostToVideos();
    }
  });
}

export function disable() {
  if (observer) {
    observer.disconnect();
    observer = null;
  }
  disableVolumeBoost();
}
