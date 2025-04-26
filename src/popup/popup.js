document.addEventListener("DOMContentLoaded", () => {
  const fakeYoutubePremiumCheckbox =
    document.getElementById("fakeYoutubePremium");
  const hideAdsCheckbox = document.getElementById("hideAds");
  const cleanYtbUrlCheckbox = document.getElementById("cleanYtbUrl");
  const status = document.getElementById("status");

  // Load settings
  chrome.storage.sync.get(["ytTweaksSettings"], (result) => {
    const settings = result.ytTweaksSettings || {};
    fakeYoutubePremiumCheckbox.checked = !!settings.fakeYoutubePremium;
    hideAdsCheckbox.checked = !!settings.hideAds;
    cleanYtbUrlCheckbox.checked = !!settings.cleanYtbUrl;
  });

  // Hàm hiển thị thông báo tạm thời
  const showStatus = (message, color = "green") => {
    status.textContent = message;
    status.style.color = color;
    status.style.marginTop = "10px";
    status.style.textAlign = "center";
    setTimeout(() => {
      status.textContent = "";
    }, 1500);
  };

  // Save settings khi checkbox thay đổi
  const saveSettings = () => {
    chrome.storage.sync.get(["ytTweaksSettings"], (result) => {
      const settings = result.ytTweaksSettings || {};
      settings.fakeYoutubePremium = fakeYoutubePremiumCheckbox.checked;
      settings.hideAds = hideAdsCheckbox.checked;
      settings.cleanYtbUrl = cleanYtbUrlCheckbox.checked;

      chrome.storage.sync.set({ ytTweaksSettings: settings }, () => {
        showStatus("Settings applied!");
        // Refresh active YouTube tabs để áp dụng thay đổi
        chrome.tabs.query({ url: "*://*.youtube.com/*" }, (tabs) => {
          tabs.forEach((tab) => {
            chrome.tabs.reload(tab.id);
          });
        });
      });
    });
  };

  // Lắng nghe sự thay đổi của checkbox
  fakeYoutubePremiumCheckbox.addEventListener("change", saveSettings);
  hideAdsCheckbox.addEventListener("change", saveSettings);
  cleanYtbUrlCheckbox.addEventListener("change", saveSettings);

  // Đồng bộ khi có thay đổi từ nơi khác (nếu cần)
  chrome.storage.onChanged.addListener((changes) => {
    if (changes.ytTweaksSettings) {
      const settings = changes.ytTweaksSettings.newValue || {};
      fakeYoutubePremiumCheckbox.checked = !!settings.fakeYoutubePremium;
      hideAdsCheckbox.checked = !!settings.hideAds;
      cleanYtbUrlCheckbox.checked = !!settings.cleanYtbUrl;
    }
  });
});
