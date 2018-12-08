"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// export class Ellipse extends Shape implements Effect<any>{
class Ellipse {
    constructor(color, xPos, yPos, width, height) {
        // super (color, xPos, yPos);
        this._width = width;
        this._height = height;
    }
    ;
    //get and set
    //also is this actually necessary?
    move() { }
    ;
    draw() { }
    ;
    equalsVal(right) {
        throw new Error("Cannot call equals directly on shape");
    }
    ast() {
        return null;
    }
    ;
}
exports.Ellipse = Ellipse;
//# sourceMappingURL=Ellipse.js.map