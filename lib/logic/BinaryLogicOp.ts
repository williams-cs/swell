import { Expression } from "../Expression";
import { Scope } from '../structural/Scope';
import { BooleanNode } from "../prims/BooleanNode";

export abstract class BinaryLogicOp<T> implements Expression<BooleanNode> {

    private _newLine: boolean = false;

    constructor(private _left: Expression<T>, private _right: Expression<T>, private _ws: string = "") { }

    abstract eval(context: Scope): BooleanNode;

    newLine(): boolean {
        return this._newLine;
    }

    equalsVal(right: Expression<any>): boolean {
        throw new Error("Cannot call equals on logical ops");
    }

    draw() {
        throw new Error("Cannot call draw on logical ops");
    }

    get left(): Expression<T> {
        return this._left;
    }

    get right(): Expression<T> {
        return this._right;
    }

    get ws(): string {
        return this._ws;
    }
}
