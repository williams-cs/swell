import { Expression } from '../Expression';
import { Scope } from '../structural/Scope';
import { NumberNode } from '../prims/NumberNode';
import { Dimensions } from '../structural/Dimensions';
export declare class EphNode implements Expression<EphNode> {
    private _width;
    private _height;
    private _newLine;
    private _ws;
    /**
     * Constructor for an EphNode, a node representing something very special
     * @param width The width of the EphNode
     * @param height The height of the EphNode
     * @param ws Preceding whitespace
     */
    constructor(width: Expression<NumberNode>, height: Expression<NumberNode>, ws?: string);
    /**
     * Returns this EphNode
     * @param context The current program context
     */
    eval(context: Scope): EphNode;
    /**
     * Draws the rectangle using EphEffect
     * @param context The current program context
     * @param dims The rectangle dimensions
     * @param ast The program AST
     */
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void;
    /**
     * Returns whether this EphNode equals another (if their widths and heights are equal)
     * @param right The right side of the equality (must be an EphNode)
     */
    equalsVal(right: Expression<any>): boolean;
    move(): void;
    /**
     * Returns a string representation of the EphNode
     */
    toString(): string;
    /**
     * Returns the width of the EphNode
     */
    /**
    * Sets the width of the EphNode
    */
    width: Expression<NumberNode>;
    /**
     * Returns the height of the EphNode
     */
    /**
    * Sets the height of the EphNode
    */
    height: Expression<NumberNode>;
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine(): boolean;
}
