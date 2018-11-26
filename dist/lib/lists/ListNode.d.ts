import { Expression } from "../Expression";
import { Scope } from "../structural/Scope";
export declare class ListNode implements Expression<ListNode> {
    private _list;
    private _newLine;
    private _ws;
    /**
     * Constructor for an array-like list
     * @param list The list, stored in a TS array
     * @param ws Preceding whitespace
     */
    constructor(list: Expression<any>[], ws?: string);
    /**
     * Evaluates each element of the list and pushes it onto the internal representation
     * @param context
     */
    eval(context: Scope): ListNode;
    /**
     * Returns a string representation of the list
     */
    toString(): string;
    /**
     * Returns whether the list equals another list
     * @param right The right side of the equality (must be a ListNode)
     */
    equalsVal(right: Expression<any>): boolean;
    /**
     * Draw cannot be called directly on a list
     */
    draw(): void;
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine(): boolean;
    /**
     * Returns the internal representation of the list
     */
    readonly list: Expression<any>[];
}
