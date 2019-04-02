import { AbstractPrintableNode } from '../structural/AbstractPrintableNode';
import { AbstractTextEffect } from '../effects/AbstractTextEffect';
import { Expression } from '../Expression';
import { Scope } from '../structural/Scope';

export abstract class AbstractTypeableNode<T extends AbstractTypeableNode<T, V, E>, V, E extends AbstractTextEffect<T, V, E>> extends AbstractPrintableNode<T, E> {

    constructor(private _val: V, ws: string = " ") {
        super(ws);
    }

    get val(): V {
        return this._val;
    };

    set val(val: V) {
        this._val = val;
    };
}
