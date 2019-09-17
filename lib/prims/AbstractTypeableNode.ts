import { AbstractPrintableNode } from '../structural/AbstractPrintableNode';
import { AbstractTextEffect } from '../effects/AbstractTextEffect';
import { Expression } from '../Expression';
import { Scope } from '../structural/Scope';

export abstract class AbstractTypeableNode<T extends AbstractTypeableNode<T, V, E>, V, E extends AbstractTextEffect<T, V, E>> extends AbstractPrintableNode<T, E> {

    constructor(private _val: V, ws: string = "", private _origin: Expression<any> = null) {
        super(ws);
    }

    get val(): V {
        return this._val;
    };

    set val(val: V) {
        this._val = val;
    };

    get origin(): Expression<any> {
        return this._origin;
    };

    set origin(expr: Expression<any>){
        this._origin = expr;
    };
}
