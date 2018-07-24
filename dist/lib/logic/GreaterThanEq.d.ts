import { Expression } from "../Expression";
import { Scope } from '../structural/Scope';
import { BooleanNode } from "../prims/BooleanNode";
export declare class GreaterThanEq implements Expression<BooleanNode> {
    private _left;
    private _right;
    constructor(left: Expression<any>, right: Expression<any>);
    eval(context: Scope): BooleanNode;
    draw(): void;
    readonly left: Expression<any>;
    readonly right: Expression<any>;
}
