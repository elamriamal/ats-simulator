export default function renderSectors(svg: any, geojson: any, path: any): void {
  const colorScale = ["#767676", "#888888", "#5a5e6b", "#999999", "#666666", "#AAAAAA", "#484b55"];
 
  const colorGenerator = (index: number) => {
    return colorScale[index % colorScale.length];
  };

  // Render sectors
  svg.selectAll(".country")
    .data(geojson.features)
    .enter()
    .append("path")
    .attr("d", path)
    .attr("fill", (d: any, i: number) => colorGenerator(i))
    .style("stroke", "#FEFEE2"); // Light stroke color for sectors
}
