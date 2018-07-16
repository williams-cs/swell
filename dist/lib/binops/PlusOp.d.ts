import { BinaryOperation, Expression, Scope, NumberNode } from '../..';
export declare class PlusOp extends BinaryOperation<NumberNode> {
    constructor(left: Expression<NumberNode>, right: Expression<NumberNode>);
    draw(context: Scope, x: number, y: number): void;
    eval(context: Scope): NumberNode;
}
