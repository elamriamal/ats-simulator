"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function renderBeacons(svg, beacons, path) {
    // Render beacons
    svg.selectAll(".country")
        .data(beacons.features)
        .enter()
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
        var size = 5; // Adjust size as needed
        return (x) + "," + (y - size) + " " + (x - size) + "," + (y + size) + " " + (x + size) + "," + (y + size);
    })
        .style("fill", "#00FFFF")
        .style("stroke", "#00FFFF");
    // Add text near each beacon
    svg.selectAll(".beacon-label")
        .data(beacons.features)
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
        return path.centroid(d)[1] + 15;
    })
        .text(function (d) { return d.properties.name; })
        .attr("text-anchor", "middle")
        .style("fill", "#00FFFF")
        .style("font-size", "0.5rem"); // Adjust font size as needed
}
exports.default = renderBeacons;
//# sourceMappingURL=beacons.js.map