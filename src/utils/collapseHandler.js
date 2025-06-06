export function initializeCollapsibleSections() {
  const toggleIcons = document.querySelectorAll(".collapseToggleIcon");

  if (!toggleIcons.length) {
    console.warn("No elements with class 'collapseToggleIcon' found.");
    return;
  }

  if (typeof mdb === "undefined" || !mdb.Collapse) {
    console.error("MDB Collapse library is not loaded.");
    return;
  }

  toggleIcons.forEach((icon) => {
    const targetId = icon.getAttribute("data-collapse-target");
    const collapseElement = document.getElementById(targetId);

    if (!collapseElement) {
      console.warn(`Collapse element with ID '${targetId}' not found.`);
      return;
    }

    try {
      const collapseInstance = new mdb.Collapse(collapseElement, {
        toggle: false,
      });

      const sectionTitle = icon.closest(".section-title");
      if (sectionTitle) {
        sectionTitle.addEventListener("click", () => {
          collapseInstance.toggle();
        });
      } else {
        console.warn(
          `Section title not found for icon with data-collapse-target '${targetId}'.`
        );
      }

      collapseElement.addEventListener("show.mdb.collapse", () => {
        icon.classList.remove("fa-plus");
        icon.classList.add("fa-minus");
      });

      collapseElement.addEventListener("hide.mdb.collapse", () => {
        icon.classList.remove("fa-minus");
        icon.classList.add("fa-plus");
      });
    } catch (error) {
      console.error(
        `Failed to initialize collapse for element with ID '${targetId}':`,
        error
      );
    }
  });
}
