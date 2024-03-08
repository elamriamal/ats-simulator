"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlightElement = void 0;
const tslib_1 = require("tslib");
const lit_1 = require("lit");
const decorators_js_1 = require("lit/decorators.js");
let FlightElement = class FlightElement extends lit_1.LitElement {
    render() {
        var _a, _b;
        const longitude = ((_a = this.longitude) !== null && _a !== void 0 ? _a : 1) % 100;
        const direction = Math.floor(((_b = this.longitude) !== null && _b !== void 0 ? _b : 1) / 100) % 2 ? -1 : 1;
        return (0, lit_1.html) `
      <section style="position: absolute; left: ${longitude * direction + (direction < 0 ? 100 : 0)}vmin; top: ${this.latitude}vmin;">
        <section class="plane">x</section>

        <div class="card">
          <div class="card-info"><strong>ID:</strong> #${this.fid}</div>
          <div class="card-info"><strong>Latitude:</strong> ${this.latitude}</div>
          <div class="card-info"><strong>Longitude:</strong> ${Math.floor(longitude * direction + (direction < 0 ? 100 : 0))}</div>
          <div class="card-info"><strong>Direction:</strong> ${direction}</div>
        </div>
      </section>
    `;
    }
};
exports.FlightElement = FlightElement;
FlightElement.styles = (0, lit_1.css) `
    .card {
      border-radius: 0.8vmin;
      padding: 1vmin;
      box-sizing: border-box;
      margin: 1vmin;
      font-size: 1vmin;
      position: absolute;
      top: -9vmin;
      left: -9vmin;
      width: 11vmin;
      z-index: 1000;
      cursor: pointer;
    }
    .card-info {
      line-height: 1;
      color: rgb(255, 255, 255);
      padding: 0.2vmin 0px;
    }
    strong {
      color: white;
    }

    .card:hover {
      background-color: rgb(255, 255, 255);
      box-shadow: rgba(0, 0, 0, 0.1) 0px 0.2vmin 0.4vmin;
      z-index: 1001;
    }
    .card:hover .card-info {
      color: rgb(102, 102, 102);
    }
    .card:hover strong {
      color: #333333;
    }

    .card-info:last-child {
        border-bottom: none;
    }

    .plane {
      color: white;
      border: 1px solid white;
      text-align: center;
      width: 1.4vmin;
    }
  `;
tslib_1.__decorate([
    (0, decorators_js_1.property)(),
    tslib_1.__metadata("design:type", String)
], FlightElement.prototype, "fid", void 0);
tslib_1.__decorate([
    (0, decorators_js_1.property)(),
    tslib_1.__metadata("design:type", Number)
], FlightElement.prototype, "longitude", void 0);
tslib_1.__decorate([
    (0, decorators_js_1.property)(),
    tslib_1.__metadata("design:type", Number)
], FlightElement.prototype, "latitude", void 0);
exports.FlightElement = FlightElement = tslib_1.__decorate([
    (0, decorators_js_1.customElement)('ats-simulator-flight')
], FlightElement);
//# sourceMappingURL=simulator-flight.js.map