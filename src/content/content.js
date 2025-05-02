import { isYouTubePage } from "./utils/youtubeCheck.js";
import * as premiumLogo from "./tweaks/premiumLogo.js";
import * as cleanShareUrl from "./tweaks/cleanShareUrl.js";
import * as returnDislikeCounter from "./tweaks/returnDislikeCounter.js";
import * as volumeBoost from "./tweaks/volumeBoost.js";
import {
  initializeTweaks,
  listenToSettingsChanges,
} from "./settingsManager.js";

// Define tweaks
const tweaks = {
  fakeYoutubePremium: {
    enable: () => premiumLogo.enable(isYouTubePage),
    disable: premiumLogo.disable,
  },
  cleanYtbUrl: {
    enable: () => cleanShareUrl.enable(isYouTubePage),
    disable: cleanShareUrl.disable,
  },
  returnDislikeCounter: {
    enable: () => returnDislikeCounter.enable(isYouTubePage),
    disable: returnDislikeCounter.disable,
  },
  volumeBoost: {
    enable: () => volumeBoost.enable(isYouTubePage),
    disable: volumeBoost.disable,
  },
};

// Initialize extension
initializeTweaks(tweaks);
listenToSettingsChanges(tweaks);
