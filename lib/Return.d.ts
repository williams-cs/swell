import { Expression } from "./Expression";
import { Scope } from "./Scope";
export declare class Return implements Expression<any> {
    private _expr;
    constructor(expr: Expression<any>);
    eval(context: Scope): void;
    draw(context: Scope): void;
}
