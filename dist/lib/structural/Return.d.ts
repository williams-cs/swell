import { Expression } from "../Expression";
import { Scope } from "./Scope";
import { Dimensions } from "./Dimensions";
export declare class Return implements Expression<any> {
    private _expr;
    constructor(expr: Expression<any>);
    eval(context: Scope): void;
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void;
}
