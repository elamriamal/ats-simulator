"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function renderAirways(svg, airways, path) {
    // Render airways
    svg.selectAll(".country")
        .data(airways.features)
        .enter()
        .append("path")
        .attr("d", path)
        .style("fill", "none")
        .style("stroke", "black");
}
exports.default = renderAirways;
//# sourceMappingURL=airways.js.map