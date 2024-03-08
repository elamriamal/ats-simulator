"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.simulatorEngine = void 0;
function simulatorEngine(flights) {
    for (const flight of flights) {
        flight.left += 10;
        // flight.top += 10;
    }
}
exports.simulatorEngine = simulatorEngine;
//# sourceMappingURL=simulator-engine.js.map