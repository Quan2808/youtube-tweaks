import { isYouTubePage } from "./utils/youtubeCheck.js";
import * as premiumLogo from "./tweaks/premiumLogo.js";
import * as cleanShareUrl from "./tweaks/cleanShareUrl.js";
import * as returnDislikeCounter from "./tweaks/returnDislikeCounter.js";
import * as expandTheatreMode from "./tweaks/expandTheatreMode.js";
import { removeAdblockPopup } from "./core/remover/removeAdblockPopup.js";
import { setupYouTubePopupBypass } from "./core/remover/removeConfirmDialog.js";
import { addLoopMenuItem } from "./core/layout/addLoopButton.js";
import { addPipButtons } from "./core/layout/PIPManager.js";
import { addBrightnessControl } from "./core/layout/BrightnessControl.js";

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
  expandTheatreMode: {
    enable: () => expandTheatreMode.enable(isYouTubePage),
    disable: expandTheatreMode.disable,
  },
};

if (isYouTubePage()) {
  removeAdblockPopup();
  setupYouTubePopupBypass();

  addLoopMenuItem();
  addPipButtons();
  addBrightnessControl();
}

// Initialize extension
initializeTweaks(tweaks);
listenToSettingsChanges(tweaks);
