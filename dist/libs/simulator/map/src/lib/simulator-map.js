"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapElement = void 0;
const tslib_1 = require("tslib");
const lit_1 = require("lit");
const d3 = require("d3");
const decorators_js_1 = require("lit/decorators.js");
const lodash_1 = require("lodash"); // Import debounce function
const sectors_1 = require("./sectors");
const flights_1 = require("./flights");
const beacons_1 = require("./beacons");
const airports_1 = require("./airports");
const airwaypoints_1 = require("./airwaypoints");
const airways_1 = require("./airways");
let MapElement = class MapElement extends lit_1.LitElement {
    constructor() {
        super();
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.flights = [];
        // Properties to track visibility of map elements
        this.showAirways = true;
        this.showAirports = true;
        this.showBeacons = true;
        this.showAirwaypoints = true;
        this.toggleAirways = (0, lodash_1.debounce)(this.toggleAirways, 300, { leading: true, trailing: false });
        this.toggleAirports = (0, lodash_1.debounce)(this.toggleAirports, 300, { leading: true, trailing: false });
        this.toggleBeacons = (0, lodash_1.debounce)(this.toggleBeacons, 300, { leading: true, trailing: false });
    }
    updated(changedProperties) {
        super.updated(changedProperties);
        const center = [35, 40]; // Approximate center of the map
        const scale = Math.max(this.width, this.height) * 2.5; // Adjust the scale factor as needed
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
    render() {
        return (0, lit_1.svg) `
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
    firstUpdated() {
        this.svg = d3.select(this.shadowRoot.querySelector('svg'));
        this.g = this.svg.select('g');
        this.g.attr("clip-path", "inset(5%)");
        this.tooltip = this.shadowRoot.querySelector('.tooltip');
        // Add zoom behavior
        this.zoom = d3.zoom()
            .scaleExtent([1, 10]) // Set minimum and maximum zoom scale
            .on('zoom', (event) => {
            // Update the transform attribute of the <g> element
            this.g.attr('transform', event.transform);
        });
        this.svg.call(this.zoom);
        // Render map with adjusted projection
        this.renderMap();
    }
    renderMap() {
        // Remove any existing elements
        this.g.selectAll("*").remove();
        // Render sectors
        (0, sectors_1.default)(this.g, this.geojson, this.path);
        if (this.showAirways) {
            (0, airways_1.default)(this.g, this.airways, this.path);
            // Render Airwaypoints only if Airways are visible
            if (this.showAirwaypoints) {
                (0, airwaypoints_1.default)(this.g, this.airwaypoints, this.path);
            }
        }
        if (this.showAirports) {
            (0, airports_1.default)(this.g, this.airports, this.path);
        }
        if (this.showBeacons) {
            (0, beacons_1.default)(this.g, this.beacons, this.path);
        }
        // Render flights
        (0, flights_1.default)(this.g, this.flights, this.projection, this.tooltip);
    }
    toggleAirports(event) {
        const target = event.target;
        if (target) {
            this.showAirports = target.checked;
            this.renderMap();
        }
    }
    toggleAirways(event) {
        const target = event.target;
        if (target) {
            this.showAirways = target.checked;
            // Update showAirwaypoints based on showAirways and showBeacons
            this.updateAirwaypointsVisibility();
            this.renderMap();
        }
    }
    toggleBeacons(event) {
        const target = event.target;
        if (target) {
            this.showBeacons = target.checked;
            // Update showAirwaypoints based on showAirways and showBeacons
            this.updateAirwaypointsVisibility();
            this.renderMap();
        }
    }
    updateAirwaypointsVisibility() {
        // Update showAirwaypoints based on showAirways and showBeacons
        this.showAirwaypoints = this.showAirways && !this.showBeacons;
    }
};
exports.MapElement = MapElement;
MapElement.styles = (0, lit_1.css) `
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
tslib_1.__decorate([
    (0, decorators_js_1.property)({ type: Number }),
    tslib_1.__metadata("design:type", Object)
], MapElement.prototype, "width", void 0);
tslib_1.__decorate([
    (0, decorators_js_1.property)({ type: Number }),
    tslib_1.__metadata("design:type", Object)
], MapElement.prototype, "height", void 0);
tslib_1.__decorate([
    (0, decorators_js_1.property)({ type: Array }),
    tslib_1.__metadata("design:type", Array)
], MapElement.prototype, "flights", void 0);
exports.MapElement = MapElement = tslib_1.__decorate([
    (0, decorators_js_1.customElement)('ats-simulator-map'),
    tslib_1.__metadata("design:paramtypes", [])
], MapElement);
//# sourceMappingURL=simulator-map.js.map