import { Dimensions } from '../structural/Dimensions';
import { AbstractShapeEffect } from '../effects/AbstractShapeEffect';
import { Expression } from '../Expression';
import { NumberNode } from '../prims/NumberNode';
import { Scope } from '../structural/Scope';

export abstract class AbstractShapeNode<T extends AbstractShapeNode<T, E>, E extends AbstractShapeEffect<T>> implements Expression<T> {

    private _newLine: boolean = false;

    constructor(private _width: Expression<NumberNode>, private _height: Expression<NumberNode>, private _ws: string = "") { }

    draw(scope: Scope, dims: Dimensions, ast: Expression<any>): void {
        dims.width = this.width;
        dims.height = this.height;
        this.getEffect(scope, dims).draw();
    };

    abstract eval(context: Scope): T;

    abstract equalsVal(right: Expression<any>): boolean;

    abstract getEffect(scope: Scope, dims: Dimensions): E;

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
