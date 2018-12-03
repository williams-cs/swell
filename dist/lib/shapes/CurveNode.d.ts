import { Expression } from '../Expression';
import { Scope } from '../structural/Scope';
import { NumberNode } from '../prims/NumberNode';
import { Dimensions } from '../structural/Dimensions';
export declare class CurveNode implements Expression<CurveNode> {
    private _dx;
    private _dy;
    private _curvature;
    private _newLine;
    private _ws;
    /**
     * Constructor for a CurveNode, a node representing a curve
     * @param dx the run of the curve
     * @param dy the rise of the curve
     * @param curvature how much the curve, umm, curves
     * @param ws Preceding whitespace
     */
    constructor(dx: Expression<NumberNode>, dy: Expression<NumberNode>, curvature: Expression<NumberNode>, ws?: string);
    /**
     * Returns this CurveNode
     * @param context The current program context
     */
    eval(context: Scope): CurveNode;
    /**
     * Draws the curve using CurveEffect
     * @param context The current program context
     * @param dims The line dimensions
     * @param ast The program AST
     */
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void;
    /**
     * Returns whether this CurveNode equals another (if their dx, dy, and curvature are equal)
     * @param right The right side of the equality (must be a CurveNode)
     */
    equalsVal(right: Expression<any>): boolean;
    move(): void;
    /**
     * Returns a string representation of the curve
     */
    toString(): string;
    /**
     * Returns the run of the curve
     */
    /**
    * Sets the run of the curve
    */
    dx: Expression<NumberNode>;
    /**
     * Returns the rise of the curve
     */
    /**
    * Sets the rise of the curve
    */
    dy: Expression<NumberNode>;
    /**
     * Returns the curvature of the curve
     */
    /**
    * Sets the curvature of the curve
    */
    curvature: Expression<NumberNode>;
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine(): boolean;
}
