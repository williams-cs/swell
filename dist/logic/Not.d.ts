import { Expression, Scope } from "../..";
import { BooleanNode } from "../prims/BooleanNode";
export declare class Not implements Expression<BooleanNode> {
    private _expr;
    constructor(expr: Expression<any>);
    eval(context: Scope): BooleanNode;
    draw(): void;
    readonly expr: Expression<any>;
}
