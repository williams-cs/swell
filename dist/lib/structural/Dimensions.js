"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NumberNode_1 = require("../prims/NumberNode");
class Dimensions {
    /**
     * Constructor for Dimensions, which stores object dimensions
     * @param x The x coordinate of the object
     * @param y The y coordinate of the object
     * @param scale The scale of the object
     * @param radius The radius of the object
     */
    constructor(x, y, scale, radius) {
        this._x = x;
        this._y = y;
        this._scale = scale;
        this._radius = radius || new NumberNode_1.NumberNode(30, "");
    }
    /**
     * Returns a string representation of the dimensions
     */
    toString() {
        return this.x.toString() + ", " + this.y.toString();
    }
    /**
     * Returns the x coordinate of the object
     */
    get x() {
        return this._x;
    }
    /**
     * Sets the x coordinate of the object
     */
    set x(val) {
        this._x = val;
    }
    /**
     * Returns the y coordinate of the object
     */
    get y() {
        return this._y;
    }
    /**
     * Sets the y coordinate of the object
     */
    set y(val) {
        this._y = val;
    }
    /**
     * Returns the radius of the object
     */
    get radius() {
        return this._radius;
    }
    /**
     * Sets the radius of the object
     */
    set radius(val) {
        this._radius = val;
    }
    /**
     * Returns the scale of the object
     */
    get scale() {
        return this._scale;
    }
    /**
     * Sets the scale of the object
     */
    set scale(val) {
        this._scale = val;
    }
    /**
     * Returns the width of the object
     */
    get width() {
        return this._width;
    }
    /**
     * Sets the width of the object
     */
    set width(val) {
        this._width = val;
    }
    /**
     * Returns the height of the object
     */
    get height() {
        return this._height;
    }
    /**
     * Sets the height of the object
     */
    set height(val) {
        this._height = val;
    }
}
exports.Dimensions = Dimensions;
//# sourceMappingURL=Dimensions.js.map