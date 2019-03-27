import { Expression } from "../Expression";
import { Scope } from '../structural/Scope';
import { Some } from "space-lift";

export class ParensNode<T> extends Expression<any>{

    private _content: T;
    /**
     * The constructor for parens nodes that follow if, function def, or repeat node
     * @param content expression between curly braces 
     * @param ws Preceding whitespace
     */
    constructor(
        content: T,
        ws: string = "",
    ) {
        super(ws);
        this._content = content;
    }

    eval(context: Scope) {
        if(this._content instanceof Expression) return this._content.eval(context);
    }

    toString(): string {
        return `${this.ws}(${this._content.toString()})`;
    }

    get expr(): T {
        return this._content;
    }
}
