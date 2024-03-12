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
    }
    render() {
        return (0, lit_1.svg) `
      <!-- Create SVG element for the map -->
      <svg width="${this.width}" height="${this.height}"></svg>
    `;
    }
    firstUpdated() {
        // Create a projection for the map
        const projection = d3.geoMercator()
            .center([0, 0])
            .scale(this.width / 2 / Math.PI) // scale to fit the map to the screen
            .translate([this.width / 2, this.height / 2]);
        // Create a path generator
        const path = d3.geoPath().projection(projection);
        // Select the SVG element
        const svg = this.shadowRoot.querySelector('svg');
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
};
exports.MapElement = MapElement;
MapElement.override = (0, lit_1.css) `
    svg {
      background-color: #f0f0f0;
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
exports.MapElement = MapElement = tslib_1.__decorate([
    (0, decorators_js_1.customElement)('ats-simulator-map')
], MapElement);
//# sourceMappingURL=simulator-map.js.map