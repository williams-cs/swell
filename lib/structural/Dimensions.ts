export class Dimensions {
    private _x: number;
    private _y: number;
    private _radius: number;
    private _scale: number;

    constructor(x: number, y: number, scale: number, radius?: number) {
        this._x = x;
        this._y = y;
        this._scale = scale;
        this._radius = radius || 30;
    }

    get x(): number {
        return this._x;
    }
    set x(val: number) {
        this._x = val;
    }

    get y(): number {
        return this._y;
    }
    set y(val: number) {
        this._y = val;
    }

    get radius(): number {
        return this._radius;
    }
    set radius(val: number) {
        this._radius = val;
    }

    get scale(): number {
        return this._scale;
    }
    set scale(val: number) {
        this._scale = val;
    }
}