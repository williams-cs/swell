import { Expression, Scope, BooleanNode } from "../..";
export declare class Not implements Expression<BooleanNode> {
    private _expr;
    constructor(expr: Expression<any>);
    eval(context: Scope): BooleanNode;
    draw(): void;
    readonly expr: Expression<any>;
}
