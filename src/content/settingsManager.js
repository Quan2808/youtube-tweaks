export function initializeTweaks(tweaks) {
  chrome.storage.sync.get(["ytTweaksSettings"], (result) => {
    const settings = result.ytTweaksSettings || {};
    Object.keys(tweaks).forEach((tweakName) => {
      if (settings[tweakName]) {
        tweaks[tweakName].enable();
      }
    });
  });
}

export function listenToSettingsChanges(tweaks) {
  chrome.storage.onChanged.addListener((changes) => {
    if (changes.ytTweaksSettings) {
      const newSettings = changes.ytTweaksSettings.newValue || {};
      Object.keys(tweaks).forEach((tweakName) => {
        if (newSettings[tweakName]) {
          tweaks[tweakName].enable();
        } else {
          tweaks[tweakName].disable();
        }
      });
    }
  });
}
