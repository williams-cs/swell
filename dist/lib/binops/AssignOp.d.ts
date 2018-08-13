import { BinaryOperation } from './BinaryOperation';
import { Expression } from '../Expression';
import { Scope } from '../structural/Scope';
import { Dimensions } from '../structural/Dimensions';
export declare class AssignOp<T> extends BinaryOperation<T> {
    private _ws;
    /**
     * Constructor for an assignment operation
     * @param left The left side of the assignment (the var)
     * @param right The right side of the assignment (the value)
     * @param ws Preceding whitespace
     */
    constructor(left: Expression<T>, right: Expression<T>, ws?: string);
    /**
     * Evaluates assign op by assigning value to var
     * @param context The current context
     */
    eval(context: Scope): T;
    /**
     * Returns a string representation of the AssignOp
     */
    toString(): string;
    /**
     * AssignOps can't be drawn directly
     * @param context
     * @param dims
     * @param ast
     */
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void;
    /**
     * Equals can't be called directly on AssignOp
     * @param right
     */
    equalsVal(right: Expression<any>): boolean;
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine(): boolean;
}
