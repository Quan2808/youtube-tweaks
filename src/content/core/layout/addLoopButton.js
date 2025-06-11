import { createSvgIcon } from "../../utils/createSvgIcon.js";

function createLoopButtonIcon() {
  const icon = document.createElement("div");
  icon.className = "ytp-menuitem-icon";

  const loopIconPath = [
    "M7 7H17V10L21 6L17 2V5H5V11H7V7ZM17 17H7V14L3 18L7 22V19H19V13H17V17Z",
  ];

  const svg = createSvgIcon(loopIconPath, "24", "24", "0 0 24 24", "white");
  icon.appendChild(svg);

  return icon;
}

export function addLoopMenuItem() {
  const CHECK_INTERVAL_MS = 1000;

  const createLoopMenuItem = () => {
    const settingsMenu = document.querySelector(".ytp-panel-menu");
    if (!settingsMenu || settingsMenu.querySelector(".ytp-loop-menuitem")) {
      return;
    }

    // Tìm ambient mode item (item thứ 2 trong menu)
    const ambientModeItem = settingsMenu.children[2];
    if (!ambientModeItem) {
      return;
    }

    const loopItem = document.createElement("div");
    loopItem.className = "ytp-menuitem ytp-loop-menuitem";
    loopItem.setAttribute("role", "menuitemcheckbox");
    loopItem.setAttribute("aria-checked", "false");
    loopItem.setAttribute("tabindex", "0");

    const icon = createLoopButtonIcon();
    const label = document.createElement("div");
    label.className = "ytp-menuitem-label";
    label.textContent = "Loop video";

    const content = document.createElement("div");
    content.className = "ytp-menuitem-content";
    const toggle = document.createElement("div");
    toggle.className = "ytp-menuitem-toggle-checkbox";
    content.appendChild(toggle);

    loopItem.appendChild(icon);
    loopItem.appendChild(label);
    loopItem.appendChild(content);

    loopItem.addEventListener("click", () => {
      const video = document.querySelector("video");
      const isChecked = loopItem.getAttribute("aria-checked") === "true";
      loopItem.setAttribute("aria-checked", (!isChecked).toString());
      if (video) video.loop = !isChecked;
    });

    // Chèn loop item trước ambient mode item
    settingsMenu.insertBefore(loopItem, ambientModeItem);
  };

  setInterval(createLoopMenuItem, CHECK_INTERVAL_MS);
}
