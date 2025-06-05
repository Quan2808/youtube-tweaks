document.addEventListener("DOMContentLoaded", () => {
  const fakeYoutubePremiumCheckbox =
    document.getElementById("fakeYoutubePremium");
  const cleanYtbUrlCheckbox = document.getElementById("cleanYtbUrl");
  const returnDislikeCounterCheckbox = document.getElementById(
    "returnDislikeCounter"
  );
  const saveButton = document.getElementById("saveButton");
  const saveButtonText = document.getElementById("saveButtonText");
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

  // Show status message with animation
  const showStatus = (message, type = "success") => {
    status.textContent = message;
    status.className = `status-message status-${type}`;
    status.style.display = "block";
    status.style.opacity = "0";
    status.style.transform = "translateY(10px)";

    // Animate in
    setTimeout(() => {
      status.style.opacity = "1";
      status.style.transform = "translateY(0)";
    }, 10);

    // Animate out
    setTimeout(() => {
      status.style.opacity = "0";
      status.style.transform = "translateY(-10px)";
      setTimeout(() => {
        status.style.display = "none";
      }, 300);
    }, 3000);
  };

  // Update save button state
  const updateSaveButtonState = () => {
    if (hasUnsavedChanges) {
      saveButton.className = "btn save-btn text-white changed";
      saveButtonText.textContent = "Save Changes";
      saveButton.disabled = false;
    } else {
      saveButton.className = "btn save-btn text-white";
      saveButtonText.textContent = "Settings Saved";
      saveButton.disabled = true;
    }
  };

  // Mark as having unsaved changes
  const markAsChanged = () => {
    hasUnsavedChanges = true;
    updateSaveButtonState();
  };

  // Save settings
  const saveSettings = () => {
    const settings = {
      fakeYoutubePremium: fakeYoutubePremiumCheckbox.checked,
      cleanYtbUrl: cleanYtbUrlCheckbox.checked,
      returnDislikeCounter: returnDislikeCounterCheckbox.checked,
    };

    // Add loading state
    saveButton.disabled = true;
    saveButtonText.innerHTML =
      '<i class="fas fa-spinner fa-spin me-2"></i>Saving...';

    chrome.storage.sync.set({ ytTweaksSettings: settings }, () => {
      hasUnsavedChanges = false;
      updateSaveButtonState();
      showStatus("Settings saved successfully!", "success");

      // Refresh active YouTube tabs
      chrome.tabs.query({ url: "*://*.youtube.com/*" }, (tabs) => {
        if (tabs.length > 0) {
          tabs.forEach((tab) => {
            chrome.tabs.reload(tab.id);
          });
          setTimeout(() => {
            showStatus(
              `Changes applied to ${tabs.length} YouTube tab${tabs.length > 1 ? "s" : ""}!`,
              "info"
            );
          }, 1000);
        }
      });
    });
  };

  // Event listeners
  fakeYoutubePremiumCheckbox.addEventListener("change", markAsChanged);
  cleanYtbUrlCheckbox.addEventListener("change", markAsChanged);
  returnDislikeCounterCheckbox.addEventListener("change", markAsChanged);
  saveButton.addEventListener("click", saveSettings);

  // Sync settings from storage changes
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

  // Initialize
  updateSaveButtonState();
});
