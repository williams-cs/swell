import { NumberNode } from "../prims/NumberNode";
import { Expression } from "../Expression";

export class Dimensions {
    private _x: Expression<NumberNode>;
    private _y: Expression<NumberNode>;
    private _radius: Expression<NumberNode>;
    private _scale: Expression<NumberNode>;
    private _width: Expression<NumberNode>;
    private _height: Expression<NumberNode>;
    private _curvature?: Expression<NumberNode>;

    /**
     * Constructor for Dimensions, which stores object dimensions
     * @param x The x coordinate of the object
     * @param y The y coordinate of the object
     * @param scale The scale of the object
     * @param radius The radius of the object
     */
    constructor(x: Expression<NumberNode>, y: Expression<NumberNode>, scale: Expression<NumberNode>, radius?: Expression<NumberNode>) {
        this._x = x;
        this._y = y;
        this._scale = scale;
        this._radius = radius || new NumberNode(30, "");
    }

    /**
     * Returns a string representation of the dimensions
     */
    toString(): string {
        return this.x.toString() + ", " + this.y.toString();
    }

    /**
     * Returns the x coordinate of the object
     */
    get x(): Expression<NumberNode> {
        return this._x;
    }
    /**
     * Sets the x coordinate of the object
     */
    set x(val: Expression<NumberNode>) {
        this._x = val;
    }

    /**
     * Returns the y coordinate of the object
     */
    get y(): Expression<NumberNode> {
        return this._y;
    }
    /**
     * Sets the y coordinate of the object
     */
    set y(val: Expression<NumberNode>) {
        this._y = val;
    }

    /**
     * Returns the radius of the object
     */
    get radius(): Expression<NumberNode> {
        return this._radius;
    }
    /**
     * Sets the radius of the object
     */
    set radius(val: Expression<NumberNode>) {
        this._radius = val;
    }

    /**
     * Returns the scale of the object
     */
    get scale(): Expression<NumberNode> {
        return this._scale;
    }
    /**
     * Sets the scale of the object
     */
    set scale(val: Expression<NumberNode>) {
        this._scale = val;
    }

    /**
     * Returns the width of the object
     */
    get width(): Expression<NumberNode> {
        return this._width;
    }
    /**
     * Sets the width of the object
     */
    set width(val: Expression<NumberNode>) {
        this._width = val;
    }

    /**
     * Returns the height of the object
     */
    get height(): Expression<NumberNode> {
        return this._height;
    }
    /**
     * Sets the height of the object
     */
    set height(val: Expression<NumberNode>) {
        this._height = val;
    }

    /**
     * Returns the curvature of the object
     */
    get curvature(): Expression<NumberNode> {
        return this._curvature;
    }
    /**
     * Sets the curvature of the object
     */
    set curvature(val: Expression<NumberNode>) {
        this._curvature = val;
    }
}
