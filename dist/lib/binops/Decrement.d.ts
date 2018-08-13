import { Expression } from '../Expression';
import { Scope } from '../structural/Scope';
import { NumberNode } from '../prims/NumberNode';
import { Dimensions } from '../structural/Dimensions';
export declare class Decrement implements Expression<any> {
    private innerRep;
    private expr;
    private _ws;
    /**
     * Constructor for the decrement operation
     * @param variable The expression to be decremented
     * @param ws Preceding whitespace
     */
    constructor(variable: Expression<any>, ws?: string);
    /**
     * Evaluates the decrement op to a NumberNode
     * @param context The current program context
     */
    eval(context: Scope): NumberNode;
    /**
     * Returns a string representation of the decrement op
     */
    toString(): string;
    /**
     * Decrement ops can't be drawn directly
     * @param context
     * @param dims
     * @param ast
     */
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void;
    /**
     * Equals can't be called directly on decrement
     * @param right
     */
    equalsVal(right: Expression<any>): boolean;
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine(): boolean;
}
