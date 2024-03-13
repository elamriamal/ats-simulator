import { LitElement, css, svg, SVGTemplateResult } from 'lit';
import * as d3 from 'd3';
import { customElement, property } from 'lit/decorators.js';

@customElement('ats-simulator-map')
export class MapElement extends LitElement {
  @property({ type: Number }) width = window.innerWidth;
  @property({ type: Number }) height = window.innerHeight;
  private geojson: any;
  private svg: any;
  private g: any;
  private zoom: any;

  static override styles = css`
    :host {
      display: block;
      overflow: hidden; /* Hide overflow content */
    }

    svg {
      display: block;
      background-color: #444; 
    }
  `;

  override render(): SVGTemplateResult {
    return svg`
      <!-- Create SVG element for the map -->
      <svg width="${this.width}" height="${this.height}">
        <g></g>
      </svg>
    `;
  }

  override firstUpdated(): void {
    this.svg = d3.select(this.shadowRoot!.querySelector('svg'));
    this.g = this.svg.select('g');

    // Create a projection for the entire world map
    var projection = d3.geoMercator().scale(this.width / 6).translate([this.width / 2, this.height / 2]);

    // Create a path generator
    const path = d3.geoPath().projection(projection);

    // Add zoom behavior
    this.zoom = d3.zoom<SVGSVGElement, any>()
      .scaleExtent([1, 8]) // Set minimum and maximum zoom scale
      .on('zoom', (event) => {
        this.g.attr('transform', event.transform);
      });

    this.svg.call(this.zoom);

    // Render map with adjusted projection
    this.renderMap(path);
  }

  private renderMap(path: any): void {
    // Remove any existing elements
    this.g.selectAll("*").remove();

    // Render countries
    this.g.selectAll(".country")
      .data(this.geojson.features)
      .enter()
      .append("path")
      .attr("class", "country")
      .attr("d", path)
      .style("fill", "#444") // Dark grey fill color for countries
      .style("stroke", "#666666") // Light stroke color for countries
  }

  // Function to zoom in
  zoomIn(): void {
    this.svg.transition().call(this.zoom.scaleBy, 2);
  }

  // Function to zoom out
  zoomOut(): void {
    this.svg.transition().call(this.zoom.scaleBy, 0.5);
  }
}
