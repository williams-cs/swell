import { Scope } from '../structural/Scope';
import { Expression } from '../Expression';
import { Dimensions } from '../structural/Dimensions';

export abstract class AbstractBinaryOp<L, R, T> implements Expression<T> {

    private _newLine: boolean = false;

    constructor(private _left: Expression<L>, private _right: Expression<R>, private _ws: string = "") {};

    abstract eval(context: Scope): T;

    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void {
        throw new Error("Not implemented");
    }

    equalsVal(right: Expression<any>): boolean {
        throw new Error("Cannot call equals directly on BinOp");
    }

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

    get ws(): string {
        return this._ws;
    }

    set ws(ws: string) {
        this._ws = ws;
    }

    newLine(): boolean {
        return this._newLine;
    }
}
