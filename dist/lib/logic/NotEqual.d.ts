import { Expression } from "../Expression";
import { Scope } from '../structural/Scope';
import { BooleanNode } from "../prims/BooleanNode";
export declare class NotEqual implements Expression<BooleanNode> {
    private _left;
    private _right;
    private _newLine;
    constructor(left: Expression<any>, right: Expression<any>);
    toString(): string;
    newLine(): boolean;
    eval(context: Scope): BooleanNode;
    equalsVal(right: Expression<any>): boolean;
    draw(): void;
    readonly left: Expression<any>;
    readonly right: Expression<any>;
}
