chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get(["ytTweaksSettings"], (result) => {
    if (!result.ytTweaksSettings) {
      chrome.storage.sync.set({
        ytTweaksSettings: {
          fakeYoutubePremium: false,
          cleanYtbUrl: false,
        },
      });
    }
  });
});
