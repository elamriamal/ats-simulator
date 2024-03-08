"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapElement = void 0;
const tslib_1 = require("tslib");
const lit_1 = require("lit");
const decorators_js_1 = require("lit/decorators.js");
const geojson2svg_1 = require("geojson2svg");
const unsafe_svg_js_1 = require("lit/directives/unsafe-svg.js");
let MapElement = class MapElement extends lit_1.LitElement {
    constructor() {
        super(...arguments);
        this.svgStrings = [];
    }
    connectedCallback() {
        super.connectedCallback();
        this.convertGeojsonToSvg();
    }
    convertGeojsonToSvg() {
        const options = {
            viewportSize: { width: 1000, height: 1000 },
        };
        const converter = new geojson2svg_1.GeoJSON2SVG(options);
        this.svgStrings = converter.convert(this.geojson, options);
    }
    render() {
        return (0, lit_1.html) `
      <svg style="width: 100%; height: 100%;" baseprofile="tiny" fill="#3d3d3d" width="1000" height="1000" viewbox="0 0 1000 1000" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width=".1" version="1.2" xmlns="http://www.w3.org/2000/svg">
        ${this.svgStrings.map(svgString => (0, lit_1.svg) `
          ${(0, unsafe_svg_js_1.unsafeSVG)(svgString)}
        `)}
      </svg>
    `;
    }
};
exports.MapElement = MapElement;
MapElement.styles = (0, lit_1.css) `
    svg {
      background-color: #464646;
    }
  `;
tslib_1.__decorate([
    (0, decorators_js_1.property)({ type: Object }),
    tslib_1.__metadata("design:type", Object)
], MapElement.prototype, "geojson", void 0);
exports.MapElement = MapElement = tslib_1.__decorate([
    (0, decorators_js_1.customElement)('ats-simulator-map')
], MapElement);
//# sourceMappingURL=simulator-map.js.map