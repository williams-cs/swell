import { Expression } from '../Expression';
import { Scope } from '../structural/Scope';
import { NumberNode } from '../prims/NumberNode';
import { Dimensions } from '../structural/Dimensions';
export declare class Increment implements Expression<any> {
    private innerRep;
    private expr;
    private _ws;
    /**
     * Constructor for Increment
     * @param variable The expression to increment
     * @param ws Tracks preceding whitespace
     */
    constructor(variable: Expression<any>, ws?: string);
    /**
     * Evaluates increment into a number node
     * @param context The function scope
     */
    eval(context: Scope): NumberNode;
    /**
     * Increments cannot be drawn
     * @param context
     * @param dims
     * @param ast
     */
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void;
    /**
     * Cannot call equals directly on binops
     * @param right
     */
    equalsVal(right: Expression<any>): boolean;
    /**
     * Returns a string representation of the increment expression
     */
    toString(): string;
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine(): boolean;
}
