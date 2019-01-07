import { Expression } from '../Expression';
import { Scope } from '../structural/Scope';
import { Dimensions } from '../structural/Dimensions';
export declare abstract class UnaryOperation<T> implements Expression<T> {
    private _val;
    private _newLine;
    /**
     * Abstract class constructor for Unary Operations
     * @param _val The object to be operated on
     */
    constructor(_val: Expression<T>);
    /**
     * Abstract eval method for UnaryOps
     * @param context The current program context
     */
    abstract eval(context?: Scope): T;
    /**
     * Abstract draw method for undrawable UnaryOps
     * @param context
     * @param dims
     * @param ast
     */
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void;
    /**
     * Equals cannot be called directly on UnaryOps
     * @param right
     */
    equalsVal(right: Expression<any>): boolean;
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine(): boolean;
    /**
     * Returns the UnaryOp value
     */
    /**
    * Sets the UnaryOp value
    */
    val: Expression<T>;
}
