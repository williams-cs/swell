import { Expression, Scope, BooleanNode } from "../..";
export declare class GreaterThan implements Expression<BooleanNode> {
    private _left;
    private _right;
    constructor(left: Expression<any>, right: Expression<any>);
    eval(context: Scope): BooleanNode;
    draw(): void;
    readonly left: Expression<any>;
    readonly right: Expression<any>;
}
