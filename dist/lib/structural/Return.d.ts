import { Expression } from "../Expression";
import { Scope } from "./Scope";
import { Dimensions } from "./Dimensions";
export declare class Return implements Expression<any> {
    private _expr;
    private _newLine;
    constructor(expr: Expression<any>);
    eval(context: Scope): void;
    toString(): string;
    newLine(): boolean;
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void;
}
