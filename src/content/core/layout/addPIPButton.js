import { createSvgIcon } from "../../utils/createSvgIcon";

export function addPIPButton() {
  const settingsButton = document.querySelector(".ytp-settings-button");
  const rightControls = document.querySelector(".ytp-right-controls");

  // Check if both elements exist
  if (settingsButton && rightControls) {
    const pipButton = document.createElement("button");

    pipButton.className = "ytp-pip-button ytp-button";
    pipButton.setAttribute("data-priority", "6");
    pipButton.setAttribute("data-tooltip-target-id", "ytp-pip-button");
    pipButton.setAttribute("aria-keyshortcuts", "p");
    pipButton.setAttribute("title", "Picture-in-picture (p)");
    pipButton.setAttribute(
      "aria-label",
      "Picture-in-picture keyboard shortcut p"
    );

    const paths = [
      "M240 1622 c-19 -9 -43 -33 -55 -52 -19 -34 -20 -50 -20 -570 0 -520 1 -536 20 -570 39 -67 56 -70 366 -70 255 0 277 1 292 18 22 24 21 55 -1 75 -16 14 -55 17 -288 19 l-269 3 0 525 0 525 715 0 715 0 5 -176 c5 -184 11 -209 52 -209 11 0 28 5 39 10 18 10 19 23 19 203 0 175 -2 195 -20 225 -39 64 -16 62 -812 62 -668 0 -726 -1 -758 -18z",
      "M550 1441 c-20 -38 -9 -57 87 -153 l98 -98 -81 0 c-87 0 -114 -14 -114 -58 0 -47 20 -52 195 -52 207 0 195 -12 195 190 0 164 -8 190 -60 190 -44 0 -60 -31 -60 -115 l0 -70 -93 93 c-78 78 -97 92 -124 92 -22 0 -36 -6 -43 -19z",
      "M1010 1042 c-67 -33 -71 -54 -68 -347 3 -281 4 -287 59 -319 24 -14 74 -16 394 -16 l367 0 34 34 34 34 0 279 c0 241 -2 282 -16 302 -34 48 -58 51 -426 51 -307 0 -347 -2 -378 -18z m710 -337 l0 -235 -330 0 -330 0 0 235 0 235 330 0 330 0 0 -235z",
    ];

    const svg = createSvgIcon(paths, "24", "24", "0 0 200 220", "white");

    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.setAttribute("version", "1.0");
    svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
    svg.style.cssText = `
    pointer-events: none;
    display: block;
    width: 36px;
    height: 36px;
  `;

    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.setAttribute(
      "transform",
      "translate(30.000000,200.000000) scale(0.100000,-0.100000)"
    );
    g.setAttribute("fill", "white");
    g.setAttribute("stroke", "none");

    while (svg.firstChild) {
      g.appendChild(svg.firstChild);
    }
    svg.appendChild(g);

    pipButton.appendChild(svg);
    // Add hover effects similar to other YouTube buttons
    pipButton.addEventListener("mouseenter", () => {
      pipButton.style.opacity = "1";
    });

    pipButton.addEventListener("mouseleave", () => {
      pipButton.style.opacity = "0.9";
    });

    // Insert the new PiP button after the settings button
    settingsButton.parentNode.insertBefore(
      pipButton,
      settingsButton.nextSibling
    );

    // Add click event to trigger Picture-in-Picture mode
    pipButton.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      const video = document.querySelector("video");
      if (video) {
        if (document.pictureInPictureElement) {
          document
            .exitPictureInPicture()
            .catch((err) => console.error("Error exiting PiP:", err));
        } else {
          video
            .requestPictureInPicture()
            .catch((err) => console.error("Error entering PiP:", err));
        }
      }
    });

    // Add keyboard shortcut support (P key)
    document.addEventListener("keydown", (e) => {
      // Only trigger if not typing in an input field
      if (
        e.key.toLowerCase() === "p" &&
        !["INPUT", "TEXTAREA"].includes(e.target.tagName)
      ) {
        const video = document.querySelector("video");
        if (video) {
          e.preventDefault();
          if (document.pictureInPictureElement) {
            document
              .exitPictureInPicture()
              .catch((err) => console.error("Error exiting PiP:", err));
          } else {
            video
              .requestPictureInPicture()
              .catch((err) => console.error("Error entering PiP:", err));
          }
        }
      }
    });

    // Optional: Update button appearance based on PiP state
    const updatePiPButtonState = () => {
      if (document.pictureInPictureElement) {
        pipButton.style.color = "#ff0000"; // YouTube red when active
        pipButton.setAttribute("title", "Exit picture-in-picture (p)");
      } else {
        pipButton.style.color = ""; // Reset to default
        pipButton.setAttribute("title", "Picture-in-picture (p)");
      }
    };

    // Listen for PiP state changes
    document.addEventListener("enterpictureinpicture", updatePiPButtonState);
    document.addEventListener("leavepictureinpicture", updatePiPButtonState);
  }
}
