import { createSvg } from "../../utils/svgUtils";

export function addLoopMenuItem() {
  const loopMenuItem = document.createElement("div");
  loopMenuItem.className = "ytp-menuitem";
  loopMenuItem.setAttribute("role", "menuitemcheckbox");
  loopMenuItem.setAttribute("aria-checked", "false");
  loopMenuItem.setAttribute("tabindex", "0");

  const iconDiv = document.createElement("div");
  iconDiv.className = "ytp-menuitem-icon";

  const loopPath = [
    {
      d: "M7 7H17V10L21 6L17 2V5H5V11H7V7ZM17 17H7V14L3 18L7 22V19H19V13H17V17Z",
    },
  ];

  const svgIcon = createSvg(loopPath, "ytp-id-loop");
  iconDiv.appendChild(svgIcon);

  const labelDiv = document.createElement("div");
  labelDiv.className = "ytp-menuitem-label";
  labelDiv.textContent = "Loop";

  const contentDiv = document.createElement("div");
  contentDiv.className = "ytp-menuitem-content";
  const checkboxDiv = document.createElement("div");
  checkboxDiv.className = "ytp-menuitem-toggle-checkbox";
  contentDiv.appendChild(checkboxDiv);

  loopMenuItem.appendChild(iconDiv);
  loopMenuItem.appendChild(labelDiv);
  loopMenuItem.appendChild(contentDiv);

  // Test video looping capabilities
  function checkVideoLoopCapability() {
    const video = document.querySelector("video");
    if (!video) return false;

    // Check if video supports loop attribute
    return "loop" in video;
  }

  // Update UI state based on current video state
  function syncMenuItemState() {
    const video = document.querySelector("video");
    if (!video) {
      console.error("Video element not found");
      return;
    }

    if (!checkVideoLoopCapability()) {
      // Disable menu item if loop is not supported
      loopMenuItem.classList.add("ytp-menuitem-disabled");
      loopMenuItem.setAttribute("aria-disabled", "true");
      loopMenuItem.style.opacity = "0.5";
      loopMenuItem.style.pointerEvents = "none";
      labelDiv.textContent = "Loop (Not supported)";
      return;
    }

    // Enable menu item if loop is supported
    loopMenuItem.classList.remove("ytp-menuitem-disabled");
    loopMenuItem.setAttribute("aria-disabled", "false");
    loopMenuItem.style.opacity = "1";
    loopMenuItem.style.pointerEvents = "auto";
    labelDiv.textContent = "Loop";

    // Synchronize checkbox state with current loop state
    const isLooped = video.loop;
    loopMenuItem.setAttribute("aria-checked", isLooped.toString());

    if (isLooped) {
      checkboxDiv.classList.add("ytp-menuitem-toggle-checkbox-checked");
    } else {
      checkboxDiv.classList.remove("ytp-menuitem-toggle-checkbox-checked");
    }
  }

  // Observer to track changes in the DOM
  function setupVideoObserver() {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        // Check if a new video is added to the DOM
        if (mutation.type === "childList") {
          const addedNodes = Array.from(mutation.addedNodes);
          const hasVideoElement = addedNodes.some(
            (node) =>
              node.tagName === "VIDEO" ||
              (node.nodeType === Node.ELEMENT_NODE &&
                node.querySelector &&
                node.querySelector("video"))
          );

          if (hasVideoElement) {
            // Delay a bit to make sure the video is fully initialized
            setTimeout(syncMenuItemState, 100);
          }
        }
      });
    });

    // Watch for changes in YouTube's main container
    const targetNode = document.querySelector("#movie_player") || document.body;
    observer.observe(targetNode, {
      childList: true,
      subtree: true,
    });

    return observer;
  }

  // Listen to contextmenu events to sync when right-clicking
  function setupContextMenuSync() {
    document.addEventListener("contextmenu", (event) => {
      // Check if right-click on video or video container
      const target = event.target;
      const isVideoContext =
        target.tagName === "VIDEO" ||
        target.closest(".html5-video-container") ||
        target.closest("#movie_player");

      if (isVideoContext) {
        setTimeout(syncMenuItemState, 50);
      }
    });
  }

  //Listen to loop property changes live on video
  function setupVideoLoopListener() {
    const video = document.querySelector("video");
    if (video) {
      const attributeObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (
            mutation.type === "attributes" &&
            mutation.attributeName === "loop"
          ) {
            syncMenuItemState();
          }
        });
      });

      attributeObserver.observe(video, {
        attributes: true,
        attributeFilter: ["loop"],
      });
    }
  }

  const settingsMenu = document.querySelector(".ytp-panel-menu");

  if (settingsMenu) {
    settingsMenu.appendChild(loopMenuItem);

    syncMenuItemState();
    setupVideoObserver();
    setupContextMenuSync();
    setupVideoLoopListener();
  } else {
    // console.error("Settings menu not found");
    return;
  }

  // Event listener for click
  loopMenuItem.addEventListener("click", () => {
    if (loopMenuItem.classList.contains("ytp-menuitem-disabled")) {
      return;
    }

    const video = document.querySelector("video");
    if (video && checkVideoLoopCapability()) {
      video.loop = !video.loop;

      const isLooped = video.loop;
      loopMenuItem.setAttribute("aria-checked", isLooped.toString());
      checkboxDiv.classList.toggle(
        "ytp-menuitem-toggle-checkbox-checked",
        isLooped
      );

      console.log(`Video loop ${isLooped ? "enabled" : "disabled"}`);
    } else {
      console.error("Video element not found or loop not supported");
    }
  });

  loopMenuItem.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      loopMenuItem.click();
    }
  });

  const cleanup = () => {};

  return { loopMenuItem, cleanup };
}
