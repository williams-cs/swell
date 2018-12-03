import { UnaryOperation } from './UnaryOperation';
import { Expression } from '../Expression';
import { Scope } from '../structural/Scope';
import { NumberNode } from '../prims/NumberNode';
import { Dimensions } from '../structural/Dimensions';
export declare class NegOp extends UnaryOperation<NumberNode> {
    private _ws;
    /**
     * Constructor for a NegationOperation
     * @param val The value to be negated (must be a NumberNode)
     * @param ws Preceding whitespace
     */
    constructor(val: Expression<NumberNode>, ws?: string);
    /**
     * Evaluates the value into the negative version
     * @param context The current program context
     */
    eval(context: Scope): NumberNode;
    /**
     * NegOps cannot be drawn directly
     * @param context
     * @param dims
     * @param ast
     */
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void;
    /**
     * Equals cannot be called directly on a NegOp
     * @param right
     */
    equalsVal(right: Expression<any>): boolean;
    /**
     * Returns a string representation of the NegOp
     */
    toString(): string;
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine(): boolean;
}
