import { Expression } from '../Expression';
import { Scope } from '../structural/Scope';
import { Dimensions } from '../structural/Dimensions';

export abstract class UnaryOp<T> implements Expression<T> {

    private _ws: string = "";
    private _newLine: boolean = false;

    /**
     * Abstract class constructor for Unary Operations
     * @param _node The object to be operated on
     */
    constructor(private _node: Expression<T>, ws?: string) {
        this.ws = ws !== undefined ? ws : "";
    };

    abstract eval(context?: Scope): T;

    draw(context: Scope, dims: Dimensions, ast: Expression<any>): void {
        throw new Error("Unary Operations cannot be drawn directly");
    }

    equalsVal(right: Expression<any>): boolean {
        throw new Error("Cannot call equals on UnaryOp");
    };

    newLine(): boolean {
        return this._newLine;
    }

    get node(): Expression<T> {
        return this._node;
    }

    set node(node: Expression<T>) {
        this._node = node;
    }

    get ws(): string {
        return this._ws;
    }

    set ws(ws: string) {
        this._ws = ws;
    }
}
