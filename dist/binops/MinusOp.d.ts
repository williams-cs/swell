import { BinaryOperation } from './BinaryOperation';
import { Expression } from '../Expression';
import { Scope } from '../structural/Scope';
import { NumberNode } from '../prims/NumberNode';
export declare class MinusOp extends BinaryOperation<NumberNode> {
    constructor(left: Expression<NumberNode>, right: Expression<NumberNode>);
    draw(context: Scope, x: number, y: number): void;
    eval(context: Scope): NumberNode;
}
