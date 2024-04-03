"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function renderAirports(svg, airports, path) {
    // Render airports
    svg.selectAll(".country")
        .data(airports.features)
        .enter()
        .append("circle") // Change to circle for points
        .attr("cx", function (d) {
        // Check if path is defined
        if (!path) {
            return 0;
        }
        // Get centroid of the feature
        var centroid = path.centroid(d);
        if (!centroid || isNaN(centroid[0])) {
            return 0; // Return 0 if centroid is undefined or NaN
        }
        return centroid[0]; // Return x-coordinate of centroid
    })
        .attr("cy", function (d) {
        // Check if path is defined
        if (!path) {
            return 0;
        }
        // Get centroid of the feature
        var centroid = path.centroid(d);
        if (!centroid || isNaN(centroid[1])) {
            return 0; // Return 0 if centroid is undefined or NaN
        }
        return centroid[1]; // Return y-coordinate of centroid
    })
        .attr("r", 2) // Adjust radius as needed
        .style("fill", "#841a1b")
        .style("stroke", "#841a1b");
    // Add text near each airport
    svg.selectAll(".airport-label")
        .data(airports.features)
        .enter()
        .append("text")
        .attr("class", "airport-label") // Set class for styling
        .attr("x", function (d) {
        if (!path || !path.centroid(d))
            return 0;
        return path.centroid(d)[0]; // Adjust horizontal position to the right of the circle
    })
        .attr("y", function (d) {
        if (!path || !path.centroid(d))
            return 0;
        return path.centroid(d)[1] + 15; // Adjust vertical position below the circle10
    })
        .text(function (d) {
        return d.properties.name;
    })
        .attr("text-anchor", "middle")
        .style("fill", "#841a1b")
        .style("font-size", "0.5rem"); // Adjust font size as needed
}
exports.default = renderAirports;
//# sourceMappingURL=airports.js.map