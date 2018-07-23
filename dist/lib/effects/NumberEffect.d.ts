import { Effect } from "./Effect";
import { NumberNode } from "../prims/NumberNode";
import { Expression } from "../Expression";
import { Scope } from "../structural/Scope";
import { Dimensions } from "../structural/Dimensions";
export declare class NumberEffect implements Effect<NumberNode> {
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
    logPaint(): string;
    ast(): Expression<NumberNode>;
    updateAST(): Expression<NumberNode>;
    readonly x: number;
    readonly y: number;
    readonly dims: Dimensions;
}
