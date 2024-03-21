"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
function renderFlights(svg, flights, projection, tooltip) {
    // Render flights
    flights === null || flights === void 0 ? void 0 : flights.forEach((flight) => {
        var _a, _b;
        const foreignObjectId = `flight-foreign-object-${flight.aircraftId}`;
        const { position } = flight;
        const [x, y] = projection([position.longitude, position.latitude]); // Convert lat/long to SVG coordinates
        const foreignObject = svg.append('foreignObject')
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
            // Position the tooltip near the flight icon
            const bbox = foreignObject.node().getBoundingClientRect();
            const tooltipX = bbox.left + bbox.width - 100; // Adjust the positioning as needed
            const tooltipY = bbox.top - 28; // Adjust the positioning as needed
            tooltip.innerHTML = flightData;
            tooltip.style.left = `${tooltipX}px`;
            tooltip.style.top = `${tooltipY}px`;
            tooltip.style.display = 'block';
        })
            .on('mouseout', () => {
            tooltip.style.display = 'none';
        });
    });
}
exports.default = renderFlights;
//# sourceMappingURL=flights.js.map