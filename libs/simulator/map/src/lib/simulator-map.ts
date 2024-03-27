import { LitElement, css, svg, SVGTemplateResult, PropertyValueMap } from 'lit';
import * as d3 from 'd3';
import { customElement, property } from 'lit/decorators.js';
import { debounce } from 'lodash'; // Import debounce function
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

  private geojson: any;
  private beacons: any;
  private airports: any;
  private airwaypoints: any;
  private airways: any;
  private svg: any;
  private g: any;
  private zoom: any;
  private projection: any;
  private path: any;
  tooltip: any;
  // Properties to track visibility of map elements
  private showAirways = true;
  private showAirports = true;
  private showBeacons = true;
  private showAirwaypoints = true;

  constructor() {
    super();
    this.toggleAirways = debounce(this.toggleAirways, 300, { leading: true, trailing: false });
    this.toggleAirports = debounce(this.toggleAirports, 300, { leading: true, trailing: false });
    this.toggleBeacons = debounce(this.toggleBeacons, 300, { leading: true, trailing: false });
  }

  override updated(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>) {
    super.updated(changedProperties);

    const center: [number, number] = [35, 40]; // Approximate center of the map
    const scale = Math.max(this.width, this.height)*2.5; // Adjust the scale factor as needed

    // Create a projection
    this.projection = d3.geoMercator()
      .center(center)
      .scale(scale)
      .translate([this.width / 2, this.height / 2]);

    // Create a path generator
    this.path = d3.geoPath().projection(this.projection);

    if (changedProperties.has('flights') || changedProperties.has('showAirways') || changedProperties.has('showAirports') || changedProperties.has('showBeacons')) {
      // Call renderMap every time flights or visibility properties are updated
      this.renderMap();
    }
  }

  static override styles = css`
    :host {
      display: block;
      overflow: hidden; /* Hide overflow content */
      color: white;
      font-size: 12px; /* Set the font size for the entire component */
    }
   
    .checkbox-input {
      width: 20px; /* Increase checkbox size */
      height: 20px;
      background-color: rgba(0, 0, 0, 0.5);
      border: 1px solid rgba(255, 255, 255, 0.5);
      border-radius: 4px;
    }
    .checkbox-input:checked {
      background-color: white;
    }
    .checkbox-container {
      display: flex;
      flex-direction: row;
      align-items: center;
      background-color: rgba(0, 0, 0, 0.5);
      padding: 5px;
      border-radius: 8px;
    }
    .checkbox-container label {
      display: flex;
      align-items: center;
      margin-right: 10px;
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
      width: 8px;
      min-width: 8px;
      max-width: 8px;
      height: 8px;
      min-height: 8px;
      max-height: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
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
    .bg-color {
      background-color: #AAAAAA;
    }
  `;

  override render(): SVGTemplateResult {
    return svg`
      <!-- Create SVG element for the map -->
      <svg width="${this.width * 10}" height="${this.height * 10}" class="bg-color">
        <g></g>
      </svg>
      <!-- Tooltip -->
      <div class="tooltip" style="display: none;"></div>
      <!-- Checkbox lists -->
      <div class="checkbox-container" style="position: absolute; bottom: 10px; right: 10px;">
        <label>
          <input type="checkbox" ?checked="${this.showAirways}" @change="${this.toggleAirways}"> Airways
        </label>
        <label>
          <input type="checkbox" ?checked="${this.showAirports}" @change="${this.toggleAirports}"> Airports
        </label>
        <label>
          <input type="checkbox" ?checked="${this.showBeacons}" @change="${this.toggleBeacons}"> Beacons
        </label>
      </div>
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

    if (this.showAirways) {
      renderAirways(this.g, this.airways, this.path);

      // Render Airwaypoints only if Airways are visible
      if (this.showAirwaypoints) {
         renderAirwaypoints(this.g, this.airwaypoints, this.path);
      }
    }

    if (this.showAirports) {
      renderAirports(this.g, this.airports, this.path);
    }

    if (this.showBeacons) {
      renderBeacons(this.g, this.beacons, this.path);
    }

    // Render flights
    renderFlights(this.g, this.flights, this.projection, this.tooltip);
  }

  private toggleAirports(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target) {
      this.showAirports = target.checked;
      this.renderMap();
    }
  }

  private toggleAirways(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target) {
      this.showAirways = target.checked;
      // Update showAirwaypoints based on showAirways and showBeacons
      this.updateAirwaypointsVisibility();
      this.renderMap();
    }
  }

  private toggleBeacons(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target) {
      this.showBeacons = target.checked;
      // Update showAirwaypoints based on showAirways and showBeacons
      this.updateAirwaypointsVisibility();
      this.renderMap();
    }
  }

  private updateAirwaypointsVisibility(): void {
    // Update showAirwaypoints based on showAirways and showBeacons
    this.showAirwaypoints = this.showAirways && !this.showBeacons;
  }

}
