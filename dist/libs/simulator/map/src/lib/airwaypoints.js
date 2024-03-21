"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function renderAirwaypoints(svg, airwaypoints, path) {
    // Render airwaypoints
    svg.selectAll(".country")
        .data(airwaypoints.features)
        .append("polygon")
        .attr("points", function (d) {
        // Check if path is defined
        if (!path) {
            return "";
        }
        // Define triangle points around the centroid of the feature
        var centroid = path.centroid(d);
        if (!centroid || isNaN(centroid[0]) || isNaN(centroid[1])) {
            return ""; // Return empty string if centroid is undefined or NaN
        }
        var x = centroid[0];
        var y = centroid[1];
        var size = 1; // Adjust size as needed
        return (x) + "," + (y - size) + " " + (x - size) + "," + (y + size) + " " + (x + size) + "," + (y + size);
    })
        .style("fill", "black")
        .style("stroke", "black");
    // Add text near each airwaypoints
    svg.selectAll(".airwaypoints-label")
        .data(airwaypoints.features)
        .enter()
        .append("text")
        .attr("x", function (d) {
        if (!path || !path.centroid(d))
            return 0;
        return path.centroid(d)[0];
    })
        .attr("y", function (d) {
        if (!path || !path.centroid(d))
            return 0;
        return path.centroid(d)[1] + 3;
    })
        .text(function (d) { return d.properties.name; })
        .attr("text-anchor", "middle")
        .style("fill", "black")
        .style("font-size", "0.2rem");
}
exports.default = renderAirwaypoints;
//# sourceMappingURL=airwaypoints.js.map