export default function renderAirwaypoints(svg: any, airwaypoints: any, path: any): void {
  // Render airwaypoints
  svg.selectAll(".airwaypoint")
    .data(airwaypoints.features)
    .enter()
    .append("polygon") // Append polygons for each airwaypoint
    .attr("points", function (d: any) {
      // Check if path is defined
      if (!path) {
        return "";
      }
      // Define triangle points around the centroid of the feature
      var centroid = path.centroid(d);
      if (!centroid || isNaN(centroid[0]) || isNaN(centroid[1])) {
        return ""; // Return empty string if centroid is undefined or NaN
      }
      var size = 5; // Adjust size as needed
      return (centroid[0]) + "," + (centroid[1] - size) + " " + (centroid[0] - size) + "," + (centroid[1] + size) + " " + (centroid[0] + size) + "," + (centroid[1] + size);
    })
    .style("fill", "#800080")
    .style("stroke", "#800080");

  // Add text labels near each airwaypoint
  svg.selectAll(".airwaypoint-label")
    .data(airwaypoints.features)
    .enter()
    .append("text")
    .attr("x", function (d: any) {
      if (!path || !path.centroid(d)) return 0;
      return path.centroid(d)[0];
    })
    .attr("y", function (d: any) {
      if (!path || !path.centroid(d)) return 0;
      return path.centroid(d)[1] + 15;
    })
    .text(function (d: { properties: { name: any; }; }) { return d.properties.name; })
    .attr("text-anchor", "middle")
    .style("fill", "#800080")
    .style("font-size", "0.5rem");

}
