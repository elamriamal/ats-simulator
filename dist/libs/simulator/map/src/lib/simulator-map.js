"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapElement = void 0;
const tslib_1 = require("tslib");
const lit_1 = require("lit");
const d3 = require("d3");
const decorators_js_1 = require("lit/decorators.js");
const utils_1 = require("./utils");
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
            this.renderMap(this.path);
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
            .scaleExtent([1, 8]) // Set minimum and maximum zoom scale
            .on('zoom', (event) => {
            // Update the transform attribute of the <g> element
            this.g.attr('transform', event.transform);
        });
        this.svg.call(this.zoom);
        // Render map with adjusted projection
        this.renderMap(this.path);
    }
    renderMap(path) {
        var _a;
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
        (_a = this.flights) === null || _a === void 0 ? void 0 : _a.forEach((flight) => {
            var _a, _b;
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
                .attr('height', 50);
            const div = foreignObject.append('xhtml:div')
                .attr('xmlns', 'http://www.w3.org/1999/xhtml')
                .classed('flight-card', true);
            div.append('p').html(`${flight === null || flight === void 0 ? void 0 : flight.aircraftId} <br> ${Math.floor((_a = flight === null || flight === void 0 ? void 0 : flight.position) === null || _a === void 0 ? void 0 : _a.cas)} - ${Math.floor((_b = flight === null || flight === void 0 ? void 0 : flight.position) === null || _b === void 0 ? void 0 : _b.hdg)}`);
            // Add tooltip interaction for flights
            foreignObject.select('.plane').on('mouseover', (event) => {
                var _a, _b, _c;
                const flightData = `${flight === null || flight === void 0 ? void 0 : flight.aircraftId}<br>${Math.floor((_a = flight === null || flight === void 0 ? void 0 : flight.position) === null || _a === void 0 ? void 0 : _a.cas)} - ${Math.floor((_b = flight === null || flight === void 0 ? void 0 : flight.position) === null || _b === void 0 ? void 0 : _b.hdg)}<br>${(_c = (0, utils_1.generateRandomData)()) === null || _c === void 0 ? void 0 : _c.metadata}`;
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
};
exports.MapElement = MapElement;
MapElement.styles = (0, lit_1.css) `
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