function createLoopButtonIcon() {
  const icon = document.createElement("div");
  icon.className = "ytp-menuitem-icon";

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "24");
  svg.setAttribute("height", "24");
  svg.setAttribute("viewBox", "0 0 24 24");

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute(
    "d",
    "M7 7H17V10L21 6L17 2V5H5V11H7V7ZM17 17H7V14L3 18L7 22V19H19V13H17V17Z"
  );
  path.setAttribute("fill", "white");

  svg.appendChild(path);
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

    settingsMenu.appendChild(loopItem);
  };

  setInterval(createLoopMenuItem, CHECK_INTERVAL_MS);
}
