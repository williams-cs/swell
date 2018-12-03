"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NumberNode_1 = require("../prims/NumberNode");
const CurveEffect_1 = require("../effects/CurveEffect");
class CurveNode {
    /**
     * Constructor for a CurveNode, a node representing a curve
     * @param dx the run of the curve
     * @param dy the rise of the curve
     * @param curvature how much the curve, umm, curves
     * @param ws Preceding whitespace
     */
    constructor(dx, dy, curvature, ws) {
        this._newLine = false;
        this._dx = dx;
        this._dy = dy;
        this._curvature = curvature;
        this._ws = ws;
        if (ws == undefined) {
            this._ws = "";
        }
    }
    /**
     * Returns this CurveNode
     * @param context The current program context
     */
    eval(context) {
        return this;
    }
    /**
     * Draws the curve using CurveEffect
     * @param context The current program context
     * @param dims The line dimensions
     * @param ast The program AST
     */
    draw(context, dims, ast) {
        dims.width = new NumberNode_1.NumberNode(this._dx.eval(context).val, "");
        dims.height = new NumberNode_1.NumberNode(this._dy.eval(context).val, "");
        dims.curvature = new NumberNode_1.NumberNode(this._curvature.eval(context).val, "");
        let e = new CurveEffect_1.CurveEffect(this);
        e.draw(context, dims, ast);
    }
    /**
     * Returns whether this CurveNode equals another (if their dx, dy, and curvature are equal)
     * @param right The right side of the equality (must be a CurveNode)
     */
    equalsVal(right) {
        if (right instanceof CurveNode) {
            return (this.dx.equalsVal(right.dx) && this.dy.equalsVal(right.dy) && this.curvature.equalsVal(right.curvature));
        }
        return false;
    }
    move() { }
    /**
     * Returns a string representation of the curve
     */
    toString() {
        return this._ws + "curve(" + this._dx.toString() + ", " + this._dy.toString() + ", " + this._curvature.toString() + ")";
    }
    /**
     * Returns the run of the curve
     */
    get dx() {
        return this._dx;
    }
    /**
     * Sets the run of the curve
     */
    set dx(dx) {
        this._dx = dx;
    }
    /**
     * Returns the rise of the curve
     */
    get dy() {
        return this._dy;
    }
    /**
     * Sets the rise of the curve
     */
    set dy(dy) {
        this._dy = dy;
    }
    /**
     * Returns the curvature of the curve
     */
    get curvature() {
        return this._curvature;
    }
    /**
     * Sets the curvature of the curve
     */
    set curvature(curvature) {
        this._curvature = curvature;
    }
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine() {
        return this._newLine;
    }
}
exports.CurveNode = CurveNode;
//# sourceMappingURL=CurveNode.js.map