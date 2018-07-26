import { UnaryOperation } from './UnaryOperation';
import { Expression } from '../Expression';
import { Scope } from '../structural/Scope';
import { NumberNode } from '../prims/NumberNode';
import { Dimensions } from '../structural/Dimensions';
export declare class NegOp extends UnaryOperation<NumberNode> {
    constructor(val: Expression<NumberNode>);
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void;
    eval(context: Scope): NumberNode;
    toString(): string;
    newLine(): boolean;
}
