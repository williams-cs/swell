import { Expression } from '../Expression';
import { Scope } from '../structural/Scope';
import { Dimensions } from '../structural/Dimensions';
export declare class NumberNode implements Expression<NumberNode> {
    private _val;
    private _newLine;
    private _ws;
    /**
     * Constructor for a NumberNode, a node representing a number
     * @param val The number value
     * @param ws Preceding whitespace
     */
    constructor(val: number, ws?: string);
    /**
     * Returns this NumberNode
     * @param context The current program context
     */
    eval(context: Scope): NumberNode;
    /**
     * NumberNodes cannot be drawn directly
     * @param context
     * @param dims
     * @param ast
     */
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void;
    /**
     * Returns whether this NumberNode equals another NumberNode
     * @param right The right side of the equality (must be a NumberNode)
     */
    equalsVal(right: Expression<any>): boolean;
    /**
     * Returns a string representation of the NumberNode
     */
    toString(): string;
    /**
     * Returns the number stored in the node
     */
    /**
    * Sets the value of the number stored in the node
    */
    val: number;
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine(): boolean;
}
