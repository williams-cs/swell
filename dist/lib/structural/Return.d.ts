import { Expression, Scope } from "../..";
export declare class Return implements Expression<any> {
    private _expr;
    constructor(expr: Expression<any>);
    eval(context: Scope): void;
    draw(context: Scope, x: number, y: number): void;
}
