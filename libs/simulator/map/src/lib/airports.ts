export default function renderAirports(svg: any, airports: any, path: any): void {
  // Render airports
  svg.selectAll(".airport")
    .data(airports.features[1])
    .enter()
    .append("path")
    .attr("class", "airport") // Set class for styling
    .attr("d", function (d: any) {
      if (!path) {
        return ""; // Return empty string if path is undefined
      }
      return path(d);
    })
    .style("fill", "none") // Set fill to transparent
    .style("stroke", "black")
    .attr("transform", function (d: any) {
      // Ensure path is defined before using it
      if (!path) {
        return ""; // Return empty string if path is undefined
      }
      // Adjust the scaling factor for the airport circle size
      var scale = 0.3;
      var centroid = path.centroid(d);
      return "translate(" + centroid + ") scale(" + scale + ")";
    });

  // Add text near each airport
  // svg.selectAll(".airport-label")
  //   .data(airports.features)
  //   .enter()
  //   .append("text")
  //   .attr("class", "airport-label") // Set class for styling
  //   .attr("x", function (d: any) {
  //     if (!path || !path.centroid(d)) return 0;
  //     return path.centroid(d)[0];
  //   })
  //   .attr("y", function (d: any) {
  //     if (!path || !path.centroid(d)) return 0;
  //     return path.centroid(d)[1] - 600; // Adjust vertical position to place text closer to the circle
  //   })
  //   .text(function (d: any) { console.log(d.properties.name);
  //    return d.properties.name; })
  //   .attr("text-anchor", "middle")
  //   .style("fill", "black")
  //   .style("font-size", "0.3rem"); // Adjust font size as needed
}