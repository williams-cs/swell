import { UnaryOperation, Expression, Scope, NumberNode } from '../..';
export declare class NegOp extends UnaryOperation<NumberNode> {
    constructor(val: Expression<NumberNode>);
    draw(context: Scope, x: number, y: number): void;
    eval(context: Scope): NumberNode;
}
