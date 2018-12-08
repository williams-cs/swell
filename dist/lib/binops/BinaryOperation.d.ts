import { Scope } from '../structural/Scope';
import { Expression } from '../Expression';
import { Dimensions } from '../structural/Dimensions';
export declare abstract class BinaryOperation<T> implements Expression<T> {
    private _left;
    private _right;
    private _newLine;
    /**
     * Constructor for the BinOp abstract class
     * @param _left The left side of the binary operation
     * @param _right The right side of the binary operation
     */
    constructor(_left: Expression<T>, _right: Expression<T>);
    abstract eval(context: Scope): T;
    /**
     * Draws the binary operation, if applicable
     * @param context The current program context
     * @param dims The dimensions
     * @param ast The AST
     */
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void;
    /**
     * Checks if equal to another expression
     * @param right The right side of the equality
     */
    equalsVal(right: Expression<any>): boolean;
    /**
     * Returns a string representation of the binary operation
     */
    toString(): string;
    /**
     * Gets left side of the binary operation
     */
    /**
    * Sets left side of the binary operation
    */
    left: Expression<T>;
    /**
     * Gets right side of the binary operation
     */
    /**
    * Sets right side of the binary operation
    */
    right: Expression<T>;
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine(): boolean;
}
