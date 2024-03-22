export default function renderAirports(svg: any, airports: any, path: any): void {
  // Render airports
  svg.selectAll(".country")
    .data(airports.features)
    .enter()
    .append("path")
    .attr("d", function (d: any) {
      if (!path) {
        return ""; // Return empty string if path is undefined
      }
      return path(d);
    })
    .style("fill", "#841a1b") // Set fill to transparent
    .style("stroke", "#841a1b")
    .attr("transform", function (d: any) {
      // Ensure path is defined before using it
      if (!path) {
        return ""; // Return empty string if path is undefined
      }
      // Adjust the scaling factor for the airport circle size
      var scale = 0.5;
      
      var centroid = path.centroid(d);
      return "translate(" + centroid + ") scale(" + scale + ")";
    });

  // Add text near each airport
  svg.selectAll(".airport-label")
    .data(airports.features)
    .enter()
    .append("text")
    .attr("class", "airport-label") // Set class for styling
    .attr("x", function (d: any) {
      if (!path || !path.centroid(d)) return 0;
      return path.centroid(d)[0] + 100; // Adjust horizontal position to the right of the circle
    })
    .attr("y", function (d: any) {
      if (!path || !path.centroid(d)) return 0;
      return path.centroid(d)[1] + 60; // Adjust vertical position below the circle10
    })
    .text(function (d: any) {
      return d.properties.name;
    })
    .attr("text-anchor", "start") // Anchor text to start from the specified position
    .style("fill", "#841a1b")
    .style("font-size", "0.5rem"); // Adjust font size as needed
}
