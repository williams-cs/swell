import { Expression } from "../Expression";
import { Scope } from '../structural/Scope';
import { BooleanNode } from '../prims/BooleanNode';
import { Dimensions } from "../structural/Dimensions";
export declare class ForNode implements Expression<any> {
    private _init;
    private _cond;
    private _post;
    private _body;
    private _ws;
    private _newLine;
    /**
     * Constructor for a For loop
     * @param init Initializes the variable used in the condition
     * @param cond The condition (must evaluate to BooleanNode)
     * @param post The postevaluation condition
     * @param body The body of the loop
     * @param ws Preceding whitespace
     */
    constructor(init: Expression<any>, cond: Expression<BooleanNode>, post: Expression<any>, body: Expression<any>, ws?: string);
    /**
     * Evaluates the For loop
     * @param context The current program context
     */
    eval(context: Scope): any;
    /**
     * Equals cannot be called directly on ForNode
     * @param right
     */
    equalsVal(right: Expression<any>): boolean;
    /**
     * ForNodes cannot be drawn directly
     * @param context
     * @param dims
     * @param ast
     */
    draw(context: Scope, dims: Dimensions, ast: Expression<any>): string;
    /**
     * Returns a string representation of the for loop
     */
    toString(): string;
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine(): boolean;
}
