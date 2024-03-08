import { LitElement, css, html, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GeoJSON2SVG } from 'geojson2svg';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';

@customElement('ats-simulator-map')
export class MapElement extends LitElement {  
  @property({ type: Object })
  private geojson: any;
  private svgStrings: string[] = [];

  static override styles = css`
    svg {
      background-color: #464646;
    }
  `;

  override connectedCallback(): void {
    super.connectedCallback();
    this.convertGeojsonToSvg();
  }

  private convertGeojsonToSvg(): void {
    const options = {
      viewportSize: {width: 1000, height: 1000},
    };
    const converter = new GeoJSON2SVG(options);
    this.svgStrings = converter.convert(this.geojson, options);
  }

  override render() {
    return html`
      <svg style="width: 100%; height: 100%;" baseprofile="tiny" fill="#3d3d3d" width="1000" height="1000" viewbox="0 0 1000 1000" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width=".1" version="1.2" xmlns="http://www.w3.org/2000/svg">
        ${this.svgStrings.map(svgString => svg`
          ${unsafeSVG(svgString)}
        `)}
      </svg>
    `;
  }
}

