"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ColorNode {
    constructor(red, green, blue) {
        this._red = red;
        this._green = green;
        this._blue = blue;
    }
    ;
    get red() {
        return this._red;
    }
    get green() {
        return this._green;
    }
    get blue() {
        return this._blue;
    }
}
exports.ColorNode = ColorNode;
