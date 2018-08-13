import { Expression } from '../Expression';
import { Scope } from '../structural/Scope';
import { NumberNode } from '../prims/NumberNode';
import { Dimensions } from '../structural/Dimensions';
export declare class RectangleNode implements Expression<RectangleNode> {
    private _width;
    private _height;
    private _newLine;
    private _ws;
    /**
     * Constructor for a RectangleNode, a node representing a rectangle
     * @param width The width of the rectangle
     * @param height The height of the rectangle
     * @param ws Preceding whitespace
     */
    constructor(width: Expression<NumberNode>, height: Expression<NumberNode>, ws?: string);
    /**
     * Returns this RectangleNode
     * @param context The current program context
     */
    eval(context: Scope): RectangleNode;
    /**
     * Draws the rectangle using RectangleEffect
     * @param context The current program context
     * @param dims The rectangle dimensions
     * @param ast The program AST
     */
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void;
    /**
     * Returns whether this RectangleNode equals another (if their widths and heights are equal)
     * @param right The right side of the equality (must be a RectangleNode)
     */
    equalsVal(right: Expression<any>): boolean;
    move(): void;
    /**
     * Returns a string representation of the rectangle
     */
    toString(): string;
    /**
     * Returns the width of the rectangle
     */
    /**
    * Sets the width of the rectangle
    */
    width: Expression<NumberNode>;
    /**
     * Returns the height of the rectangle
     */
    /**
    * Sets the height of the rectangle
    */
    height: Expression<NumberNode>;
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine(): boolean;
}
