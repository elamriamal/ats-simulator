import { LitElement, SVGTemplateResult, PropertyValueMap } from 'lit';
export declare class MapElement extends LitElement {
    width: number;
    height: number;
    flights: any[];
    private geojson;
    private beacons;
    private airports;
    private airwaypoints;
    private airways;
    private svg;
    private g;
    private zoom;
    private projection;
    private path;
    tooltip: any;
    private showAirways;
    private showAirports;
    private showBeacons;
    private showAirwaypoints;
    constructor();
    updated(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void;
    static styles: import("lit").CSSResult;
    render(): SVGTemplateResult;
    firstUpdated(): void;
    private renderMap;
    private toggleAirports;
    private toggleAirways;
    private toggleBeacons;
    private updateAirwaypointsVisibility;
}
