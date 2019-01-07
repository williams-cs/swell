import { BinaryOperation } from './BinaryOperation';
import { Expression } from '../Expression';
import { Scope } from '../structural/Scope';
import { NumberNode } from '../prims/NumberNode';
import { Dimensions } from '../structural/Dimensions';
export declare class DivOp extends BinaryOperation<NumberNode> {
    private _ws;
    /**
     * Constructor for the division operation
     * @param left The dividend
     * @param right The divisor
     * @param ws Preceding whitespace
     */
    constructor(left: Expression<NumberNode>, right: Expression<NumberNode>, ws?: string);
    /**
     * Performs the division and evaluates into a single NumberNode
     * @param context The current program context
     */
    eval(context: Scope): NumberNode;
    /**
     * Division ops can't be directly drawn
     * @param context
     * @param dims
     * @param ast
     */
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void;
    /**
     * Equals can't be called directly on a division op
     * @param right
     */
    equalsVal(right: Expression<any>): boolean;
    /**
     * Returns a string representation of the division
     */
    toString(): string;
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine(): boolean;
}
