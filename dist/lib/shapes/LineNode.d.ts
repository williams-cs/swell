import { Expression } from '../Expression';
import { Scope } from '../structural/Scope';
import { NumberNode } from '../prims/NumberNode';
import { Dimensions } from '../structural/Dimensions';
export declare class LineNode implements Expression<LineNode> {
    private _dx;
    private _dy;
    private _newLine;
    private _ws;
    /**
     * Constructor for a LineNode, a node representing a line
     * @param dx the run of the line
     * @param dy the rise of the line
     * @param ws Preceding whitespace
     */
    constructor(dx: Expression<NumberNode>, dy: Expression<NumberNode>, ws?: string);
    /**
     * Returns this LineNode
     * @param context The current program context
     */
    eval(context: Scope): LineNode;
    /**
     * Draws the line using LineEffect
     * @param context The current program context
     * @param dims The line dimensions
     * @param ast The program AST
     */
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void;
    /**
     * Returns whether this LineNode equals another (if their dx and dy are equal)
     * @param right The right side of the equality (must be a LineNode)
     */
    equalsVal(right: Expression<any>): boolean;
    move(): void;
    /**
     * Returns a string representation of the line
     */
    toString(): string;
    /**
     * Returns the run of the line
     */
    /**
    * Sets the run of the line
    */
    dx: Expression<NumberNode>;
    /**
     * Returns the rise of the line
     */
    /**
    * Sets the rise of the line
    */
    dy: Expression<NumberNode>;
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine(): boolean;
}
