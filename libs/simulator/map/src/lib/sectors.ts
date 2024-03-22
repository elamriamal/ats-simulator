export default function renderSectors(svg: any, geojson: any, path: any): void {
  // Render sectors
  svg.selectAll(".country")
    .data(geojson.features)
    .enter()
    .append("path")
    .attr("d", path)
    .style("fill", "#AAAAAA") // Dark grey fill color for sectors
    .style("stroke", "#FEFEE2"); // Light stroke color for sectors
}
