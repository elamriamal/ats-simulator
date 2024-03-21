import { LitElement, css, svg, SVGTemplateResult, PropertyValueMap } from 'lit';
import * as d3 from 'd3';
import { customElement, property } from 'lit/decorators.js';
import { generateRandomData } from './utils';

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

    const center: [number, number] = [35, 40]; // Approximate center of the map
    const scale = Math.max(this.width, this.height); // Adjust the scale factor as needed

    // Create a projection
    this.projection = d3.geoMercator()
      .center(center)
      .scale(scale)
      .translate([this.width / 2, this.height / 2]);

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
      font-size: 0.5rem;
      width: 50px;
      min-width: 50px;
      max-width: 50px;
      height: 50px;
      min-height: 50px;
      max-height: 50px;
      pointer-events: none;
      -webkit-pointer-events: none; /* Safari and Chrome */
      -moz-pointer-events: none; /* Firefox */
      -ms-pointer-events: none; /* Internet Explorer */
    }
    .plane {
      color: white;
      border: 0.2px solid white;
      text-align: center;
      cursor: pointer;
      width: 5px;
      min-width: 5px;
      max-width: 5px;
      height: 5px;
      min-height: 5px;
      max-height: 5px;
      width: 100%; /* Ensure contents fill the available space */
      height: 100%;
      margin: 0; /* Reset margins */
      padding: 0; /* Reset padding */
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
      <svg width="${this.width * 10}" height="${this.height * 10}">
        <g></g>
      </svg>
      <!-- Tooltip -->
      <div class="tooltip" style="display: none;"></div>
    `;
  }

  override firstUpdated(): void {
    this.svg = d3.select(this.shadowRoot!.querySelector('svg'));
    this.g = this.svg.select('g');
    this.g.attr("clip-path", "inset(5%)");
    this.tooltip = this.shadowRoot!.querySelector('.tooltip');
  
    // Add zoom behavior
    this.zoom = d3.zoom<SVGSVGElement, any>()
      .scaleExtent([1, 8]) // Set minimum and maximum zoom scale
      .on('zoom', (event) => {
        // Update the transform attribute of the <g> element
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
      .attr("d", path)
      .style("fill", "#444") // Dark grey fill color for countries
      .style("stroke", "#666666"); // Light stroke color for countries

    // Render flights
    this.flights?.forEach((flight: {
      metadata: any;
      data: any;
      aircraftId: string;
      position: {
        hdg: any;
        cas: any; latitude: number; longitude: number
      };
    }) => {
      const foreignObjectId = `flight-foreign-object-${flight.aircraftId}`;
      const { position } = flight;
      const [x, y] = this.projection([position.longitude, position.latitude]); // Convert lat/long to SVG coordinates

      const foreignObject = this.g.append('foreignObject')
        .attr('id', foreignObjectId)
        .attr('x', x)
        .attr('y', y);

      // Append the plane section
      foreignObject.append('xhtml:section')
        .classed('plane', true)
        .html('x');

      // Update foreignObject dimensions with calculated width and height
      foreignObject
        .attr('width', 50)
        .attr('height', 50)

      const div = foreignObject.append('xhtml:div')
        .attr('xmlns', 'http://www.w3.org/1999/xhtml')
        .classed('flight-card', true);
      div.append('p').html(`${flight?.aircraftId} <br> ${Math.floor(flight?.position?.cas)} - ${Math.floor(flight?.position?.hdg)}`);

      // Add tooltip interaction for flights
      foreignObject.select('.plane').on('mouseover', (event: MouseEvent) => {
        const flightData = `${flight?.aircraftId}<br>${Math.floor(flight?.position?.cas)} - ${Math.floor(flight?.position?.hdg)}<br>${generateRandomData()?.metadata}`;

        const svgRect = this.svg.node().getBoundingClientRect();
        const x = event.clientX - svgRect.left;
        const y = event.clientY - svgRect.top;

        // Check if the mouse coordinates intersect with the bounding box of the current flight's foreignObject
        const bbox = foreignObject.node().getBoundingClientRect();
        if (x >= bbox.left && x <= bbox.right && y >= bbox.top && y <= bbox.bottom) {
          this.tooltip.style.left = `${x - 50}px`;
          this.tooltip.style.top = `${y - 28}px`;
          this.tooltip.innerHTML = flightData;
          this.tooltip.style.display = 'block';
        }
      })

        .on('mouseout', () => {
          this.tooltip.style.display = 'none';
        });
    });
  }
}
