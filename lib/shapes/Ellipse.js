"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Shape_1 = require("./Shape");
class Ellipse extends Shape_1.Shape {
    constructor(color, xPos, yPos, width, height) {
        super(color, xPos, yPos);
        this.width = width;
        this.height = height;
    }
    ;
    move() { }
    ;
}
exports.Ellipse = Ellipse;
