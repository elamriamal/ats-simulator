import { LitElement, css, svg, SVGTemplateResult } from 'lit';
import * as d3 from 'd3';
import { customElement, property } from 'lit/decorators.js';

@customElement('ats-simulator-map')
export class MapElement extends LitElement {
  @property({ type: Number }) width = window.innerWidth;
  @property({ type: Number }) height = window.innerHeight;
  private geojson: any;

  static override = css`
    svg {
      background-color: #f0f0f0;
    }
  
  `;

  override render(): SVGTemplateResult {
    return svg`
      <!-- Create SVG element for the map -->
      <svg width="${this.width}" height="${this.height}"></svg>
    `;
  }

  override firstUpdated(): void {
    // Create a projection for the map
    const projection = d3.geoMercator()
    .center([0, 0])
    .scale(this.width / 2 / Math.PI) // scale to fit the map to the screen
    .translate([this.width / 2, this.height / 2]);
   
    // Create a path generator
    const path = d3.geoPath().projection(projection);

    // Select the SVG element
    const svg = this.shadowRoot!.querySelector('svg');

    if (svg) {
        // Remove any existing elements
        d3.select(svg).selectAll("*").remove();

        d3.select(svg)
            .selectAll(".country")
            .data(this.geojson.features)
            .enter()
            .append("path")
            .attr("class", "country")
            // @ts-ignore
            .attr("d", path)
            .style("fill", "#444") // Dark grey fill color for countries
            .style("stroke", "#666666"); // Light stroke color for countries
    }
}
}
