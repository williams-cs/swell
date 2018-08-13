"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Shape {
    /**
     * Abstract class constructor for a Shape
     * @param _color The shape color
     * @param _xPos The x coordinate of the shape
     * @param _yPos The y coordinate of the shape
     */
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
//# sourceMappingURL=Shape.js.map