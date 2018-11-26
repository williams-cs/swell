import { Expression } from "../Expression";
import { Scope } from "../structural/Scope";
import { Dimensions } from "../structural/Dimensions";
export declare class FunApp<T> implements Expression<T> {
    private _name;
    private _args;
    private _defaultValue;
    private _newLine;
    private _ws;
    /**
     * The constructor for a function application
     * @param name The name of the function
     * @param args Function arguments, if applicable
     * @param ws Preceding whitespace
     * @param defaultValue The default return value of the function, if any
     */
    constructor(name: string, args?: any[], ws?: string, defaultValue?: T);
    /**
     * Evaluates the function application
     * @param context
     */
    eval(context: Scope): any;
    /**
     * Returns a string representation of the function application
     */
    toString(): string;
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine(): boolean;
    /**
     * Function applications cannot be drawn directly
     * @param context
     * @param dims
     * @param ast
     */
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void;
    /**
     * Equals cannot be called directly on a function application
     * @param right
     */
    equalsVal(right: Expression<any>): boolean;
    /**
     * Returns the name of the function
     */
    readonly name: string;
    /**
     * Returns the arguments of the function
     */
    readonly args: Expression<{}>[];
}
