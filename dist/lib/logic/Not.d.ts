import { Expression } from "../Expression";
import { Scope } from '../structural/Scope';
import { BooleanNode } from "../prims/BooleanNode";
export declare class Not implements Expression<BooleanNode> {
    private _expr;
    private _newLine;
    constructor(expr: Expression<any>);
    toString(): string;
    newLine(): boolean;
    eval(context: Scope): BooleanNode;
    equalsVal(right: Expression<any>): boolean;
    draw(): void;
    readonly expr: Expression<any>;
}
