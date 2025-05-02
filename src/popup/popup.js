document.addEventListener("DOMContentLoaded", () => {
  const fakeYoutubePremiumCheckbox =
    document.getElementById("fakeYoutubePremium");
  const cleanYtbUrlCheckbox = document.getElementById("cleanYtbUrl");
  const returnDislikeCounterCheckbox = document.getElementById(
    "returnDislikeCounter"
  );
  const status = document.getElementById("status");

  // Load settings
  chrome.storage.sync.get(["ytTweaksSettings"], (result) => {
    const settings = result.ytTweaksSettings || {};
    fakeYoutubePremiumCheckbox.checked = !!settings.fakeYoutubePremium;
    cleanYtbUrlCheckbox.checked = !!settings.cleanYtbUrl;
    returnDislikeCounterCheckbox.checked = !!settings.returnDislikeCounter;
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

  // Save settings when checkboxes change
  const saveSettings = () => {
    chrome.storage.sync.get(["ytTweaksSettings"], (result) => {
      const settings = result.ytTweaksSettings || {};
      settings.fakeYoutubePremium = fakeYoutubePremiumCheckbox.checked;
      settings.cleanYtbUrl = cleanYtbUrlCheckbox.checked;
      settings.returnDislikeCounter = returnDislikeCounterCheckbox.checked;

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

  // Listen for checkbox changes
  fakeYoutubePremiumCheckbox.addEventListener("change", saveSettings);
  cleanYtbUrlCheckbox.addEventListener("change", saveSettings);
  returnDislikeCounterCheckbox.addEventListener("change", saveSettings);

  // Sync settings from other sources
  chrome.storage.onChanged.addListener((changes) => {
    if (changes.ytTweaksSettings) {
      const settings = changes.ytTweaksSettings.newValue || {};
      fakeYoutubePremiumCheckbox.checked = !!settings.fakeYoutubePremium;
      cleanYtbUrlCheckbox.checked = !!settings.cleanYtbUrl;
      returnDislikeCounterCheckbox.checked = !!settings.returnDislikeCounter;
    }
  });
});
