import { Expression } from "../Expression";
import { Scope } from './Scope';
import { Dimensions } from './Dimensions';
import { Effect } from '../effects/Effect';

export abstract class AbstractPrintableNode<T extends AbstractPrintableNode<T, E>, E extends Effect<T>> implements Expression<T> {

    private _newLine: boolean = false;

    constructor(private _ws: string = "") { }

    abstract eval(context: Scope): T;

    abstract draw(context: Scope, dims: Dimensions): void;

    abstract equalsVal(right: Expression<any>): boolean;

    abstract getEffect(scope: Scope, dims: Dimensions): E

    newLine(): boolean {
        return this._newLine;
    }

    get ws(): string {
        return this._ws;
    }

    set ws(ws: string) {
        this._ws = ws;
    }
}
