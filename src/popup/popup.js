document.addEventListener("DOMContentLoaded", () => {
  const fakeYoutubePremiumCheckbox =
    document.getElementById("fakeYoutubePremium");
  const cleanYtbUrlCheckbox = document.getElementById("cleanYtbUrl");
  const returnDislikeCounterCheckbox = document.getElementById(
    "returnDislikeCounter"
  );
  const saveButton = document.getElementById("saveButton");
  const status = document.getElementById("status");

  let hasUnsavedChanges = false;

  // Load settings on startup
  chrome.storage.sync.get(["ytTweaksSettings"], (result) => {
    const settings = result.ytTweaksSettings || {};
    fakeYoutubePremiumCheckbox.checked = !!settings.fakeYoutubePremium;
    cleanYtbUrlCheckbox.checked = !!settings.cleanYtbUrl;
    returnDislikeCounterCheckbox.checked = !!settings.returnDislikeCounter;
    hasUnsavedChanges = false;
    updateSaveButtonState();
  });

  // Show temporary status message
  const showStatus = (message, color = "green") => {
    status.textContent = message;
    status.style.color = color;
    status.style.marginTop = "10px";
    status.style.textAlign = "center";
    setTimeout(() => {
      status.textContent = "";
    }, 2000);
  };

  // Update save button state based on unsaved changes
  const updateSaveButtonState = () => {
    if (hasUnsavedChanges) {
      saveButton.textContent = "Save Settings";
      saveButton.className = "btn btn-warning btn-lg px-4 py-2 fw-medium";
      saveButton.disabled = false;
    } else {
      saveButton.textContent = "Settings Saved";
      saveButton.className = "btn btn-success btn-lg px-4 py-2 fw-medium";
      saveButton.disabled = true;
    }
  };

  // Mark as having unsaved changes when any checkbox changes
  const markAsChanged = () => {
    hasUnsavedChanges = true;
    updateSaveButtonState();
  };

  // Save settings when save button is clicked
  const saveSettings = () => {
    const settings = {
      fakeYoutubePremium: fakeYoutubePremiumCheckbox.checked,
      cleanYtbUrl: cleanYtbUrlCheckbox.checked,
      returnDislikeCounter: returnDislikeCounterCheckbox.checked,
    };

    chrome.storage.sync.set({ ytTweaksSettings: settings }, () => {
      hasUnsavedChanges = false;
      updateSaveButtonState();
      showStatus("Settings saved successfully!", "green");

      // Refresh active YouTube tabs to apply changes
      chrome.tabs.query({ url: "*://*.youtube.com/*" }, (tabs) => {
        if (tabs.length > 0) {
          tabs.forEach((tab) => {
            chrome.tabs.reload(tab.id);
          });
          showStatus(
            `Settings applied to ${tabs.length} YouTube tab(s)!`,
            "blue"
          );
        }
      });
    });
  };

  // Listen for checkbox changes
  fakeYoutubePremiumCheckbox.addEventListener("change", markAsChanged);
  cleanYtbUrlCheckbox.addEventListener("change", markAsChanged);
  returnDislikeCounterCheckbox.addEventListener("change", markAsChanged);

  // Listen for save button click
  saveButton.addEventListener("click", saveSettings);

  // Sync settings from other sources
  chrome.storage.onChanged.addListener((changes) => {
    if (changes.ytTweaksSettings) {
      const settings = changes.ytTweaksSettings.newValue || {};
      fakeYoutubePremiumCheckbox.checked = !!settings.fakeYoutubePremium;
      cleanYtbUrlCheckbox.checked = !!settings.cleanYtbUrl;
      returnDislikeCounterCheckbox.checked = !!settings.returnDislikeCounter;
      hasUnsavedChanges = false;
      updateSaveButtonState();
    }
  });

  // Initialize button state
  updateSaveButtonState();
});
