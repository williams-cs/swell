import { Expression, Scope } from "..";
export declare class Not implements Expression<any> {
    private _expr;
    constructor(expr: Expression<any>);
    eval(context: Scope): boolean;
    draw(): void;
    readonly expr: Expression<any>;
}
