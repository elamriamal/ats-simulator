"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function renderSectors(svg, geojson, path) {
    // Render sectors
    svg.selectAll(".country")
        .data(geojson.features)
        .enter()
        .append("path")
        .attr("d", path)
        .style("fill", "#AAAAAA") // Dark grey fill color for sectors
        .style("stroke", "#FEFEE2"); // Light stroke color for sectors
}
exports.default = renderSectors;
//# sourceMappingURL=sectors.js.map