import { LitElement, css, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('ats-simulator-flight')
export class FlightElement extends LitElement {
  @property() 
  fid?: string;

  @property() 
  longitude?: number;

  @property() 
  latitude?: number;

  static override styles = css`
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

  override render() {
    const longitude = (this.longitude ?? 1) % 100;
    const direction = Math.floor((this.longitude ?? 1) / 100) % 2 ? -1 : 1;

    return html`
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
}

