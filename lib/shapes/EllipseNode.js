"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import {Node} from './Node';
const Shape_1 = require("./Shape");
class EllipseNode extends Shape_1.Shape {
    constructor(//ellipse: Ellipse, 
    color, xPos, yPos, width, height) {
        //this.ellipse = ellipse;
        // Make width and height NumNodes?
        super(color, xPos, yPos);
        this._width = width;
        this._height = height;
    }
    draw(context, x, y) {
    }
    eval(context) {
        // how evaluate to an ellipse?
        return null;
    }
    move() { }
    get width() {
        return this._width;
    }
    set width(width) {
        this._width = width;
    }
    get heigth() {
        return this._height;
    }
    set height(height) {
        this._height = height;
    }
}
exports.EllipseNode = EllipseNode;
