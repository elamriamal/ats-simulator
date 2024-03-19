import { LitElement, css, svg, SVGTemplateResult, PropertyValueMap } from 'lit';
import * as d3 from 'd3';
import { customElement, property } from 'lit/decorators.js';

@customElement('ats-simulator-map')
export class MapElement extends LitElement {
  @property({ type: Number }) width = window.innerWidth;
  @property({ type: Number }) height = window.innerHeight;
  @property({ type: Array }) flights: any[] = [];

  constructor() {
    super();
  }

  private geojson: any;
  private svg: any;
  private g: any;
  private zoom: any;
  private tooltip: any;
  private projection: any;
  private path: any;
  override updated(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>) {
    super.updated(changedProperties);

    // Create a projection for the entire map
    this.projection = d3.geoMercator()
      .scale(this.width / 6).translate([this.width / 2, this.height / 2]);

    // Create a path generator
    this.path = d3.geoPath().projection(this.projection);

    if (changedProperties.has('flights')) {
      // Call renderMap every time flights property is updated
      this.renderMap(this.path);
    }
  }

  static override styles = css`
    :host {
      display: block;
      overflow: hidden; /* Hide overflow content */
    }
    svg {
      display: block;
      background-color: #444; 
    }
    .flight-card {
      position: absolute;
      color: white;
      cursor: pointer;
    }
    .plane {
      color: white;
      border: 1px solid white;
      text-align: center;
      width: 1.4vmin;
      cursor: pointer;
    }
    .tooltip {
      position: absolute;
      color: white;
      z-index: 9999; /* Ensure tooltip appears on top */
      pointer-events: none;
      -webkit-pointer-events: none; /* Safari and Chrome */
      -moz-pointer-events: none; /* Firefox */
      -ms-pointer-events: none; /* Internet Explorer */
      border: 1px solid rgba(248, 241, 241, 0.5);
      background: rgba(0, 0, 0, 0.7);
      border-radius: 3px;
      box-shadow: 0 1px 2px rgba(0,0,0,0.10);
      padding: 8px;
      font-size: 8px;
    }
  `;

  override render(): SVGTemplateResult {
    return svg`
      <!-- Create SVG element for the map -->
      <svg width="${this.width}" height="${this.height}">
        <g></g>
      </svg>
      <!-- Tooltip -->
      <div class="tooltip" style="display: none;"></div>
    `;
  }

  override firstUpdated(): void {
    this.svg = d3.select(this.shadowRoot!.querySelector('svg'));
    this.g = this.svg.select('g');
    this.tooltip = this.shadowRoot!.querySelector('.tooltip');

    // Add zoom behavior
    this.zoom = d3.zoom<SVGSVGElement, any>()
      .scaleExtent([1, 8]) // Set minimum and maximum zoom scale
      .on('zoom', (event) => {
        this.g.attr('transform', event.transform);
      });

    this.svg.call(this.zoom);
    // Render map with adjusted projection
    this.renderMap(this.path);
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
      .style("stroke", "#666666"); // Light stroke color for countries

    // Render flights
    this.flights?.forEach((flight: {
      metadata: any;
      data: any;
      aircraftId: string;
      position: { latitude: number; longitude: number };
    }) => {
      const { position } = flight;
      const [x, y] = this.projection([position.longitude, position.latitude]); // Convert lat/long to SVG coordinates

      const foreignObject = this.g.append('foreignObject')
        .attr('x', x)
        .attr('y', y);

      // Append a temporary div to the foreignObject
      const tempDiv = foreignObject.append('xhtml:div')
        .attr('xmlns', 'http://www.w3.org/1999/xhtml')
        .classed('flight-card', true)
        .style('visibility', 'hidden') // Hide the temporary div
        .html(flight.data);

      // Append the plane section
      foreignObject.append('xhtml:section')
        .classed('plane', true)
        .html('x');

      // Get dimensions of the temporary div and plane section
      const divWidth = tempDiv.node().getBoundingClientRect().width;
      const divHeight = tempDiv.node().getBoundingClientRect().height;
      const planeWidth = foreignObject.select('.plane').node().getBoundingClientRect().width;
      const planeHeight = foreignObject.select('.plane').node().getBoundingClientRect().height;

      // Calculate total width and height including the plane element
      const width = Math.max(divWidth, planeWidth);
      const height = divHeight + planeHeight;

      // Remove the temporary div
      tempDiv.remove();

      // Update foreignObject dimensions with calculated width and height
      foreignObject
        .attr('width', width)
        .attr('height', height);

      // make the foreignObject visible
      foreignObject.select('.flight-card').style('visibility', 'visible');

      const div = foreignObject.append('xhtml:div')
        .attr('xmlns', 'http://www.w3.org/1999/xhtml')
        .classed('flight-card', true);

      div.append('p').html(flight.data);

      // Add tooltip interaction for flights
      foreignObject.on('mouseover', (event: MouseEvent) => {
        const flightData = flight.metadata; // Get flight data for the current flight

        // Get the position of the mouse pointer relative to the SVG container
        const svgRect = this.svg.node().getBoundingClientRect();
        const x = event.clientX - svgRect.left;
        const y = event.clientY - svgRect.top;

        // Adjust tooltip position to be over the flight card
        this.tooltip.style.left = `${x}px`; // Initial left position
        this.tooltip.style.top = `${y}px`; // Initial top position

        // Update tooltip content
        this.tooltip.innerHTML = flightData;

        // Show tooltip initially (may still have zero dimensions)
        this.tooltip.style.display = 'block';
      })

        .on('mouseout', () => {
          // Hide tooltip on mouseout
          this.tooltip.style.display = 'none';
        });

    });
  }
}
