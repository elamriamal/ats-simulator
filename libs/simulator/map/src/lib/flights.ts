import { generateRandomData } from './utils';

export default function renderFlights(svg: any, flights: any[], projection: any, tooltip: any): void {
    
    // Render flights
    flights?.forEach((flight: {
        metadata: any;
        data: any;
        aircraftId: string;
        position: {
            hdg: any;
            cas: any;
            latitude: number;
            longitude: number;
        };
    }) => {
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
            .attr('height', 50)

        const div = foreignObject.append('xhtml:div')
            .attr('xmlns', 'http://www.w3.org/1999/xhtml')
            .classed('flight-card', true);
        div.append('p').html(`${flight?.aircraftId} <br> ${Math.floor(flight?.position?.cas)} - ${Math.floor(flight?.position?.hdg)}`);

        // Add tooltip interaction for flights
        foreignObject.select('.plane').on('mouseover', (event: MouseEvent) => {
            const flightData = `${flight?.aircraftId}<br>${Math.floor(flight?.position?.cas)} - ${Math.floor(flight?.position?.hdg)}<br>${generateRandomData()?.metadata}`;
          
            // Position the tooltip near the flight icon
            const bbox = foreignObject.node().getBoundingClientRect();
            const tooltipX = bbox.left + bbox.width -100; // Adjust the positioning as needed
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
