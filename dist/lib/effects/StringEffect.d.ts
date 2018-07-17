import { Effect } from "./Effect";
import { StringNode } from "../prims/StringNode";
import { Expression } from "../Expression";
import { Scope } from "../structural/Scope";
export declare class StringEffect implements Effect<StringNode> {
    private _str;
    private _ctx;
    private _canvas;
    private _fontSize;
    private _w;
    private _h;
    protected mouse: {
        x: number;
        y: number;
    };
    constructor(str: StringNode);
    draw(context: Scope, x: number, y: number): void;
    onMouseMove(event: any): void;
    ast(): Expression<StringNode>;
    updateAST(): Expression<StringNode>;
    canvas: HTMLCanvasElement;
    drawTextGuides(x: number, y: number, w: number, h: number, corner: number): void;
    drawSquare(x: number, y: number, w: number, h: number, color: string): void;
}
