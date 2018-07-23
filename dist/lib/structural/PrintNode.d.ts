import { Expression } from "../Expression";
import { Scope } from "./Scope";
import { Dimensions } from "./Dimensions";
export declare class PrintNode implements Expression<any> {
    private _toPrint;
    private _scale;
    private _dims;
    constructor(toPrint: Expression<any>, dimensions?: Dimensions);
    draw(context: Scope, dims: Dimensions, ast: PrintNode): void;
    eval(context: Scope): any;
    readonly toPrint: Expression<any>;
    readonly dims: Dimensions;
}
