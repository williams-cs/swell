import { Expression } from '../Expression';
import { Scope } from '../structural/Scope';
import { NumberNode } from '../prims/NumberNode';
import { Dimensions } from '../structural/Dimensions';
export declare class EllipseNode implements Expression<EllipseNode> {
    private _width;
    private _height;
    private _newLine;
    private _ws;
    /**
     * Constructor for an EllipseNode, a node representing an ellipse
     * @param width The width of the ellipse
     * @param height The height of the ellipse
     * @param ws Preceding whitespace
     */
    constructor(width: Expression<NumberNode>, height: Expression<NumberNode>, ws?: string);
    /**
     * Returns this EllipseNode
     * @param context The current program context
     */
    eval(context: Scope): EllipseNode;
    /**
     * Draws the ellipse on the canvas using EllipseEffect
     * @param context The current program context
     * @param dims The dimensions of the ellipse
     * @param ast The program AST
     */
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void;
    /**
     * Returns whether this EllipseNode equals another EllipseNode (if their widths and heights are equal)
     * @param right The right side of the equality (must be an EllipseNode)
     */
    equalsVal(right: Expression<any>): boolean;
    /**
     * Returns a string representation of the ellipse
     */
    toString(): string;
    move(): void;
    /**
     * Returns the ellipse width
     */
    /**
    * Sets the ellipse width
    */
    width: Expression<NumberNode>;
    /**
    * Returns the ellipse height
    */
    /**
    * Sets the ellipse height
    */
    height: Expression<NumberNode>;
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine(): boolean;
}
