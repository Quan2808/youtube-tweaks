function createPipSvg(paths, svgId) {
  // Create SVG element with YouTube styling
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("height", "100%");
  svg.setAttribute("version", "1.1");
  svg.setAttribute("viewBox", "0 0 36 36");
  svg.setAttribute("width", paths.length > 1 ? "75%" : "100%");

  // Add shadow element
  const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
  use.setAttribute("class", "ytp-svg-shadow");
  use.setAttribute("xlink:href", `#${svgId}`);
  svg.appendChild(use);

  // Create group element for PIP button paths to apply translation
  if (paths.length > 1) {
    const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    group.setAttribute("transform", "translate(6, 2)");

    // Add paths to group
    paths.forEach((pathData, index) => {
      const path = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      path.setAttribute("d", pathData.d);
      path.setAttribute("fill", "#fff");
      if (index === 0) {
        path.setAttribute("id", svgId);
      }
      group.appendChild(path);
    });

    svg.appendChild(group);
  } else {
    // Add single path for Exit PIP button
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", paths[0].d);
    path.setAttribute("fill", "#fff");
    path.setAttribute("id", svgId);
    svg.appendChild(path);
  }

  return svg;
}

function addPipButtons() {
  try {
    // Check if PIP is supported
    if (!document.pictureInPictureEnabled) {
      console.warn("Picture-in-Picture is not supported in this browser.");
      return;
    }

    // Find the ytp-right-controls container
    const controls = document.querySelector(".ytp-right-controls");
    if (!controls) {
      console.error("Could not find .ytp-right-controls container.");
      return;
    }

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
    pipContainer.style.cssText = "display: inline-block; position: relative;";

    // PIP Icon paths
    const pipPaths = [
      {
        d: "M28,28H17a2.0023,2.0023,0,0,1-2-2V20a2.0023,2.0023,0,0,1,2-2H28a2.0027,2.0027,0,0,1,2,2v6A2.0027,2.0027,0,0,1,28,28ZM17,20v6H28.002L28,20Z",
      },
      {
        d: "M13,22H4a2.0023,2.0023,0,0,1-2-2V7A2.002,2.002,0,0,1,4,5H26a2.0023,2.0023,0,0,1,2,2v9H26V7H4V20h9Z",
      },
    ];

    // Exit PIP Icon paths
    const exitPipPaths = [
      {
        d: "M29,25 L29,10.98 C29,9.88 28.1,9 27,9 L9,9 C7.9,9 7,9.88 7,10.98 L7,25 C7,26.1 7.9,27 9,27 L27,27 C28.1,27 29,26.1 29,25 L29,25 Z M27,25.02 L9,25.02 L9,10.97 L27,10.97 L27,25.02 L27,25.02 Z",
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
    const pipSvg = createPipSvg(pipPaths, "ytp-id-pip-custom");
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
    const exitPipSvg = createPipSvg(exitPipPaths, "ytp-id-exit-pip-custom");
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
