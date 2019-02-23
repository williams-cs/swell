import { Scope } from './structural/Scope';

/**
 * Expressions are one of the main building blocks of the AST.
 * Whether a logical or mathematical statement, Expressions generally evaluate to a primitive.
 */
export abstract class Expression<T> {

    /**
     * Constructor for an expression
     * @param lws The whitespace preceding the expression
     * @param rws The whitespace after the expression
     */
    constructor(private _lws: string = "", private _rws: string = "", private _newLine: boolean = false) {}

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
     * Returns whether or not this expression is terminated by a newline or semicolon
     */
    get newLine(): boolean {
        return this._newLine;
    }

    /**
     * Returns the whitespace preceding the expression
     */
    get lws(): string {
        return this._lws;
    }

    /**
     * Sets the whitespace preceding the expression
     */
    set lws(ws: string) {
        this._lws = ws;
    }

    /**
     * Returns the whitespace after the expression
     */
    get rws(): string {
        return this._rws;
    }

    /**
     * Sets the whitespace after the expression
     */
    set rws(ws: string) {
        this._rws = ws;
    }
}
