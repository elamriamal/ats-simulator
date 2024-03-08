import { LitElement } from 'lit';
export declare class MapElement extends LitElement {
    private geojson;
    private svgStrings;
    static styles: import("lit").CSSResult;
    connectedCallback(): void;
    private convertGeojsonToSvg;
    render(): import("lit-html").TemplateResult<1>;
}
