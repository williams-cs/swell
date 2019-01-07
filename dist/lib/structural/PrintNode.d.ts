import { Expression } from "../Expression";
import { Scope } from "./Scope";
import { Dimensions } from "./Dimensions";
export declare class PrintNode implements Expression<any> {
    private _toPrint;
    private _scale;
    private _dims;
    private _newLine;
    private _ws;
    /**
     * Constructor for a PrintNode, representing an object to be printed
     * @param toPrint The object to be printed
     * @param dimensions The dimensions of the object to be printed
     * @param ws Preceding whitespace
     */
    constructor(toPrint: Expression<any>, dimensions?: Dimensions, ws?: string);
    /**
     * Returns a string representation of the object to be printed
     */
    toString(): string;
    /**
     * Equals cannot be called directly on a PrintNode
     * @param right
     */
    equalsVal(right: Expression<any>): boolean;
    /**
     * PrintNodes cannot be drawn directly
     * @param context
     * @param dims
     * @param ast
     */
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void;
    /**
     * Evaluates the object to be printed and draws it
     * @param context
     */
    eval(context: Scope): any;
    /**
     * Returns the object to be printed
     */
    readonly toPrint: Expression<any>;
    /**
     * Returns the dimensions of the object to be printed
     */
    readonly dims: Dimensions;
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine(): boolean;
}
