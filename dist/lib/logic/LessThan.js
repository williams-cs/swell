"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BooleanNode_1 = require("../prims/BooleanNode");
const NumberNode_1 = require("../prims/NumberNode");
class LessThan {
    /**
     * Constructor for LessThan (<) operation
     * @param left Left side of operation
     * @param right Right side of operation
     * @param ws Preceding whitespace
     */
    constructor(left, right, ws) {
        this._newLine = false;
        this._left = left;
        this._right = right;
        this._ws = ws;
        if (ws == undefined) {
            this._ws = "";
        }
    }
    /**
     * Performs the LessThan comparison and returns BooleanNode with result
     * @param context The current program context
     */
    eval(context) {
        //console.log(this._left.eval(context) + " is less than " + this._right.eval(context));
        let lhs = this._left.eval(context);
        let rhs = this._right.eval(context);
        if (lhs instanceof NumberNode_1.NumberNode && rhs instanceof NumberNode_1.NumberNode) {
            //console.log("They're both number nodes");
            //console.log(lhs.val + "<" + rhs.val);
            //let bool: boolean = lhs.val < rhs.val;
            //console.log("bool: " + bool);
            return (new BooleanNode_1.BooleanNode(lhs.val < rhs.val));
        }
        else {
            throw new Error("Arguments to less than must produce numeric values.");
        }
    }
    /**
     * Returns string representation of operation
     */
    toString() {
        return this._left.toString() + ' < ' + this._right.toString();
    }
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine() {
        return this._newLine;
    }
    /**
     * Equals cannot be called directly on LessThan op
     * @param right
     */
    equalsVal(right) {
        throw new Error("Cannot call equals on logical ops");
    }
    /**
     * LessThan op cannot be drawn directly
     */
    draw() {
        throw new Error("Cannot call draw on logical ops");
    }
    /**
     * Returns left side of operation
     */
    get left() {
        return this._left;
    }
    /**
     * Returns right side of operation
     */
    get right() {
        return this._right;
    }
}
exports.LessThan = LessThan;
//# sourceMappingURL=LessThan.js.map