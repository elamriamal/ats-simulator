"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapElement = void 0;
const tslib_1 = require("tslib");
const lit_1 = require("lit");
const d3 = require("d3");
const decorators_js_1 = require("lit/decorators.js");
let MapElement = class MapElement extends lit_1.LitElement {
    constructor() {
        super(...arguments);
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.flights = [];
    }
    render() {
        return (0, lit_1.svg) `
      <!-- Create SVG element for the map -->
      <svg width="${this.width}" height="${this.height}">
        <g></g>
      </svg>
    `;
    }
    firstUpdated() {
        this.svg = d3.select(this.shadowRoot.querySelector('svg'));
        this.g = this.svg.select('g');
        // Create a projection for the entire world map
        var projection = d3.geoMercator().scale(this.width / 6).translate([this.width / 2, this.height / 2]);
        // Create a path generator
        const path = d3.geoPath().projection(projection);
        // Add zoom behavior
        this.zoom = d3.zoom()
            .scaleExtent([1, 8]) // Set minimum and maximum zoom scale
            .on('zoom', (event) => {
            this.g.attr('transform', event.transform);
        });
        this.svg.call(this.zoom);
        // Render map with adjusted projection
        this.renderMap(path);
    }
    renderMap(path) {
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
        this.flights.forEach((flight) => {
            const foreignObject = this.g.append('foreignObject')
                .attr('x', flight.left)
                .attr('y', flight.top)
                .attr('width', 50)
                .attr('height', 35);
            const div = foreignObject.append('xhtml:div')
                .attr('xmlns', 'http://www.w3.org/1999/xhtml')
                .classed('flight-card', true);
            div.append('p').text(flight.id);
        });
    }
    // Function to zoom in
    zoomIn() {
        this.svg.transition().call(this.zoom.scaleBy, 2);
    }
    // Function to zoom out
    zoomOut() {
        this.svg.transition().call(this.zoom.scaleBy, 0.5);
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
      padding: 1px;
      border: 0.5px solid #ccc;
      border-radius: 5px;
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
    (0, decorators_js_1.customElement)('ats-simulator-map')
], MapElement);
//# sourceMappingURL=simulator-map.js.map