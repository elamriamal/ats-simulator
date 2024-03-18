import { simulatorEngine } from '@ats/simulator-engine';
import '@ats/simulator-flight';
import '@ats/simulator-map';
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { geojson, flights } from './data';
import geoJSONData from './sectors.json';

@customElement('ats-simulator')
export class MyElement extends LitElement {
  private flights = flights;
  private speed = 250;
  private interval: any = 0;

  override connectedCallback(): void {
    super.connectedCallback();
    // this.loadDigipair();
    console.log(geoJSONData);
    
  }

  private loadDigipair(): void {
    import('' + 'https://chatbot.digipair.ai/index.js');

    this.addEventListener('simulator-start', () => {
      this.startEngine();
    });

    this.addEventListener('simulator-stop', () => {
      this.stopEngine();
    });

    this.addEventListener('simulator-set', ({ detail }: any) => {
      this.stopEngine();
      this.flights = detail;
      this.requestUpdate();
    });
  }

  private startEngine(): void {
    this.interval = setInterval(() => {
      simulatorEngine(this.flights);
      this.requestUpdate();
    }, this.speed);
  }

  private stopEngine(): void {
    if (!this.interval)
      return;

    clearInterval(this.interval);
    this.interval = 0;
  }

  override render() {
    return html`
      <section style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; font-size: 1vmin;">
        <ats-simulator-map .geojson=${geoJSONData} .flights=${this.flights}></ats-simulator-map>
      </section>
    `;
  }
}

