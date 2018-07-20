import { Effect } from "./Effect";
import { EllipseNode } from "../shapes/EllipseNode";
import { Expression } from "../Expression";
import { Scope } from "../structural/Scope";
import { Dimensions } from "../structural/Dimensions";
export declare class EllipseEffect implements Effect<EllipseNode> {
    private _circle;
    private _dims;
    private _x;
    private _y;
    private _radius;
    private _ctx;
    private _canvas;
    private _corner;
    private _selected;
    private _myState;
    private _mouse;
    constructor(circle: EllipseNode);
    draw(context: Scope, x: number, y: number, dims: Dimensions): void;
    contains(mx: number, my: number): boolean;
    guideContains(mx: number, my: number): number;
    drawGuides(x: number, y: number, w: number, h: number, corner: number): void;
    drawSquare(x: number, y: number, w: number, h: number, color: string): void;
    onMouseMove(event: any): void;
    onMouseDown(event: any): void;
    onMouseUp(event: any): void;
    ast(): Expression<EllipseNode>;
    updateAST(): Expression<EllipseNode>;
    x(): number;
    y(): number;
}
