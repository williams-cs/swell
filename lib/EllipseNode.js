"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = require("./Node");
class EllipseNode extends Node_1.Node {
    constructor(//ellipse: Ellipse, 
    parent, xPos, yPos, width, height) {
        super(parent);
        //this.ellipse = ellipse;
        this.xPos = xPos;
        this.yPos = yPos;
        this.width = width;
        this.height = height;
    }
    eval() {
        // how evaluate to an ellipse?
        return null;
    }
}
exports.EllipseNode = EllipseNode;
