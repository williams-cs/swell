import { BinaryOperation } from './BinaryOperation';
import { Expression } from '../Expression';
import { Scope } from '../structural/Scope';
import { NumberNode } from '../prims/NumberNode';
import { Dimensions } from '../structural/Dimensions';
export declare class MulOp extends BinaryOperation<NumberNode> {
    private _ws;
    /**
     * Constructor for the multiplication operation
     * @param left The multiplicand
     * @param right The multiplier
     * @param ws Preceding whitespace
     */
    constructor(left: Expression<NumberNode>, right: Expression<NumberNode>, ws?: string);
    /**
     * Performs the multiplication and returns a single NumberNode
     * @param context The current program context
     */
    eval(context: Scope): NumberNode;
    /**
     * Returns a string representation of the multiplication op
     */
    toString(): string;
    /**
     * Multiplication ops cannot be directly drawn
     * @param context
     * @param dims
     * @param ast
     */
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void;
    /**
     * Equals cannot be called directly on a multiplicaiton operation
     * @param right
     */
    equalsVal(right: Expression<any>): boolean;
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine(): boolean;
}
