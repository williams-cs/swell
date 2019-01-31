import { Expression } from '../Expression';
import { Scope } from '../structural/Scope';
import { Dimensions } from '../structural/Dimensions';

export abstract class AbstractTypeableNode<T, V> implements Expression<T> {

    protected _val: V;
    protected _newLine: boolean = false;
    protected _ws: string;

    /**
     * Constructor for a StringNode, a node representing a string
     * @param val The val stored in the node
     * @param ws Preceding whitespace
     */
    constructor(val: V, ws?: string){
        this.val = val;
        this.ws = ws !== undefined ? ws : "";
    }

    abstract eval(context: Scope): T;

    abstract draw(context: Scope, dims: Dimensions, ast: Expression<any>): void;

    abstract equalsVal(right: Expression<any>): boolean;

    /**
     * Returns the value stored in the node
     */
    get val(): V {
        return this._val;
    };

    /**
     * Sets the value stored in the node
     */
    set val(val: V) {
        this._val = val;
    };

    /**
     * Returns the whitespace
     */
    get ws(): string {
        return this._ws;
    }

    /**
     * Sets the whitespace
     */
    set ws(ws: string){
        this._ws = ws;
    }

    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine(): boolean {
        return this._newLine;
    }
}
