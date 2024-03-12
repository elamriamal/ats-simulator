import { LitElement, SVGTemplateResult } from 'lit';
export declare class MapElement extends LitElement {
    width: number;
    height: number;
    private geojson;
    static override: import("lit").CSSResult;
    render(): SVGTemplateResult;
    firstUpdated(): void;
}
