import { Expression } from '../Expression';
import { Scope } from '../structural/Scope';
import { Dimensions } from '../structural/Dimensions';
export declare class VariableNode implements Expression<any> {
    private _name;
    private _newLine;
    private _ws;
    /**
     * Constructor for a VariableNode, a node representing a variable
     * @param name The variable name
     * @param ws Preceding whitespace
     */
    constructor(name: string, ws?: string);
    /**
     * Looks up the value of the variable in the context
     * @param context The current program context
     */
    eval(context: Scope): any;
    /**
     * VariableNodes cannot be drawn directly
     * @param context
     * @param dims
     * @param ast
     */
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void;
    /**
     * Equals cannot be called directly on VariableNodes
     * @param right
     */
    equalsVal(right: Expression<any>): boolean;
    /**
     * Returns a string representation of the VariableNode
     */
    toString(): string;
    /**
     * Returns the name of the variable
     */
    readonly name: string;
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine(): boolean;
}
