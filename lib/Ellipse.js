"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shape_1 = require("./shape");
class Ellipse extends shape_1.Shape {
    constructor(xPos, yPos, width, height) {
        super(xPos, yPos);
        this.width = width;
        this.height = height;
    }
    ;
    move() { }
    ;
}
exports.Ellipse = Ellipse;
