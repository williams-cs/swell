import { NumberNode } from "../prims/NumberNode";
import { Expression } from "../Expression";

export class Dimensions {
    private _x: Expression<NumberNode>;
    private _y: Expression<NumberNode>;
    private _radius: Expression<NumberNode>;
    private _scale: Expression<NumberNode>;
    private _width: Expression<NumberNode>;
    private _height: Expression<NumberNode>;

    constructor(x: Expression<NumberNode>, y: Expression<NumberNode>, scale: Expression<NumberNode>, radius?: Expression<NumberNode>) {
        this._x = x;
        this._y = y;
        this._scale = scale;
        this._radius = radius || new NumberNode(30, "");
    }

    toString(): string {
        return this.x.toString() + ", " + this.y.toString();
    }

    get x(): Expression<NumberNode> {
        return this._x;
    }
    set x(val: Expression<NumberNode>) {
        this._x = val;
    }

    get y(): Expression<NumberNode> {
        return this._y;
    }
    set y(val: Expression<NumberNode>) {
        this._y = val;
    }

    get radius(): Expression<NumberNode> {
        return this._radius;
    }
    set radius(val: Expression<NumberNode>) {
        this._radius = val;
    }

    get scale(): Expression<NumberNode> {
        return this._scale;
    }
    set scale(val: Expression<NumberNode>) {
        this._scale = val;
    }

    get width(): Expression<NumberNode> {
        return this._width;
    }
    set width(val: Expression<NumberNode>) {
        this._width = val;
    }

    get height(): Expression<NumberNode> {
        return this._height;
    }
    set height(val: Expression<NumberNode>) {
        this._height = val;
    }
}