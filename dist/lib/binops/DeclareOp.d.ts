import { BinaryOperation } from './BinaryOperation';
import { Expression } from '../Expression';
import { Scope } from '../structural/Scope';
import { Dimensions } from '../structural/Dimensions';
export declare class DeclareOp<T> extends BinaryOperation<T> {
    private _ws;
    /**
     * Constructor for the declare operation, which declares a variable for the first time
     * @param left The left side of the declare op (the variable)
     * @param right The right side of the op (the value)
     * @param ws Preceding whitespace
     */
    constructor(left: Expression<T>, right: Expression<T>, ws?: string);
    /**
     * Evaluates the declaration by declaring the variable in the context and assigning the value
     * @param context The current program context
     */
    eval(context: Scope): T;
    /**
     * Returns a string representation of the declare op
     */
    toString(): string;
    /**
     * DeclareOps cannot be drawn directly
     * @param context
     * @param dims
     * @param ast
     */
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void;
    /**
     * Equals can't be called direcly on a DeclareOp
     * @param right
     */
    equalsVal(right: Expression<any>): boolean;
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine(): boolean;
}
