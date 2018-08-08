import { Expression } from '../Expression';
import { Scope } from '../structural/Scope';
import { Dimensions } from '../structural/Dimensions';
export declare class NumberNode implements Expression<NumberNode> {
    private _val;
    private _newLine;
    private _ws;
    constructor(val: number);
    eval(context: Scope): NumberNode;
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void;
    equalsVal(right: Expression<any>): boolean;
    toString(): string;
    val: number;
    newLine(): boolean;
}
