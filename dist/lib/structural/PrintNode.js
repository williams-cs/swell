"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PrintNode {
    /**
     * Constructor for a PrintNode, representing an object to be printed
     * @param toPrint The object to be printed
     * @param coordsGiven Whether the xy coordinates to print the object is given
     * @param dimensions The dimensions of the object to be printed
     * @param ws Preceding whitespace
     */
    constructor(toPrint, coordsGiven, dimensions, ws) {
        this._scale = 1;
        this._newLine = false;
        this._toPrint = toPrint;
        this._coordsGiven = coordsGiven;
        this._ws = ws;
        if (ws == undefined) {
            this._ws = "";
        }
        this._dims = dimensions || null;
    }
    /**
     * Returns a string representation of the object to be printed
     */
    toString() {
        return this._ws + "print(" + this.toPrint.toString() + ", " + this.dims.toString() + ")";
    }
    /**
     * Equals cannot be called directly on a PrintNode
     * @param right
     */
    equalsVal(right) {
        throw new Error("Cannot call equals on PrintNode");
    }
    /**
     * PrintNodes cannot be drawn directly
     * @param context
     * @param dims
     * @param ast
     */
    draw(context, dims, ast) {
        throw new Error("Cannot call draw() on printOp");
    }
    /**
     * Evaluates the object to be printed and draws it
     * @param context
     */
    eval(context) {
        let res = this._toPrint.eval(context);
        if (this._coordsGiven) {
            res.draw(context, this._dims, this);
            //check if the effects array already has some elements
        } /*() else if (context.effects.length > 0) {

        }*/
        return res;
    }
    /**
     * Returns the object to be printed
     */
    get toPrint() {
        return this._toPrint;
    }
    /**
     * Returns the dimensions of the object to be printed
     */
    get dims() {
        return this._dims;
    }
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine() {
        return this._newLine;
    }
}
exports.PrintNode = PrintNode;
//# sourceMappingURL=PrintNode.js.map