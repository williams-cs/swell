import { UnaryOperation } from './UnaryOperation';
import { Expression } from '../Expression';
import { Scope } from '../structural/Scope';
import { NumberNode } from '../prims/NumberNode';
import { Dimensions } from '../structural/Dimensions';
export declare class NegOp extends UnaryOperation<NumberNode> {
    private _ws;
    constructor(val: Expression<NumberNode>, ws?: string);
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void;
    eval(context: Scope): NumberNode;
    toString(): string;
    newLine(): boolean;
}
