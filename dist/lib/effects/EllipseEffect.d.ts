import { Effect } from "./Effect";
import { EllipseNode } from "../shapes/EllipseNode";
import { Expression } from "../Expression";
import { Scope } from "../structural/Scope";
import { Dimensions } from "../structural/Dimensions";
export declare class EllipseEffect implements Effect<EllipseNode> {
    private _circle;
    private _dims;
    private _ast;
    private _ctx;
    private _canvas;
    private _corner;
    private _selected;
    private _myState;
    private _mouse;
    constructor(circle: EllipseNode);
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void;
    contains(mx: number, my: number): boolean;
    guideContains(mx: number, my: number): number;
    drawGuides(x: number, y: number, w: number, h: number, corner: number): void;
    drawSquare(x: number, y: number, w: number, h: number, color: string): void;
    onMouseMove(event: any): void;
    onMouseDown(event: any): void;
    onMouseUp(event: any): void;
    ast(): Expression<EllipseNode>;
    logPaint(): string;
    updateAST(): Expression<EllipseNode>;
    readonly x: number;
    readonly y: number;
    readonly dims: Dimensions;
}
