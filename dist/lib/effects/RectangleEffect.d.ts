import { Effect } from "./Effect";
import { NumberNode } from "../prims/NumberNode";
import { RectangleNode } from "../shapes/RectangleNode";
import { Expression } from "../Expression";
import { Scope } from "../structural/Scope";
import { Dimensions } from "../structural/Dimensions";
import { LogEvent } from "../logging/LogEvent";
export declare class RectangleEffect implements Effect<RectangleNode> {
    private _dims;
    private _x;
    private _y;
    private _num;
    private _str;
    private _fontSize;
    private _w;
    private _h;
    constructor(num: NumberNode);
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void;
    update(): void;
    logPaint(): LogEvent<any>;
    ast(): Expression<RectangleNode>;
    updateAST(): Expression<NumberNode>;
    readonly x: number;
    readonly y: number;
    readonly dims: Dimensions;
}
