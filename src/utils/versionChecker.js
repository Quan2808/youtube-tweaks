const currentVersion = chrome.runtime.getManifest().version;

export function displayExtensionVersion() {
  const versionElement = document.getElementById("extensionVersion");
  if (versionElement) {
    versionElement.textContent = `v${currentVersion}`;
  }
}
