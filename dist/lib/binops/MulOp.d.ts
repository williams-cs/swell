import { BinaryOperation } from './BinaryOperation';
import { Expression } from '../Expression';
import { Scope } from '../structural/Scope';
import { NumberNode } from '../prims/NumberNode';
import { Dimensions } from '../structural/Dimensions';
export declare class MulOp extends BinaryOperation<NumberNode> {
    constructor(left: Expression<NumberNode>, right: Expression<NumberNode>);
    eval(context: Scope): NumberNode;
    toString(): string;
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void;
    equalsVal(right: Expression<any>): boolean;
    newLine(): boolean;
}
