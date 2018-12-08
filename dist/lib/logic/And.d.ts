import { Expression } from "../Expression";
import { Scope } from '../structural/Scope';
import { BooleanNode } from "../prims/BooleanNode";
export declare class And implements Expression<any> {
    private _left;
    private _right;
    private _newLine;
    private _ws;
    /**
     * Constructor for logical 'and' (&&) operation
     * @param left The left side of the operation
     * @param right The right side of the operation
     * @param ws Preceding whitespace
     */
    constructor(left: Expression<any>, right: Expression<any>, ws?: string);
    /**
     * Performs the operation and returns a boolean of the result
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
     * Equals cannot be called directly on the 'and' op
     * @param right
     */
    equalsVal(right: Expression<any>): boolean;
    /**
     * The 'and' operation cannot be drawn directly
     */
    draw(): void;
    /**
     * Returns the left side of the op
     */
    readonly left: Expression<any>;
    /**
     * Returns the right side of the op
     */
    readonly right: Expression<any>;
}
