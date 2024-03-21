"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapElement = void 0;
const tslib_1 = require("tslib");
const lit_1 = require("lit");
const d3 = require("d3");
const decorators_js_1 = require("lit/decorators.js");
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
    }
    updated(changedProperties) {
        super.updated(changedProperties);
        const center = [35, 40]; // Approximate center of the map
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
    render() {
        return (0, lit_1.svg) `
      <!-- Create SVG element for the map -->
      <svg width="${this.width * 10}" height="${this.height * 10}">
        <g></g>
      </svg>
      <!-- Tooltip -->
      <div class="tooltip" style="display: none;"></div>
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
        // Render beacons
        (0, beacons_1.default)(this.g, this.beacons, this.path);
        // Render airports
        (0, airports_1.default)(this.g, this.airports, this.path);
        // Render Airwaypoints
        (0, airwaypoints_1.default)(this.g, this.airwaypoints, this.path);
        // Render airways
        (0, airways_1.default)(this.g, this.airways, this.path);
        // Render flights
        (0, flights_1.default)(this.g, this.flights, this.projection, this.tooltip);
    }
};
exports.MapElement = MapElement;
MapElement.styles = (0, lit_1.css) `
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