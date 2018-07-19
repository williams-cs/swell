import { Effect } from "./Effect";
import { StringNode } from "../prims/StringNode";
import { Expression } from "../Expression";
import { Scope } from "../structural/Scope";
export declare class StringEffect implements Effect<StringNode> {
    private _ctx;
    private _canvas;
    private _str;
    private _fontSize;
    private _x;
    private _y;
    private _w;
    private _h;
    private _corner;
    private _selected;
    private _myState;
    private _mouse;
    constructor(str: StringNode);
    draw(context: Scope, x: number, y: number): void;
    contains(mx: number, my: number): boolean;
    guideContains(mx: number, my: number): number;
    drawTextGuides(x: number, y: number, w: number, h: number, corner: number): void;
    drawSquare(x: number, y: number, w: number, h: number, color: string): void;
    onMouseMove(event: any): void;
    onMouseDown(event: any): void;
    ast(): Expression<StringNode>;
    updateAST(): Expression<StringNode>;
    canvas: HTMLCanvasElement;
}
