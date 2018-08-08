import { Expression } from "../Expression";
import { Scope } from "./Scope";
import { Dimensions } from "./Dimensions";
export declare class Return implements Expression<any> {
    private _expr;
    private _newLine;
    private _ws;
    constructor(expr: Expression<any>, ws?: string);
    eval(context: Scope): void;
    equalsVal(right: Expression<any>): boolean;
    toString(): string;
    newLine(): boolean;
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void;
}
