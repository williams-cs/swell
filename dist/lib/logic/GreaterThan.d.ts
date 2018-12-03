import { Expression } from "../Expression";
import { Scope } from '../structural/Scope';
import { BooleanNode } from "../prims/BooleanNode";
export declare class GreaterThan implements Expression<BooleanNode> {
    private _left;
    private _right;
    private _newLine;
    private _ws;
    /**
     * Constructor for GreaterThan (>) op
     * @param left Left side of operation
     * @param right Right side of operation
     * @param ws Preceding whitespace
     */
    constructor(left: Expression<any>, right: Expression<any>, ws?: string);
    /**
     * Performs GreaterThan comparison and returns BooleanNode representation of result
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
     * Equals cannot be called directly on GreaterThan op
     * @param right
     */
    equalsVal(right: Expression<any>): boolean;
    /**
     * GreaterThan op cannot be drawn directly
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
