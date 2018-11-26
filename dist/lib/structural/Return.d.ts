import { Expression } from "../Expression";
import { Scope } from "./Scope";
import { Dimensions } from "./Dimensions";
export declare class Return implements Expression<any> {
    private _expr;
    private _newLine;
    private _ws;
    /**
     * Constructor for a Return object, representing something to be returned in a function
     * @param expr The expression to be returned
     * @param ws Preceding whitespace
     */
    constructor(expr: Expression<any>, ws?: string);
    /**
     * Evaluates the expression to be returned and returns via a ReturnErro
     * @param context The current program context
     */
    eval(context: Scope): void;
    /**
     * Equals cannot be called directly on Return nodes
     * @param right
     */
    equalsVal(right: Expression<any>): boolean;
    /**
     * Returns a string representation of the Return node
     */
    toString(): string;
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine(): boolean;
    /**
     * Return nodes cannot be drawn directly
     * @param context
     * @param dims
     * @param ast
     */
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void;
}
