"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ColorNode {
    constructor(red, green, blue) {
        this._newLine = false;
        this._red = red;
        this._green = green;
        this._blue = blue;
    }
    ;
    draw(context, dims, ast) {
    }
    equalsVal(right) {
        if (right instanceof ColorNode) {
            return (this.red === right.red && this.green === right.green && this.blue === right.blue);
        }
        return false;
    }
    toString() {
        return "";
    }
    eval(context) {
        return this._red + " " + this._green + " " + this._blue;
    }
    get red() {
        return this._red;
    }
    set red(red) {
        this._red = red;
    }
    get green() {
        return this._green;
    }
    set green(green) {
        this._green = green;
    }
    get blue() {
        return this._blue;
    }
    set blue(blue) {
        this._blue = blue;
    }
    newLine() {
        return this._newLine;
    }
}
exports.ColorNode = ColorNode;
//# sourceMappingURL=ColorNode.js.map