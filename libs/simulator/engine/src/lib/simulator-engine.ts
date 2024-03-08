export function simulatorEngine(flights: any): void {
  for (const flight of flights) {
    flight.left += 10;
    // flight.top += 10;
  }
}
