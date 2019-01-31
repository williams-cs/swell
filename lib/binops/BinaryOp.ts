import { Scope } from '../structural/Scope';
import { Expression } from '../Expression';
import { Dimensions } from '../structural/Dimensions';

export abstract class BinaryOp<T> implements Expression<T> {

    private _ws: string = "";
    private _newLine: boolean = false;

    /**
     * Constructor for BinOp
     * @param _left The left side of the binary operation
     * @param _right The right side of the binary operation
     */
    constructor(private _left: Expression<T>, private _right: Expression<T>) {};

    abstract eval(context: Scope): T;

    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void {
        throw new Error("Not implemented");
    }

    equalsVal(right: Expression<any>): boolean {
        throw new Error("Cannot call equals directly on BinOp");
    }

    get left(): Expression<T> {
        return this._left;
    }

    set left(left: Expression<T>) {
        this._left = left;
    }

    get right(): Expression<T> {
        return this._right;
    }

    set right(right: Expression<T>) {
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
