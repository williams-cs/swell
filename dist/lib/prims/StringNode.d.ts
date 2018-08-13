import { Expression } from '../Expression';
import { Scope } from '../structural/Scope';
import { Dimensions } from '../structural/Dimensions';
export declare class StringNode implements Expression<StringNode> {
    private _str;
    private _newLine;
    private _ws;
    /**
     * Constructor for a StringNode, a node representing a string
     * @param str The string stored in the node
     * @param ws Preceding whitespace
     */
    constructor(str: string, ws?: string);
    /**
     * Returns this StringNode
     * @param context The current program context
     */
    eval(context: Scope): StringNode;
    /**
     * Draws the String using StringEffect
     * @param context The current program context
     * @param dims The dimensions of the string to be drawn
     * @param ast The program AST
     */
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void;
    /**
     * Returns whether this StringNode equals another StringNode
     * @param right The right side of the equality, must be a StringNode
     */
    equalsVal(right: Expression<any>): boolean;
    /**
     * Returns a string representation of the StringNode
     */
    toString(): string;
    /**
     * Sets the string stored in the node
     */
    str: string;
    /**
     * Returns the string stored in the node
     */
    readonly val: string;
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine(): boolean;
}
