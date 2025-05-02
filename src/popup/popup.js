document.addEventListener("DOMContentLoaded", () => {
  // Get DOM elements
  const fakeYoutubePremiumCheckbox =
    document.getElementById("fakeYoutubePremium");
  const cleanYtbUrlCheckbox = document.getElementById("cleanYtbUrl");
  const returnDislikeCounterCheckbox = document.getElementById(
    "returnDislikeCounter"
  );
  const volumeBoostCheckbox = document.getElementById("volumeBoost");
  const volumeBoostAmountSlider = document.getElementById("volumeBoostAmount");
  const volumeBoostValue = document.getElementById("volumeBoostValue");
  const status = document.getElementById("status");

  // Load settings
  chrome.storage.sync.get(["ytTweaksSettings"], (result) => {
    const settings = result.ytTweaksSettings || {};
    fakeYoutubePremiumCheckbox.checked = !!settings.fakeYoutubePremium;
    cleanYtbUrlCheckbox.checked = !!settings.cleanYtbUrl;
    returnDislikeCounterCheckbox.checked = !!settings.returnDislikeCounter;
    volumeBoostCheckbox.checked = !!settings.volumeBoost;
    volumeBoostAmountSlider.value = settings.volumeBoostAmount || 6;
    volumeBoostValue.textContent = volumeBoostAmountSlider.value;
  });

  // Show temporary status message
  const showStatus = (message, color = "green") => {
    status.textContent = message;
    status.style.color = color;
    status.style.marginTop = "10px";
    status.style.textAlign = "center";
    setTimeout(() => {
      status.textContent = "";
    }, 1500);
  };

  // Save settings
  const saveSettings = () => {
    chrome.storage.sync.get(["ytTweaksSettings"], (result) => {
      const settings = result.ytTweaksSettings || {};
      settings.fakeYoutubePremium = fakeYoutubePremiumCheckbox.checked;
      settings.cleanYtbUrl = cleanYtbUrlCheckbox.checked;
      settings.returnDislikeCounter = returnDislikeCounterCheckbox.checked;
      settings.volumeBoost = volumeBoostCheckbox.checked;
      settings.volumeBoostAmount = parseFloat(volumeBoostAmountSlider.value);

      chrome.storage.sync.set({ ytTweaksSettings: settings }, () => {
        showStatus("Settings applied!");
        // Refresh active YouTube tabs to apply changes
        chrome.tabs.query({ url: "*://*.youtube.com/*" }, (tabs) => {
          tabs.forEach((tab) => {
            chrome.tabs.reload(tab.id);
          });
        });
      });
    });
  };

  // Update volume boost value display
  const updateVolumeBoostValue = () => {
    volumeBoostValue.textContent = volumeBoostAmountSlider.value;
    saveSettings();
  };

  // Listen for checkbox changes
  fakeYoutubePremiumCheckbox.addEventListener("change", saveSettings);
  cleanYtbUrlCheckbox.addEventListener("change", saveSettings);
  returnDislikeCounterCheckbox.addEventListener("change", saveSettings);
  volumeBoostCheckbox.addEventListener("change", saveSettings);

  // Listen for range slider changes
  volumeBoostAmountSlider.addEventListener("input", updateVolumeBoostValue);

  // Sync settings from other sources
  chrome.storage.onChanged.addListener((changes) => {
    if (changes.ytTweaksSettings) {
      const settings = changes.ytTweaksSettings.newValue || {};
      fakeYoutubePremiumCheckbox.checked = !!settings.fakeYoutubePremium;
      cleanYtbUrlCheckbox.checked = !!settings.cleanYtbUrl;
      returnDislikeCounterCheckbox.checked = !!settings.returnDislikeCounter;
      volumeBoostCheckbox.checked = !!settings.volumeBoost;
      volumeBoostAmountSlider.value = settings.volumeBoostAmount || 6;
      volumeBoostValue.textContent = volumeBoostAmountSlider.value;
    }
  });
});
