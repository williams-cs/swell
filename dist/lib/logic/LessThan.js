"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BooleanNode_1 = require("../prims/BooleanNode");
const NumberNode_1 = require("../prims/NumberNode");
class LessThan {
    constructor(left, right, ws) {
        this._newLine = false;
        this._left = left;
        this._right = right;
        this._ws = ws;
        if (ws == undefined) {
            this._ws = "";
        }
    }
    toString() {
        return this._left.toString() + ' < ' + this._right.toString();
    }
    newLine() {
        return this._newLine;
    }
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
    equalsVal(right) {
        throw new Error("Cannot call equals on logical ops");
    }
    draw() {
        throw new Error("Cannot call draw on logical ops");
    }
    get left() {
        return this._left;
    }
    get right() {
        return this._right;
    }
}
exports.LessThan = LessThan;
//# sourceMappingURL=LessThan.js.map