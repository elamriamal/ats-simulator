export default function renderAirways(svg: any, airways: any, path: any): void {
  // Render airways
  svg.selectAll(".country")
    .data(airways.features)
    .enter()
    .append("path")
    .attr("d", path)
    .style("fill", "none")
    .style("stroke", "#0080FF");
}
