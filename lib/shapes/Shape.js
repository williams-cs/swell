"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Shape {
    constructor(_color, _xPos, _yPos) {
        this._color = _color;
        this._xPos = _xPos;
        this._yPos = _yPos;
    }
    get color() {
        return this._color;
    }
    set color(color) {
        this._color = color;
    }
    get xPos() {
        return this._xPos;
    }
    set xPos(xPos) {
        this._xPos = xPos;
    }
    get yPos() {
        return this._yPos;
    }
    set yPos(yPos) {
        this.yPos = yPos;
    }
}
exports.Shape = Shape;
