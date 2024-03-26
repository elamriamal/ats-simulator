import '@ats/simulator-map';
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import geojson from './geojsons/sectors.json';
import beacons from './geojsons/beacons.json';
import airports from './geojsons/airports.json';
import airwaypoints from './geojsons/airwaypoints.json';
import airways from './geojsons/airways.json';

import WebSocketService from './WebSocketService';

@customElement('ats-simulator')
export class MyElement extends LitElement {
  private webSocketService: WebSocketService;
  private flights: any;
  constructor() {
    super();
    this.webSocketService = new WebSocketService();
    this.webSocketService.onMessage(this.handleWebSocketMessage.bind(this)); // Bind the callback function
  }
  private handleWebSocketMessage(data: any) {
    this.flights = { ...JSON.parse(data) };
    // Trigger re-rendering of the component
    this.requestUpdate();
  }

  startSendingData() {
    // Start sending data via REST service
    fetch('https://racemusaircrafttrafficgenerator.azurewebsites.net/send')
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        window.alert("Backend service https://racemusaircrafttrafficgenerator.azurewebsites.net has been blocked by your firewall, please contact your IT service to whitelist the URL or connect from another network.");
      });
  }
  override connectedCallback(): void {
    super.connectedCallback();

    this.startSendingData();
  }

  override render() {
    return html`
      <section style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; font-size: 1vmin;">
        <ats-simulator-map .geojson=${geojson} .beacons=${beacons} .flights=${this.flights?.aircrafts} .airwaypoints=${airwaypoints} .airports=${airports} .airways=${airways}></ats-simulator-map>
      </section>
    `;
  }
}

