export function createSvg(paths, svgId) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("height", "100%");
  svg.setAttribute("version", "1.1");
  svg.setAttribute("viewBox", "0 0 36 36");
  svg.setAttribute("width", paths.length > 1 ? "75%" : "100%");

  // Shadow
  const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
  use.setAttribute("class", "ytp-svg-shadow");
  use.setAttribute("xlink:href", `#${svgId}`);
  svg.appendChild(use);

  // Nếu nhiều path (dùng group và translate)
  if (paths.length > 1) {
    const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    group.setAttribute("transform", "translate(6, 2)");

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
    // Một path duy nhất
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", paths[0].d);
    path.setAttribute("fill", "#fff");
    path.setAttribute("id", svgId);
    svg.appendChild(path);
  }

  return svg;
}
