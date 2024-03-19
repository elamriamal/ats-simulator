import '@ats/simulator-map';
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import geojson from './sectors.json';
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
    fetch('http://racemusaircrafttrafficgenerator.d0e6fvepbddreqau.francecentral.azurecontainer.io:8080/send')
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
        }
        // Check if the content type is JSON
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          return response.json(); // Parse response as JSON
        } else {
          return response.text(); // Read response as text
        }
      })
      .then(data => {
        // Process the data
        console.log('Received data:', data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }
  override connectedCallback(): void {
    super.connectedCallback();
    // this.startSendingData();
  }

  override render() {
    return html`
      <section style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; font-size: 1vmin;">
        <ats-simulator-map .geojson=${geojson} .flights=${this.flights?.aircrafts}></ats-simulator-map>
      </section>
    `;
  }
}

