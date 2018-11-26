import { Expression } from "../Expression";
import { Scope } from '../structural/Scope';
import { Dimensions } from "../structural/Dimensions";
export declare class WhileNode implements Expression<any> {
    private _cond;
    private _body;
    private _newLine;
    private _ws;
    /**
     * Constructor for a While loop
     * @param cond The While loop condition
     * @param body The body of the loop
     * @param ws Preceding whitespace
     */
    constructor(cond: Expression<any>, body: Expression<any>, ws?: string);
    /**
     * Evaluates the body of the loop while the condition is true
     * @param context
     */
    eval(context: Scope): any;
    /**
     * Equals cannot be called directly on WhileNodes
     * @param right
     */
    equalsVal(right: Expression<any>): boolean;
    /**
     * WhileNodes cannot be drawn directly
     * @param context
     * @param dims
     * @param ast
     */
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): string;
    /**
     * Returns a string representation of the While loop
     */
    toString(): string;
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine(): boolean;
}
