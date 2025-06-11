export function createSvgIcon(
  pathData,
  width = "16",
  height = "16",
  viewBox = "0 0 24 24",
  fill = "none"
) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", width);
  svg.setAttribute("height", height);
  svg.setAttribute("viewBox", viewBox);
  svg.setAttribute("fill", "none");

  if (Array.isArray(pathData)) {
    pathData.forEach((data) => {
      const path = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      path.setAttribute("d", data);
      path.setAttribute("fill", fill);
      svg.appendChild(path);
    });
  } else {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", pathData);
    path.setAttribute("fill", fill);
    svg.appendChild(path);
  }

  return svg;
}
