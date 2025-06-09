const currentVersion = chrome.runtime.getManifest().version;
const githubRepo = "Quan2808/youtube-tweaks";
const GITHUB_API_URL = `https://api.github.com/repos/${githubRepo}/releases/latest`;

let lastCheckTime = 0;
let cachedLatestVersion = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export function displayExtensionVersion() {
  const versionElement = document.getElementById("extensionVersion");
  if (versionElement) {
    versionElement.textContent = `v${currentVersion}`;
  }
}

function compareVersions(version1, version2) {
  const v1parts = version1.replace(/^v/, "").split(".").map(Number);
  const v2parts = version2.replace(/^v/, "").split(".").map(Number);

  for (let i = 0; i < Math.max(v1parts.length, v2parts.length); i++) {
    const v1part = v1parts[i] || 0;
    const v2part = v2parts[i] || 0;

    if (v1part < v2part) return -1;
    if (v1part > v2part) return 1;
  }
  return 0;
}

async function getLatestVersion() {
  const now = Date.now();

  if (cachedLatestVersion && now - lastCheckTime < CACHE_DURATION) {
    return cachedLatestVersion;
  }

  try {
    const response = await fetch(GITHUB_API_URL);
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const data = await response.json();
    cachedLatestVersion = {
      version: data.tag_name,
      releaseUrl: data.html_url,
      publishedAt: data.published_at,
      body: data.body,
    };
    lastCheckTime = now;

    return cachedLatestVersion;
  } catch (error) {
    console.error("Error fetching latest version:", error);
    throw error;
  }
}

function showUpdateStatus(status, isLoading = false) {
  const statusElement = document.getElementById("updateStatus");
  const checkBtn = document.getElementById("checkUpdateBtn");

  if (isLoading) {
    statusElement.innerHTML = `
      <span class="spinner-grow spinner-grow-sm text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </span>
    `;
    checkBtn.disabled = true;
  } else {
    statusElement.innerHTML = status;
    checkBtn.disabled = false;
  }
}

// Check for updates
export async function checkForUpdates(showLoading = true) {
  if (showLoading) {
    showUpdateStatus("", true);
  }

  try {
    const latestRelease = await getLatestVersion();
    const latestVersion = latestRelease.version;
    const comparison = compareVersions(
      currentVersion,
      latestVersion.replace(/^v/, "")
    );

    if (comparison < 0) {
      // New version available
      showUpdateStatus(`
        <a href="${latestRelease.releaseUrl}" 
          target="_blank" 
          class="badge rounded-pill badge-warning" 
         >
          <i class="fa-solid fa-download me-1"></i>
          Update Available (${latestVersion})
        </a>
      `);
    } else if (comparison === 0) {
      // Already the latest version
      showUpdateStatus(`
        <span class="badge rounded-pill badge-success" 
          title="You're using the latest version">
          <i class="fa-solid fa-check me-1"></i>Up to date
        </span>
      `);
    } else {
      // Newer current version (dev version)
      showUpdateStatus(`
        <span class="badge rounded-pill badge-info" 
          title="You're using a development version">
          <i class="fa-solid fa-flask me-1"></i>Dev version
        </span>
      `);
    }
  } catch (error) {
    showUpdateStatus(`
      <span class="badge rounded-pill badge-danger" title="Failed to check for updates: ${error.message}">
        <i class="fa-solid fa-exclamation-triangle me-1"></i>Check failed
      </span>
    `);
  }
}

// Automatically check when loading page
export async function initializeVersionCheck() {
  displayExtensionVersion();

  // Check automatically when loading (does not show loading)
  await checkForUpdates(false);

  // Set up event listener for the manual check button
  const checkBtn = document.getElementById("checkUpdateBtn");
  if (checkBtn) {
    checkBtn.addEventListener("click", () => {
      checkForUpdates(true);
    });
  }
}

// Automatically check for updates periodically (every 120 minutes)
export function setupPeriodicCheck() {
  setInterval(
    () => {
      checkForUpdates(false);
    },
    120 * 60 * 1000
  ); // 120 minutes
}

export { compareVersions, getLatestVersion };
