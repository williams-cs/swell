"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import {Node} from './Node';
const Shape_1 = require("./Shape");
class EllipseNode extends Shape_1.Shape {
    constructor(//ellipse: Ellipse, 
    color, xPos, yPos, width, height) {
        //this.ellipse = ellipse;
        super(color, xPos, yPos);
        this.width = width;
        this.height = height;
    }
    // get methods? 
    eval() {
        // how evaluate to an ellipse?
        return null;
    }
    move() { }
}
exports.EllipseNode = EllipseNode;
