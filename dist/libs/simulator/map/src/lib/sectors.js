"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function renderSectors(svg, geojson, path) {
    const colorScale = ["#767676", "#888888", "#5a5e6b", "#999999", "#666666", "#AAAAAA", "#484b55"];
    const colorGenerator = (index) => {
        return colorScale[index % colorScale.length];
    };
    // Render sectors
    svg.selectAll(".country")
        .data(geojson.features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("fill", (d, i) => colorGenerator(i))
        .style("stroke", "#FEFEE2"); // Light stroke color for sectors
}
exports.default = renderSectors;
//# sourceMappingURL=sectors.js.map