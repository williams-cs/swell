import { Expression } from '../Expression';
import { Scope } from '../structural/Scope';

export abstract class AbstractBinaryOp<L, R, T> extends Expression<T> {

    constructor(private _left: Expression<L>, private _right: Expression<R>, ws: string = "") {
        super(ws);
    };

    get left(): Expression<L> {
        return this._left;
    }

    set left(left: Expression<L>) {
        this._left = left;
    }

    get right(): Expression<R> {
        return this._right;
    }

    set right(right: Expression<R>) {
        this._right = right;
    }
}
