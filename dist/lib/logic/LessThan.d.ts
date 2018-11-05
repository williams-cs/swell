import { Expression } from "../Expression";
import { Scope } from '../structural/Scope';
import { BooleanNode } from "../prims/BooleanNode";
export declare class LessThan implements Expression<BooleanNode> {
    private _left;
    private _right;
    private _newLine;
    private _ws;
    /**
     * Constructor for LessThan (<) operation
     * @param left Left side of operation
     * @param right Right side of operation
     * @param ws Preceding whitespace
     */
    constructor(left: Expression<any>, right: Expression<any>, ws?: string);
    /**
     * Performs the LessThan comparison and returns BooleanNode with result
     * @param context The current program context
     */
    eval(context: Scope): BooleanNode;
    /**
     * Returns string representation of operation
     */
    toString(): string;
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine(): boolean;
    /**
     * Equals cannot be called directly on LessThan op
     * @param right
     */
    equalsVal(right: Expression<any>): boolean;
    /**
     * LessThan op cannot be drawn directly
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
