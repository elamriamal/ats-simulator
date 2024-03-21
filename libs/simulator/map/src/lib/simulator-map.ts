import { LitElement, css, svg, SVGTemplateResult, PropertyValueMap } from 'lit';
import * as d3 from 'd3';
import { customElement, property } from 'lit/decorators.js';
import renderSectors from './sectors';
import renderFlights from './flights';
import renderBeacons from './beacons';
import renderAirports from './airports';
import renderAirwaypoints from './airwaypoints';
import renderAirways from './airways';

@customElement('ats-simulator-map')
export class MapElement extends LitElement {
  @property({ type: Number }) width = window.innerWidth;
  @property({ type: Number }) height = window.innerHeight;
  @property({ type: Array }) flights: any[] = [];

  constructor() {
    super();
  }

  private geojson: any;
  private beacons: any;
  private airports: any;
  private airwaypoints: any;
  private airways: any;
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
      this.renderMap();
    }
  }


  static override styles = css`
    :host {
      display: block;
      overflow: hidden; /* Hide overflow content */
    }
    .flight-card {
      position: absolute;
      color: white;
      cursor: pointer;
      font-size: 0.3rem;
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
      width: 8px;
      min-width: 8px;
      max-width: 8px;
      height: 8px;
      min-height: 8px;
      max-height: 8px;
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
      font-size: 0.5rem;
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
      .scaleExtent([1, 10]) // Set minimum and maximum zoom scale
      .on('zoom', (event) => {
        // Update the transform attribute of the <g> element
        this.g.attr('transform', event.transform);
      });

    this.svg.call(this.zoom);
    // Render map with adjusted projection
    this.renderMap();
  }

  private renderMap(): void {
    // Remove any existing elements
    this.g.selectAll("*").remove();
    // Render sectors
    renderSectors(this.g, this.geojson, this.path);

    // Render beacons
    renderBeacons(this.g, this.beacons, this.path);

    // Render airports
    renderAirports(this.g, this.airports, this.path);

    // Render Airwaypoints
    renderAirwaypoints(this.g, this.airwaypoints, this.path);

    // Render airways
    renderAirways(this.g, this.airways, this.path);

    // Render flights
    renderFlights(this.g, this.flights, this.projection, this.tooltip);

  }

}
