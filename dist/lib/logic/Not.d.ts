import { Expression } from "../Expression";
import { Scope } from '../structural/Scope';
import { BooleanNode } from "../prims/BooleanNode";
export declare class Not implements Expression<BooleanNode> {
    private _expr;
    private _newLine;
    private _ws;
    /**
     * Constructor for the Not (!) operation
     * @param expr The expression to be negated (must be a BooleanNode)
     * @param ws Preceding whitespace
     */
    constructor(expr: Expression<any>, ws?: string);
    /**
     * Performs the Not operation and returns BooleanNode with result
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
     * Equals cannot be called directly on a Not op
     * @param right
     */
    equalsVal(right: Expression<any>): boolean;
    /**
     * Not operations cannot be drawn directly
     */
    draw(): void;
    /**
     * Returns expression to be negated
     */
    readonly expr: Expression<any>;
}
