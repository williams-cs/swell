import { Expression } from "../Expression";
import { Scope } from './Scope';
import { Dimensions } from "./Dimensions";
export declare class SequenceNode implements Expression<void> {
    private _left;
    private _right;
    private _leftVal;
    private _rightVal;
    private _newLine;
    /**
     * Constructor for a SequenceNode, the building block of the AST
     * @param left The left side of the Sequence
     * @param right The right side of the Sequence
     */
    constructor(left: Expression<any>, right: Expression<any>);
    /**
     * Evaluates the children in postorder (left, right, parent)
     * @param context The current program context
     */
    eval(context: Scope): void;
    /**
     * SequenceNodes cannot be directly drawn
     * @param context
     * @param dims
     * @param ast
     */
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void;
    /**
     * Equals cannot be directly called on SequenceNodes
     * @param right
     */
    equalsVal(right: Expression<any>): boolean;
    /**
     * Returns a string representation of the AST
     */
    toString(): string;
    /**
     * Returns the left child
     */
    /**
    * Sets the left child
    */
    left: Expression<any>;
    /**
     * Returns the right child
     */
    /**
    * Sets the right child
    */
    right: Expression<any>;
    /**
     * Returns the value of the left chile
     */
    readonly leftVal: any;
    /**
     * Returns the value of the right chile
     */
    readonly rightVal: any;
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine(): boolean;
}
