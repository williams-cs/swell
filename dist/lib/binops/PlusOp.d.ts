import { BinaryOperation } from './BinaryOperation';
import { Expression } from '../Expression';
import { Scope } from '../structural/Scope';
import { NumberNode } from '../prims/NumberNode';
import { Dimensions } from '../structural/Dimensions';
export declare class PlusOp extends BinaryOperation<NumberNode> {
    private _ws;
    /**
     * Constructor for the addition operation
     * @param left The first addend
     * @param right The second addend
     * @param ws Preceding whitespace
     */
    constructor(left: Expression<NumberNode>, right: Expression<NumberNode>, ws?: string);
    /**
     * Performs the addition and returns a single NumberNode
     * @param context The current program context
     */
    eval(context: Scope): NumberNode;
    /**
     * Addition ops cannot be drawn directly
     * @param context
     * @param dims
     * @param ast
     */
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void;
    /**
     * Equals cannot be called directly on an addition op
     * @param right
     */
    equalsVal(right: Expression<any>): boolean;
    /**
     * Returns a string representation of the addition op
     */
    toString(): string;
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine(): boolean;
}
