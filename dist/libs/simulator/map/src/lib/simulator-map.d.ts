import { LitElement, SVGTemplateResult } from 'lit';
export declare class MapElement extends LitElement {
    width: number;
    height: number;
    flights: any[];
    private geojson;
    private svg;
    private g;
    private zoom;
    static styles: import("lit").CSSResult;
    render(): SVGTemplateResult;
    firstUpdated(): void;
    private renderMap;
    zoomIn(): void;
    zoomOut(): void;
}
