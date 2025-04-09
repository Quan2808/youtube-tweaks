import { isYouTubePage } from "./utils/youtubeCheck.js";
import * as premiumLogo from "./tweaks/premiumLogo.js";
import * as hideAds from "./tweaks/hideAds.js";

import {
  initializeTweaks,
  listenToSettingsChanges,
} from "./settingsManager.js";

// Định nghĩa các tweak
const tweaks = {
  fakeYoutubePremium: {
    enable: () => premiumLogo.enable(isYouTubePage),
    disable: premiumLogo.disable,
  },
  hideAds: {
    enable: () => hideAds.enable(isYouTubePage),
    disable: hideAds.disable,
  },
  // Thêm các tweak khác ở đây trong tương lai, ví dụ:
  // hideAds: { enable: ..., disable: ... },
  // darkMode: { enable: ..., disable: ... },
};

// Khởi chạy extension
initializeTweaks(tweaks);
listenToSettingsChanges(tweaks);
