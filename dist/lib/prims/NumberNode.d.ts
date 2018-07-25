import { Expression } from '../Expression';
import { Scope } from '../structural/Scope';
import { Dimensions } from '../structural/Dimensions';
export declare class NumberNode implements Expression<NumberNode> {
    private _val;
    constructor(val: number);
    eval(context: Scope): NumberNode;
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void;
    toString(): string;
    val: number;
}
