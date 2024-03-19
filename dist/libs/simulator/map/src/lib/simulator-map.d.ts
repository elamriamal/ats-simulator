import { LitElement, SVGTemplateResult, PropertyValueMap } from 'lit';
export declare class MapElement extends LitElement {
    width: number;
    height: number;
    flights: any[];
    constructor();
    private geojson;
    private svg;
    private g;
    private zoom;
    private tooltip;
    private projection;
    private path;
    updated(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void;
    static styles: import("lit").CSSResult;
    render(): SVGTemplateResult;
    firstUpdated(): void;
    private renderMap;
}
