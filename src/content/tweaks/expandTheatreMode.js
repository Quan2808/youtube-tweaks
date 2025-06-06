const theaterMode = `
  ytd-watch-flexy[theater] #player-full-bleed-container.ytd-watch-flexy,
  ytd-watch-grid[theater] #player-full-bleed-container.ytd-watch-grid {
    height: 100vh !important;
    max-height: calc(100vh - 56px) !important;
  }
`;

const fullscreenMode = `
  ytd-watch-flexy[fullscreen] #player-full-bleed-container.ytd-watch-flexy,
  ytd-watch-grid[fullscreen] #player-full-bleed-container.ytd-watch-grid {
    max-height: 100vh !important;
    min-height: 100vh !important;
  }
`;

const fullBleedPlayer = `
  ytd-watch-flexy[full-bleed-player] #full-bleed-container.ytd-watch-flexy,
  ytd-watch-grid[full-bleed-player] #full-bleed-container.ytd-watch-grid {
    block-size: fit-content !important;
    max-height: fit-content !important;
  }
`;

function addStyles() {
  if (document.getElementById("expand-theatre-style")) return;

  const style = document.createElement("style");
  style.id = "expand-theatre-style";
  style.textContent = theaterMode + fullscreenMode + fullBleedPlayer;
  document.head.appendChild(style);
}

function removeStyles() {
  const style = document.getElementById("expand-theatre-style");
  if (style) style.remove();
}

function observeChanges() {
  const targetNode = document.querySelector("ytd-app") || document.body;
  const observer = new MutationObserver((mutations) => {
    const isTheater = document.querySelector(
      "ytd-watch-flexy[theater], ytd-watch-grid[theater]"
    );
    const isFullscreen = document.querySelector(
      "ytd-watch-flexy[fullscreen], ytd-watch-grid[fullscreen]"
    );
    if (isTheater || isFullscreen) {
      addStyles();
    }
  });

  const config = {
    attributes: true,
    childList: true,
    subtree: true,
    attributeFilter: ["theater", "fullscreen"],
  };

  observer.observe(targetNode, config);

  return observer;
}

export function enable(isYouTubePage) {
  if (!isYouTubePage()) return;
  addStyles();
  const observer = observeChanges();
  window.youtubeTheaterObserver = observer;
}

export function disable() {
  removeStyles();
  if (window.youtubeTheaterObserver) {
    window.youtubeTheaterObserver.disconnect();
    window.youtubeTheaterObserver = null;
  }
}
