import { Expression } from '../Expression';
import { Scope } from '../structural/Scope';
import { Dimensions } from '../structural/Dimensions';
export declare class ColorNode implements Expression<string> {
    private _red;
    private _green;
    private _blue;
    private _newLine;
    /**
     * Constructor for a ColorNode, a node representing an RGB color
     */
    constructor(red: number, green: number, blue: number);
    /**
     * Evaluates into a string RGB value
     * @param context The current program context
     */
    eval(context: Scope): string;
    /**
     * ColorNodes cannot currently be drawn
     * @param context
     * @param dims
     * @param ast
     */
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void;
    /**
     * Returns whether this ColorNode equals another ColorNode
     * @param right The right side of the equality (must be a BooleanNode)
     */
    equalsVal(right: Expression<any>): boolean;
    /**
     * Returns a string representation of the ColorNode
     */
    toString(): string;
    /**
     * Returns the red value
     */
    /**
    * Sets the red value
    */
    red: number;
    /**
     * Returns the green value
     */
    /**
    * Sets the green value
    */
    green: number;
    /**
     * Returns the blue value
     */
    /**
    * Sets the blue value
    */
    blue: number;
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine(): boolean;
}
