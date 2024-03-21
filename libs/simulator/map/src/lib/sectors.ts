export default function renderSectors(svg: any, geojson: any, path: any): void {
  // Render sectors
  svg.selectAll(".country")
    .data(geojson.features)
    .enter()
    .append("path")
    .attr("d", path)
    .style("fill", "#868686") // Dark grey fill color for sectors
    .style("stroke", "white"); // Light stroke color for sectors
}
