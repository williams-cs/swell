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
    private _mouse;
    constructor(str: StringNode);
    draw(context: Scope, x: number, y: number): void;
    getMousePos(canvas: any, event: any): {
        x: number;
        y: number;
    };
    onMouseMove(event: any): void;
    ast(): Expression<StringNode>;
    updateAST(): Expression<StringNode>;
    drawTextGuides(x: number, y: number, w: number, h: number, corner: number): void;
    drawSquare(x: number, y: number, w: number, h: number, color: string): void;
}
