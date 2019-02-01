import { AbstractPrintableNode } from '../structural/AbstractPrintableNode';
import { AbstractTextEffect } from '../effects/AbstractTextEffect';
import { Dimensions } from '../structural/Dimensions';
import { Expression } from '../Expression';
import { Scope } from '../structural/Scope';

export abstract class AbstractTypeableNode<T extends AbstractTypeableNode<T, V, E>, V, E extends AbstractTextEffect<T, V, E>> extends AbstractPrintableNode<T, E> {

    constructor(private _val: V, ws: string = ""){
        super(ws);
    }

    draw(scope: Scope, dims: Dimensions): void {
        this.getEffect(scope, dims).draw();
    };

    get val(): V {
        return this._val;
    };

    set val(val: V) {
        this._val = val;
    };
}
