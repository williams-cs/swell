import { BinaryOperation } from './BinaryOperation';
import { Expression } from '../Expression';
import { Scope } from '../structural/Scope';
import { NumberNode } from '../prims/NumberNode';
import { Dimensions } from '../structural/Dimensions';
export declare class MinusOp extends BinaryOperation<NumberNode> {
    private _ws;
    /**
     * The constructor for the subtraction operation
     * @param left The minuend
     * @param right The subrahend
     * @param ws Preceding whitespace
     */
    constructor(left: Expression<NumberNode>, right: Expression<NumberNode>, ws?: string);
    /**
     * Performs the subtraction and evaluates to a single NumberNode
     * @param context The current program context
     */
    eval(context: Scope): NumberNode;
    /**
     * Subtraction ops can't be directly drawn
     * @param context
     * @param dims
     * @param ast
     */
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void;
    /**
     * Equals can't be called directly on subtraction
     * @param right
     */
    equalsVal(right: Expression<any>): boolean;
    /**
     * Returns a string representation of the subtraction op
     */
    toString(): string;
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine(): boolean;
}
