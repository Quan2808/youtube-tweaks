export function createSvg(paths, svgId, options = {}) {
  const {
    width = "100%",
    height = "100%",
    viewBox = "0 0 36 36",
    groupTranslate = "translate(6, 2)",
    fill = "#fff",
    className = "",
  } = options;

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", width);
  svg.setAttribute("height", height);
  svg.setAttribute("viewBox", viewBox);
  svg.setAttribute("version", "1.1");
  if (className) svg.setAttribute("class", className);

  // Shadow
  const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
  use.setAttribute("class", "ytp-svg-shadow");
  use.setAttribute("xlink:href", `#${svgId}`);
  svg.appendChild(use);

  if (paths.length > 1) {
    const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    group.setAttribute("transform", groupTranslate);

    paths.forEach((pathData, index) => {
      const path = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      path.setAttribute("d", pathData.d);
      path.setAttribute("fill", fill);
      if (index === 0) path.setAttribute("id", svgId);
      group.appendChild(path);
    });

    svg.appendChild(group);
  } else {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", paths[0].d);
    path.setAttribute("fill", fill);
    path.setAttribute("id", svgId);
    svg.appendChild(path);
  }

  return svg;
}
