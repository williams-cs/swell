import { Expression } from "../Expression";
import { Scope } from '../structural/Scope';
import { Dimensions } from "../structural/Dimensions";
export declare class BooleanNode implements Expression<BooleanNode> {
    private _val;
    private _newLine;
    private _ws;
    /**
     * Constructor for BooleanNode, a node representing a boolean
     * @param val The boolean value of the BooleanNode
     * @param ws Preceding white space
     */
    constructor(val: boolean, ws?: string);
    /**
     * Returns the BooleanNode
     * @param context The current program context
     */
    eval(context: Scope): BooleanNode;
    /**
     * BooleanNodes cannot be drawn directly
     * @param context
     * @param dims
     * @param ast
     */
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void;
    /**
     * Returns whether this BooleanNode equals another
     * @param right The right side of the equality
     */
    equalsVal(right: Expression<any>): boolean;
    /**
     * Returns a string representation of the BooleanNode
     */
    toString(): string;
    /**
     * Returns the boolean value
     */
    /**
    * Sets the boolean value
    */
    val: boolean;
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine(): boolean;
}
