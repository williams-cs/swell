import { Expression } from "../Expression";
import { Scope } from '../structural/Scope';
import { BooleanNode } from "../prims/BooleanNode";
export declare class LessThanEq implements Expression<BooleanNode> {
    private _left;
    private _right;
    private _newLine;
    private _ws;
    /**
     * Constructor for LessThanEq (less than or equal to, <=) operation
     * @param left The left side of the operation
     * @param right The right side of the operation
     * @param ws Preceding whitespace
     */
    constructor(left: Expression<any>, right: Expression<any>, ws?: string);
    /**
     * Performs the LessThanEq comparison and returns BooleanNode with result
     * @param context The current program context
     */
    eval(context: Scope): BooleanNode;
    /**
     * Returns a string representation of the operation
     */
    toString(): string;
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine(): boolean;
    /**
     * Equals cannot be called directly on LessThanEq op
     * @param right
     */
    equalsVal(right: Expression<any>): boolean;
    /**
     * LessThanEq ops cannot be drawn directly
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
