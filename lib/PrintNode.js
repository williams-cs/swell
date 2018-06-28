"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PrintNode {
    constructor(toPrint) {
        this._toPrint = toPrint;
    }
    draw(context) {
    }
    // eval param and call draw
    eval(context) {
        this._toPrint.draw(context);
    }
}
exports.PrintNode = PrintNode;
