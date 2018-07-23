import { UnaryOperation } from './UnaryOperation';
import { Expression } from '../Expression';
import { Scope } from '../structural/Scope';
import { NumberNode } from '../prims/NumberNode';
export declare class NegOp extends UnaryOperation<NumberNode> {
    constructor(val: Expression<NumberNode>);
    draw(context: Scope, x: number, y: number): void;
    eval(context: Scope): NumberNode;
}
