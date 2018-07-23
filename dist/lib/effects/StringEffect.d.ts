import { Effect } from "./Effect";
import { StringNode } from "../prims/StringNode";
import { Expression } from "../Expression";
import { Scope } from "../structural/Scope";
import { Dimensions } from "../structural/Dimensions";
import { PrintNode } from "../structural/PrintNode";
export declare class StringEffect implements Effect<StringNode> {
    private _ast;
    private _context;
    private _ctx;
    private _canvas;
    private _str;
    private _dims;
    private _fontSize;
    private _w;
    private _h;
    private _x1;
    private _y1;
    private _corner;
    private _selected;
    private _myState;
    private _mouse;
    constructor(str: StringNode);
    draw(context: Scope, dims: Dimensions, ast: PrintNode): void;
    contains(mx: number, my: number): boolean;
    guideContains(mx: number, my: number): number;
    drawTextGuides(x: number, y: number, w: number, h: number, corner: number): void;
    drawSquare(x: number, y: number, w: number, h: number, color: string): void;
    onMouseMove(event: any): void;
    onMouseDown(event: any): void;
    onMouseUp(event: any): void;
    logPaint(): string;
    logMove(): string;
    ast(): Expression<StringNode>;
    updateAST(): Expression<StringNode>;
    canvas: HTMLCanvasElement;
    readonly x: number;
    readonly y: number;
    readonly dims: Dimensions;
}
