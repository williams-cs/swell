import { Scope } from './structural/Scope';

/**
 * Expressions are one of the main building blocks of the AST.
 * Whether a logical or mathematical statement, Expressions generally evaluate to a primitive.
 */
export abstract class Expression<T> {

    /**
     * Constructor for an expression
     * @param ws The whitespace preceding the expression
     */
    constructor(private _lws: string = "") {}

    /**
     * Interface evaluation method for Expressions
     * @param context The current program context
     */
    abstract eval(context: Scope): T;

    /**
     * Interface method to return a string representation of the Expression
     */
    abstract toString(): string;

    /**
     * Returns whether the Expression equals another Expression
     * @param right The right side of the equality
     */
    equals(right: Expression<any>): boolean {
        throw("Cannot call equals on this expression");
    };

    /* Getters and Setters */

    /**
     * Returns the whitespace preceding the expression
     */
    get ws(): string {
        return this._lws;
    }

    /**
     * Sets the whitespace preceding the expression
     */
    set ws(ws: string) {
        this._lws = ws;
    }

}
