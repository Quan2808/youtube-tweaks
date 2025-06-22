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

    // Common SVG attributes
    const svgAttributes = {
      viewBox: "0 0 36 36",
      width: "100%",
      height: "100%",
      fill: "#fff",
      stroke: "none",
    };

    // Create PIP button with proper YouTube styling
    const pipButton = document.createElement("button");
    pipButton.classList.add("ytp-button", "ytp-pip-button");

    pipButton.setAttribute("data-priority", "8");
    pipButton.setAttribute("data-tooltip-target-id", "ytp-pip-button");
    pipButton.setAttribute("data-title-no-tooltip", "Picture-in-picture");
    pipButton.setAttribute("title", "Picture-in-picture (p)");
    pipButton.setAttribute("aria-label", "Picture-in-picture");
    pipButton.setAttribute("aria-keyshortcuts", "p");

    // Create SVG using the same structure as YouTube buttons
    const pipSvg = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    pipSvg.setAttribute("height", "100%");
    pipSvg.setAttribute("version", "1.1");
    pipSvg.setAttribute("viewBox", "0 0 36 36");
    pipSvg.setAttribute("width", "75%");

    // Add shadow element (like other YouTube buttons)
    const pipUse = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "use"
    );
    pipUse.setAttribute("class", "ytp-svg-shadow");
    pipUse.setAttribute("xlink:href", "#ytp-id-pip-custom");
    pipSvg.appendChild(pipUse);

    // Create group element to apply translation
    const pipGroup = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "g"
    );
    pipGroup.setAttribute("transform", "translate(6, 2)");

    // Add main paths for PIP button
    pipPaths.forEach((pathData, index) => {
      const pipPath = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      pipPath.setAttribute("d", pathData.d);
      pipPath.setAttribute("fill", "#fff"); // Use white fill as per your code
      if (index === 0) {
        pipPath.setAttribute("id", "ytp-id-pip-custom");
      }
      pipGroup.appendChild(pipPath); // Append paths to the group, not directly to SVG
    });

    // Append the group to the SVG
    pipSvg.appendChild(pipGroup);

    // Append the SVG to the button
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

    // Create exit SVG using the same structure
    const exitPipSvg = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    exitPipSvg.setAttribute("height", "100%");
    exitPipSvg.setAttribute("version", "1.1");
    exitPipSvg.setAttribute("viewBox", "0 0 36 36");
    exitPipSvg.setAttribute("width", "100%");

    // Add shadow element
    const exitPipUse = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "use"
    );
    exitPipUse.setAttribute("class", "ytp-svg-shadow");
    exitPipUse.setAttribute("xlink:href", "#ytp-id-exit-pip-custom");
    exitPipSvg.appendChild(exitPipUse);

    // Add main path for exit button
    const exitPath = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    exitPath.setAttribute("d", exitPipPaths[0].d);
    exitPath.setAttribute("fill", "#fff");
    exitPath.setAttribute("id", "ytp-id-exit-pip-custom");
    exitPipSvg.appendChild(exitPath);

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

    // Insert in the correct position - after miniplayer button or before settings
    const miniplayer = controls.querySelector(".ytp-miniplayer-button");
    const settingsButton = controls.querySelector(".ytp-settings-button");

    // if (miniplayer) {
    //   // Insert after miniplayer button
    //   miniplayer.parentNode.insertBefore(pipContainer, miniplayer.nextSibling);
    if (settingsButton) {
      // Insert after settings button
      settingsButton.parentNode.insertBefore(
        pipContainer,
        settingsButton.nextSibling
      );
    } else if (settingsButton) {
      // Insert before settings button
      controls.insertBefore(pipContainer, settingsButton);
    } else {
      // Fallback: prepend to controls
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

// Add keyboard shortcut support (enhanced to avoid conflicts)
function addPipKeyboardShortcut() {
  document.addEventListener("keydown", (event) => {
    // Only handle 'p' key for PIP when not conflicting with YouTube's miniplayer
    if (
      event.key === "p" &&
      event.shiftKey &&
      !event.ctrlKey &&
      !event.altKey &&
      !event.metaKey
    ) {
      // Make sure we're not typing in an input field
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

      // Toggle PIP mode
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
