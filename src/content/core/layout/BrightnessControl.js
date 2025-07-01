import { createSvg } from "../../utils/svgUtils";

function BrightnessControl() {
  const initBrightnessControl = (video, leftControls) => {
    // Creating container for brightness control
    const brightnessControl = document.createElement("span");
    brightnessControl.className = "ytp-brightness-area";
    brightnessControl.style.cssText = `
      display: inline-block;
      vertical-align: top;
      margin-left: 8px;
      position: relative;
    `;

    // Creating button with icon
    const button = document.createElement("button");
    button.className = "ytp-brightness-button ytp-button";
    button.setAttribute("aria-keyshortcuts", "b");
    button.setAttribute("data-tooltip-offset-y", "0");
    button.setAttribute("data-title-no-tooltip", "Brightness");
    button.setAttribute("aria-label", "Brightness keyboard shortcut b");
    button.title = "Brightness (b)";
    button.style.cssText = `
      background: none;
      border: none;
      color: white;
      cursor: pointer;
      display: inline-block;
      font-size: 0;
      height: 48px;
      margin: 0;
      overflow: hidden;
      padding: 0;
      position: relative;
      width: 48px;
      border-radius: 0;
      outline: none;
      padding-top: 12px;
    `;

    // Creating icon container
    const iconContainer = document.createElement("div");
    iconContainer.className = "ytp-brightness-icon";
    iconContainer.style.cssText = `
      pointer-events: none;
      display: block;
      width: 100%;
      height: 100%;
    `;

    // Creating SVG icon
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("height", "100%");
    svg.setAttribute("version", "1.1");
    svg.setAttribute("viewBox", "0 0 36 36");
    svg.setAttribute("width", "100%");
    svg.style.cssText = `
      pointer-events: none;
      display: block;
      width: 100%;
      height: 100%;
    `;

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("class", "ytp-svg-fill");
    path.setAttribute(
      "d",
      "M18,8 C12.48,8 8,12.48 8,18 C8,23.52 12.48,28 18,28 C23.52,28 28,23.52 28,18 C28,12.48 23.52,8 18,8 Z M18,10 C22.42,10 26,13.58 26,18 C26,22.42 22.42,26 18,26 C13.58,26 10,22.42 10,18 C10,13.58 13.58,10 18,10 Z M18,4 L18,6 M18,30 L18,32 M6,18 L4,18 M32,18 L30,18 M8.22,8.22 L9.64,9.64 M26.36,26.36 L27.78,27.78 M8.22,27.78 L9.64,26.36 M26.36,9.64 L27.78,8.22"
    );
    path.setAttribute("fill", "#fff");
    path.style.cssText = `pointer-events: none;`;

    svg.appendChild(path);

    const brightnessPaths = [
      {
        d: "M10,4c0.6,0,1-0.4,1-1V1c0-0.6-0.4-1-1-1S9,0.4,9,1v2C9,3.6,9.4,4,10,4z",
      },
      {
        d: "M10,16c-0.6,0-1,0.4-1,1v2c0,0.6,0.4,1,1,1s1-0.4,1-1v-2C11,16.4,10.6,16,10,16z",
      },
      {
        d: "M15.7,5.8l1.4-1.4c0.4-0.4,0.4-1,0-1.4s-1-0.4-1.4,0l-1.4,1.4c-0.4,0.4-0.4,1,0,1.4S15.3,6.1,15.7,5.8z",
      },
      {
        d: "M4.3,14.2l-1.4,1.4c-0.4,0.4-0.4,1,0,1.4s1,0.4,1.4,0l1.4-1.4c0.4-0.4,0.4-1,0-1.4S4.7,13.9,4.3,14.2z",
      },
      {
        d: "M19,9h-2c-0.6,0-1,0.4-1,1s0.4,1,1,1h2c0.6,0,1-0.4,1-1S19.6,9,19,9z",
      },
      {
        d: "M4,10c0-0.6-0.4-1-1-1H1c-0.6,0-1,0.4-1,1s0.4,1,1,1h2C3.6,11,4,10.6,4,10z",
      },
      {
        d: "M15.7,14.2c-0.4-0.4-1-0.4-1.4,0c-0.4,0.4-0.4,1,0,1.4l1.4,1.4c0.4,0.4,1,0.4,1.4,0c0.4-0.4,0.4-1,0-1.4L15.7,14.2z",
      },
      {
        d: "M4.3,5.8c0.4,0.4,1,0.4,1.4,0s0.4-1,0-1.4L4.3,2.9c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4L4.3,5.8z",
      },
      {
        d: "M10,5c-2.8,0-5,2.2-5,5s2.2,5,5,5s5-2.2,5-5S12.8,5,10,5z M10,13c-1.7,0-3-1.3-3-3s1.3-3,3-3s3,1.3,3,3S11.7,13,10,13z",
      },
    ];

    const brightnessSvg = createSvg(brightnessPaths);

    iconContainer.appendChild(brightnessSvg);
    button.appendChild(iconContainer);

    // Creating slider panel
    const panel = document.createElement("div");
    panel.className = "ytp-brightness-panel";
    panel.setAttribute("role", "slider");
    panel.setAttribute("aria-valuemin", "30");
    panel.setAttribute("aria-valuemax", "200");
    panel.setAttribute("tabindex", "0");
    panel.setAttribute("aria-valuenow", "100");
    panel.setAttribute("aria-valuetext", "100% brightness");
    panel.setAttribute("aria-label", "Brightness");
    panel.title = "Brightness";
    panel.style.cssText = `
      display: inline-block;
      vertical-align: top;
      width: 52px;
      height: 100%;
      position: relative;
      margin-left: 8px;
      opacity: 0;
      transform: scaleX(0);
      transform-origin: left center;
      transition: opacity 0.1s cubic-bezier(0.4, 0, 1, 1), transform 0.1s cubic-bezier(0.4, 0, 1, 1);
      overflow: hidden;
    `;

    // Creating slider
    const slider = document.createElement("div");
    slider.className = "ytp-brightness-slider";
    slider.setAttribute("draggable", "true");
    slider.style.cssText = `
      background: rgba(255, 255, 255, 0.2);
      cursor: pointer;
      height: 4px;
      width: 52px;
      position: relative;
      top: 50%;
      transform: translateY(-50%);
      border-radius: 2px;
      touch-action: none;
    `;

    // Creating handle
    const handle = document.createElement("div");
    handle.className = "ytp-brightness-slider-handle";
    handle.style.cssText = `
      background: #fff;
      border-radius: 50%;
      cursor: pointer;
      height: 12px;
      width: 12px;
      position: absolute;
      top: -4px;
      left: 20px;
      transition: left 0.05s cubic-bezier(0.0, 0, 0.2, 1);
    `;

    slider.appendChild(handle);
    panel.appendChild(slider);
    brightnessControl.appendChild(button);
    brightnessControl.appendChild(panel);

    const volumeArea = document.querySelector(".ytp-volume-area");

    // Chèn brightnessControl ngay sau ytp-volume-area
    if (volumeArea && volumeArea.parentNode) {
      volumeArea.parentNode.insertBefore(
        brightnessControl,
        volumeArea.nextSibling
      );
    }

    leftControls.appendChild(brightnessControl);

    // State variables
    let dragging = false;
    let lastBrightness = 1.0;
    let hoverTimeout = null;

    // Show/hide panel functions
    const showPanel = () => {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
        hoverTimeout = null;
      }
      panel.style.opacity = "1";
      panel.style.transform = "scaleX(1)";
    };

    const hidePanel = () => {
      if (!dragging) {
        hoverTimeout = setTimeout(() => {
          panel.style.opacity = "0";
          panel.style.transform = "scaleX(0)";
        }, 200);
      }
    };

    // Update brightness function
    const updateBrightness = (clientX) => {
      const rect = slider.getBoundingClientRect();
      const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
      const percent = x / rect.width;
      const brightness = 0.3 + percent * 1.7; // Range: 0.3 to 2.0
      lastBrightness = brightness;

      video.style.filter = `brightness(${brightness.toFixed(2)})`;
      handle.style.left = `${x - 6}px`;

      const brightnessPercent = Math.round(brightness * 100);
      panel.setAttribute("aria-valuenow", brightnessPercent);
      panel.setAttribute("aria-valuetext", `${brightnessPercent}% brightness`);
    };

    // Animation-frame-based update for smooth scrolling
    let rafId = null;
    const smoothUpdateBrightness = (clientX) => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => updateBrightness(clientX));
    };

    // Event listeners for mouse interaction
    const startDragging = (e) => {
      dragging = true;
      showPanel();
      e.preventDefault();
    };

    const stopDragging = () => {
      dragging = false;
      if (rafId) cancelAnimationFrame(rafId);
      hidePanel();
    };

    // Mouse events
    handle.addEventListener("mousedown", startDragging);
    slider.addEventListener("mousedown", startDragging);

    window.addEventListener("mousemove", (e) => {
      if (dragging) {
        smoothUpdateBrightness(e.clientX);
      }
    });

    window.addEventListener("mouseup", stopDragging);

    slider.addEventListener("click", (e) => {
      if (!dragging) {
        updateBrightness(e.clientX);
      }
    });

    // Touch support
    const handleTouchStart = (e) => {
      startDragging(e);
      const touch = e.touches[0];
      updateBrightness(touch.clientX);
    };

    handle.addEventListener("touchstart", handleTouchStart, { passive: false });
    slider.addEventListener("touchstart", handleTouchStart, { passive: false });

    window.addEventListener(
      "touchmove",
      (e) => {
        if (dragging) {
          const touch = e.touches[0];
          smoothUpdateBrightness(touch.clientX);
        }
      },
      { passive: false }
    );

    window.addEventListener("touchend", stopDragging);

    // Hover events for showing/hiding panel
    brightnessControl.addEventListener("mouseenter", showPanel);
    brightnessControl.addEventListener("mouseleave", hidePanel);

    // Keyboard accessibility
    panel.addEventListener("keydown", (e) => {
      let currentValue = parseInt(panel.getAttribute("aria-valuenow")) || 100;
      if (e.key === "ArrowRight" || e.key === "ArrowUp") {
        currentValue = Math.min(currentValue + 5, 200);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
        currentValue = Math.max(currentValue - 5, 30);
      } else {
        return;
      }

      const brightness = currentValue / 100;
      const percent = (brightness - 0.3) / 1.7;
      lastBrightness = brightness;

      video.style.filter = `brightness(${brightness.toFixed(2)})`;
      handle.style.left = `${percent * 52 - 6}px`;
      panel.setAttribute("aria-valuenow", currentValue);
      panel.setAttribute("aria-valuetext", `${currentValue}% brightness`);
    });

    // Reset brightness when clicking the button
    button.addEventListener("click", () => {
      const brightness = 1.0;
      const percent = (brightness - 0.3) / 1.7;

      video.style.filter = "brightness(1.0)";
      handle.style.left = `${percent * 52 - 6}px`;
      panel.setAttribute("aria-valuenow", "100");
      panel.setAttribute("aria-valuetext", "100% brightness");
      lastBrightness = 1.0;
    });

    // Keyboard shortcut support
    document.addEventListener("keydown", (e) => {
      if (e.key === "b" || e.key === "B") {
        if (
          !document.activeElement ||
          document.activeElement.tagName !== "INPUT"
        ) {
          button.click();
          e.preventDefault();
        }
      }
    });

    // Handle video element changes
    const observer = new MutationObserver(() => {
      const newVideo = document.querySelector("video");
      if (newVideo && newVideo !== video) {
        newVideo.style.filter = `brightness(${lastBrightness.toFixed(2)})`;
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Initialize with default brightness (center position for 100%)
    const initialPercent = (1.0 - 0.3) / 1.7;
    handle.style.left = `${initialPercent * 52 - 6}px`;

    console.log("YouTube Brightness Control đã được kích hoạt!");
  };

  // Trả về function initBrightnessControl để sử dụng bên ngoài
  return {
    init: initBrightnessControl,
  };
}

// Hàm chờ YouTube player load
const waitForPlayer = (callback) => {
  const checkPlayer = () => {
    const video = document.querySelector("video");
    const leftControls = document.querySelector(".ytp-left-controls");

    if (
      video &&
      leftControls &&
      !document.querySelector(".ytp-brightness-area")
    ) {
      callback(video, leftControls);
    } else {
      setTimeout(checkPlayer, 500);
    }
  };
  checkPlayer();
};

// Hàm chính để khởi Creating Brightness Control
export function addBrightnessControl() {
  const brightnessControl = BrightnessControl();

  waitForPlayer((video, leftControls) => {
    brightnessControl.init(video, leftControls);
  });

  // Handle navigation in YouTube (SPA)
  let currentUrl = location.href;
  const observer = new MutationObserver(() => {
    if (location.href !== currentUrl) {
      currentUrl = location.href;
      setTimeout(() => {
        waitForPlayer((video, leftControls) => {
          brightnessControl.init(video, leftControls);
        });
      }, 1000);
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

// Export default
export default addBrightnessControl;
