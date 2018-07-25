"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NumberNode_1 = require("../prims/NumberNode");
class Dimensions {
    constructor(x, y, scale, radius) {
        this._x = x;
        this._y = y;
        this._scale = scale;
        this._radius = radius || new NumberNode_1.NumberNode(30);
    }
    get x() {
        return this._x;
    }
    set x(val) {
        this._x = val;
    }
    get y() {
        return this._y;
    }
    set y(val) {
        this._y = val;
    }
    get radius() {
        return this._radius;
    }
    set radius(val) {
        this._radius = val;
    }
    get scale() {
        return this._scale;
    }
    set scale(val) {
        this._scale = val;
    }
}
exports.Dimensions = Dimensions;
//# sourceMappingURL=Dimensions.js.map