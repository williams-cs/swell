import { Expression } from "../Expression";
import { Scope } from '../structural/Scope';
export declare class Conditional implements Expression<any> {
    private _test;
    private _trueBranch;
    private _falseBranch;
    private _newLine;
    /**
     * The constructor for conditionals (if, else if, and else statements)
     * @param test The condition of the statement
     * @param trueBranch The branch to follow if the condition evaluates to true
     * @param falseBranch The branch to follow if the condition evaluates to false
     */
    constructor(test: Expression<any>, trueBranch: Expression<any>, falseBranch?: Expression<any>);
    /**
     * Checks the test result and returns the result of the true or false branch, depending on the test
     * @param context The current program context
     */
    eval(context: Scope): any;
    /**
     * Returns a string representation of the conditional statement
     */
    toString(): string;
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine(): boolean;
    /**
     * Returns the true branch of the conditional
     */
    readonly trueBranch: Expression<any>;
    /**
     * Returns the false branch of the conditional
     */
    readonly falseBranch: Expression<any>;
    /**
     * Conditionals cannot be drawn directly
     */
    draw(): void;
    /**
     * Equals cannot be called directly on a conditional
     * @param right
     */
    equalsVal(right: Expression<any>): boolean;
}
