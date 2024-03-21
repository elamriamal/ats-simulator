"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function renderSectors(svg, geojson, path) {
    // Render sectors
    svg.selectAll(".country")
        .data(geojson.features)
        .enter()
        .append("path")
        .attr("d", path)
        .style("fill", "#868686") // Dark grey fill color for sectors
        .style("stroke", "white"); // Light stroke color for sectors
}
exports.default = renderSectors;
//# sourceMappingURL=sectors.js.map