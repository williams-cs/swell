import { Expression } from "../Expression";
import { Scope } from "./Scope";
import { Dimensions } from "./Dimensions";
import { NumberNode } from "../prims/NumberNode";
export declare class PrintNode implements Expression<any> {
    private _x;
    private _y;
    private _toPrint;
    private _scale;
    private _dims;
    constructor(toPrint: Expression<any>, dimensions?: Dimensions);
    draw(context: Scope, dims: Dimensions, ast: PrintNode): void;
    eval(context: Scope): any;
    x: Expression<NumberNode>;
    y: Expression<NumberNode>;
    readonly toPrint: Expression<any>;
    readonly dims: Dimensions;
}
