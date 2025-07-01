import { queryElement } from "../../utils/domUtils";
import { createSvg } from "../../utils/svgUtils";

function addPipButtons() {
  try {
    // Check if PIP is supported
    if (!document.pictureInPictureEnabled) {
      console.warn("Picture-in-Picture is not supported in this browser.");
      return;
    }

    // Find the ytp-right-controls container
    const controls = queryElement(".ytp-right-controls", {
      containerName: "ytp-right-controls",
      logError: true,
      returnNull: true,
    });

    // Check if custom PIP buttons already exist to prevent duplicates
    if (document.getElementById("pip-button-container")) {
      console.log("Custom PIP buttons already exist.");
      return;
    }

    // Hide YouTube's default PIP button if it exists
    const defaultPipButton = controls.querySelector(".ytp-pip-button");
    if (defaultPipButton) {
      defaultPipButton.style.display = "none";
    }

    // Create a container for the PIP buttons
    const pipContainer = document.createElement("div");
    pipContainer.id = "pip-button-container";
    pipContainer.className = "ytp-button";
    pipContainer.style.cssText =
      "display: inline-flex; position: relative; vertical-align: middle; padding-bottom: 27px; padding-left: 14px;";

    // PIP Icon paths
    const pipPaths = [
      {
        d: "M21 3a1 1 0 0 1 1 1v7h-2V5H4v14h6v2H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h18zm0 10a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-8a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1h8zm-1 2h-6v4h6v-4zM6.707 6.293l2.25 2.25L11 6.5V12H5.5l2.043-2.043-2.25-2.25 1.414-1.414z",
      },
    ];

    // Exit PIP Icon paths
    const exitPipPaths = [
      {
        d: "M21 3a1 1 0 0 1 1 1v7h-2V5H4v14h6v2H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h18zm0 10a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-8a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1h8zm-1 2h-6v4h6v-4zm-8.5-8L9.457 9.043l2.25 2.25-1.414 1.414-2.25-2.25L6 12.5V7h5.5z",
      },
    ];

    // Create PIP button with proper YouTube styling
    const pipButton = document.createElement("button");
    pipButton.classList.add("ytp-button", "ytp-pip-button");
    pipButton.setAttribute("data-priority", "8");
    pipButton.setAttribute("data-tooltip-target-id", "ytp-pip-button");
    pipButton.setAttribute("data-title-no-tooltip", "Picture-in-picture");
    pipButton.setAttribute("title", "Picture-in-picture (p)");
    pipButton.setAttribute("aria-label", "Picture-in-picture");
    pipButton.setAttribute("aria-keyshortcuts", "p");

    // Create PIP SVG
    const pipSvg = createSvg(pipPaths, "ytp-id-pip-custom");
    pipButton.appendChild(pipSvg);

    pipButton.addEventListener("click", async () => {
      try {
        const video = document.querySelector("video");
        if (!video) {
          console.error("Video element not found.");
          return;
        }

        if (video.readyState === 0) {
          console.warn("Video is not ready for PIP mode.");
          return;
        }

        await video.requestPictureInPicture();
      } catch (error) {
        console.error("Failed to enter PIP mode:", error);
        if (error.name === "InvalidStateError") {
          console.warn(
            "Video must be playing to enter Picture-in-Picture mode."
          );
        }
      }
    });

    // Create Exit PIP button with proper YouTube styling
    const exitPipButton = document.createElement("button");
    exitPipButton.classList.add("ytp-button", "ytp-pip-button");
    exitPipButton.setAttribute("data-priority", "8");
    exitPipButton.setAttribute("data-tooltip-target-id", "ytp-exit-pip-button");
    exitPipButton.setAttribute(
      "data-title-no-tooltip",
      "Exit Picture-in-picture"
    );
    exitPipButton.setAttribute("title", "Exit Picture-in-picture (p)");
    exitPipButton.setAttribute("aria-label", "Exit Picture-in-picture");
    exitPipButton.setAttribute("aria-keyshortcuts", "p");
    exitPipButton.style.display = "none";

    // Create Exit PIP SVG
    const exitPipSvg = createSvg(exitPipPaths, "ytp-id-exit-pip-custom");
    exitPipButton.appendChild(exitPipSvg);

    exitPipButton.addEventListener("click", async () => {
      try {
        if (document.pictureInPictureElement) {
          await document.exitPictureInPicture();
        }
      } catch (error) {
        console.error("Failed to exit PIP mode:", error);
      }
    });

    // Toggle visibility based on PIP state
    const handleEnterPIP = () => {
      pipButton.style.display = "none";
      exitPipButton.style.display = "inline-block";
    };

    const handleLeavePIP = () => {
      pipButton.style.display = "inline-block";
      exitPipButton.style.display = "none";
    };

    // Add event listeners
    document.addEventListener("enterpictureinpicture", handleEnterPIP);
    document.addEventListener("leavepictureinpicture", handleLeavePIP);

    // Store cleanup function for potential removal
    pipContainer._cleanup = () => {
      document.removeEventListener("enterpictureinpicture", handleEnterPIP);
      document.removeEventListener("leavepictureinpicture", handleLeavePIP);
      // Restore default PIP button if it was hidden
      if (defaultPipButton) {
        defaultPipButton.style.display = "";
      }
    };

    // Append buttons to container
    pipContainer.appendChild(pipButton);
    pipContainer.appendChild(exitPipButton);

    // Insert in the correct position - after settings button
    const settingsButton = controls.querySelector(".ytp-settings-button");
    if (settingsButton) {
      controls.insertBefore(pipContainer, settingsButton.nextSibling);
    } else {
      controls.prepend(pipContainer);
    }

    console.log("Custom PIP buttons added successfully.");

    // Return cleanup function for potential use
    return () => {
      if (pipContainer._cleanup) {
        pipContainer._cleanup();
      }
      if (pipContainer.parentNode) {
        pipContainer.parentNode.removeChild(pipContainer);
      }
    };
  } catch (error) {
    console.error("Error adding PIP buttons:", error);
    return null;
  }
}

// Add keyboard shortcut support
function addPipKeyboardShortcut() {
  document.addEventListener("keydown", (event) => {
    if (
      event.key === "p" &&
      event.shiftKey &&
      !event.ctrlKey &&
      !event.altKey &&
      !event.metaKey
    ) {
      const activeElement = document.activeElement;
      if (
        activeElement &&
        (activeElement.tagName === "INPUT" ||
          activeElement.tagName === "TEXTAREA" ||
          activeElement.contentEditable === "true")
      ) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      if (document.pictureInPictureElement) {
        document.exitPictureInPicture().catch(console.error);
      } else {
        const video = document.querySelector("video");
        if (video && video.readyState > 0) {
          video.requestPictureInPicture().catch(console.error);
        }
      }
    }
  });
}

// Export both functions
export { addPipButtons, addPipKeyboardShortcut };

// For backwards compatibility, export addPipButtons as default
export default addPipButtons;
