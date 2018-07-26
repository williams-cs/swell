import { BinaryOperation } from './BinaryOperation';
import { Expression } from '../Expression';
import { Scope } from '../structural/Scope';
import { NumberNode } from '../prims/NumberNode';
import { Dimensions } from '../structural/Dimensions';
export declare class DivOp extends BinaryOperation<NumberNode> {
    constructor(left: Expression<NumberNode>, right: Expression<NumberNode>);
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void;
    eval(context: Scope): NumberNode;
    toString(): string;
    newLine(): boolean;
}
