import { AbstractPrintableNode } from '../structural/AbstractPrintableNode';
import { AbstractShapeEffect } from '../effects/AbstractShapeEffect';
import { Dimensions } from '../structural/Dimensions';
import { Expression } from '../Expression';
import { NumberNode } from '../prims/NumberNode';
import { Scope } from '../structural/Scope';

export abstract class AbstractShapeNode<T extends AbstractShapeNode<T, E>, E extends AbstractShapeEffect<T>> extends AbstractPrintableNode<T, E> {

    constructor(private _width: Expression<NumberNode>, private _height: Expression<NumberNode>, ws: string = "") {
        super(ws);
    }

    draw(scope: Scope, dims: Dimensions): void {
        dims.width = this.width;
        dims.height = this.height;
        this.getEffect(scope, dims).draw();
    };

    get width(): Expression<NumberNode> {
        return this._width;
    }

    set width(width: Expression<NumberNode>) {
        this._width = width;
    }

    get height(): Expression<NumberNode> {
        return this._height;
    }

    set height(height: Expression<NumberNode>) {
        this._height = height;
    }
}
