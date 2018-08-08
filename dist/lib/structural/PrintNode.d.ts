import { Expression } from "../Expression";
import { Scope } from "./Scope";
import { Dimensions } from "./Dimensions";
export declare class PrintNode implements Expression<any> {
    private _toPrint;
    private _scale;
    private _dims;
    private _newLine;
    private _ws;
    constructor(toPrint: Expression<any>, dimensions?: Dimensions, ws?: string);
    toString(): string;
    equalsVal(right: Expression<any>): boolean;
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void;
    eval(context: Scope): any;
    readonly toPrint: Expression<any>;
    readonly dims: Dimensions;
    newLine(): boolean;
}
