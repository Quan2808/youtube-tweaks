function cleanShareUrl(url) {
  return url.replace(/\?si=[^&]*/, "");
}

function updateShareInput() {
  const shareInput = document.getElementById("share-url");
  if (shareInput && shareInput.value.includes("?si=")) {
    shareInput.value = cleanShareUrl(shareInput.value);
  }
}

function cleanAllYouTubeLinks() {
  document
    .querySelectorAll('a[href*="youtu.be"], a[href*="youtube.com"]')
    .forEach((link) => {
      if (link.href.includes("?si=")) {
        link.href = cleanShareUrl(link.href);
      }
    });
}

let observer = null;

function observeChanges() {
  observer = new MutationObserver(() => {
    updateShareInput();
    cleanAllYouTubeLinks();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  // Làm sạch ban đầu
  updateShareInput();
  cleanAllYouTubeLinks();
}

function handleCopyButton() {
  document.addEventListener("click", (event) => {
    const copyButton = event.target.closest("#copy-button");
    if (copyButton) {
      const shareInput = document.getElementById("share-url");
      if (shareInput && shareInput.value.includes("?si=")) {
        const cleanedUrl = cleanShareUrl(shareInput.value);
        shareInput.value = cleanedUrl;
        navigator.clipboard.writeText(cleanedUrl);
      }
    }
  });
}

function handleInputChanges() {
  document.addEventListener("input", (event) => {
    if (
      event.target.id === "share-url" &&
      event.target.value.includes("?si=")
    ) {
      event.target.value = cleanShareUrl(event.target.value);
    }
  });
}

export function enable(isYouTubePage) {
  if (!isYouTubePage()) return;
  observeChanges();
  handleCopyButton();
  handleInputChanges();
}

export function disable() {
  if (observer) {
    observer.disconnect();
    observer = null;
  }
}
