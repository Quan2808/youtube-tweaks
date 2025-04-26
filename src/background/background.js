// Khởi tạo các giá trị mặc định khi cài đặt extension
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get(["ytTweaksSettings"], (result) => {
    if (!result.ytTweaksSettings) {
      // Thiết lập mặc định
      chrome.storage.sync.set({
        ytTweaksSettings: {
          fakeYoutubePremium: false,
          cleanYtbUrl: true,
          // Thêm các tính năng khác ở đây
        },
      });
    }
  });
});
