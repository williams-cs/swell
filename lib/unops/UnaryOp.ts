import { Expression } from '../Expression';
import { Scope } from '../structural/Scope';

export abstract class UnaryOp<T> extends Expression<T> {

    /**
     * Abstract class constructor for Unary Operations
     * @param _expr The expression to be operated on
     */
    constructor(private _expr: Expression<T>, ws: string = "") {
        super(ws);
    };

    get expr(): Expression<T> {
        return this._expr;
    }

    set expr(expr: Expression<T>) {
        this._expr = expr;
    }
}
