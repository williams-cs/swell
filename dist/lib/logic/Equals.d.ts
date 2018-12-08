import { Expression } from "../Expression";
import { Scope } from '../structural/Scope';
import { BooleanNode } from "../prims/BooleanNode";
export declare class Equals implements Expression<BooleanNode> {
    private _left;
    private _right;
    private _newLine;
    private _ws;
    /**
     * Constructor for equality (==) operation
     * @param left The left side of the equality
     * @param right The right side of the equality
     * @param ws Preceding whitespace
     */
    constructor(left: Expression<any>, right: Expression<any>, ws?: string);
    /**
     * Performs the comparison and evaluates to a BooleanNode
     * @param context
     */
    eval(context: Scope): BooleanNode;
    /**
     * Returns a string representation of the equality op
     */
    toString(): string;
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine(): boolean;
    /**
     * Equals can't be called directly on an equality op
     * @param right
     */
    equalsVal(right: Expression<any>): boolean;
    /**
     * Equality ops can't be drawn directly
     */
    draw(): void;
    /**
     * Returns left side of operation
     */
    readonly left: Expression<any>;
    /**
     * Returns right side of operation
     */
    readonly right: Expression<any>;
}
