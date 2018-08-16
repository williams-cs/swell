import { Scope } from './structural/Scope';
import { Dimensions } from './structural/Dimensions';
/**
 * Expressions are one of the main building blocks of the AST.
 * Whether a logical or mathematical statement, Expressions generally evaluate to a primitive.
 */
export interface Expression<T> {
    /**
     * Interface evaluation method for Expressions
     * @param context The current program context
     */
    eval(context: Scope): T;
    /**
     * Interface draw method for Expressions
     * @param context The current program context
     * @param dims Dimensions of the object to be drawn
     * @param ast The program AST
     */
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void;
    /**
     * Interface method to return a string representation of the Expression
     */
    toString(): string;
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine(): boolean;
    /**
     * Returns whether the Expression equals another Expression
     * @param right The right side of the equality
     */
    equalsVal(right: Expression<any>): boolean;
}
