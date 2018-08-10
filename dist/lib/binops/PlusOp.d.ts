import { BinaryOperation } from './BinaryOperation';
import { Expression } from '../Expression';
import { Scope } from '../structural/Scope';
import { NumberNode } from '../prims/NumberNode';
import { Dimensions } from '../structural/Dimensions';
export declare class PlusOp extends BinaryOperation<NumberNode> {
    private _ws;
    constructor(left: Expression<NumberNode>, right: Expression<NumberNode>, ws?: string);
    eval(context: Scope): NumberNode;
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void;
    equalsVal(right: Expression<any>): boolean;
    toString(): string;
    newLine(): boolean;
}
