import { Expression } from "../Expression";
import { Scope } from '../structural/Scope';
export declare class RepeatNode implements Expression<any> {
    private _n;
    private _body;
    private _ws;
    private _newLine;
    /**
     * The constructor for repeat(n){}
     * @param n The number of times to repeat the loop's scope
     * @param body The enclosed body of the loop
     * @param ws Preceding whitespace
     */
    constructor(n: Expression<any>, body: Expression<any>);
    /**
     * Evaluates the repeat loop
     * @param context The current program context
     */
    eval(context: Scope): any;
    /**
     * Returns a string representation of the repeat statement
     */
    toString(): string;
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine(): boolean;
    /**
     * Returns the body of the repeat loop
     */
    readonly body: Expression<any>;
    /**
     * RepeatNodes cannot be drawn directly
     */
    draw(): void;
    /**
     * Equals cannot be called directly on a repeat
     * @param right
     */
    equalsVal(right: Expression<any>): boolean;
}
