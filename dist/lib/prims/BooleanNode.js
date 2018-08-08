"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BooleanNode {
    constructor(val, ws) {
        this._newLine = false;
        //super(parent);
        this._val = val;
        this._ws = ws;
        if (ws == undefined) {
            this._ws = "";
        }
    }
    ;
    eval(context) {
        return this;
    }
    draw(context, dims, ast) {
        throw new Error("Not implemented");
    }
    equalsVal(right) {
        if (right instanceof BooleanNode) {
            return this.val === right.val;
        }
        return false;
    }
    toString() {
        return this._ws + this._val;
    }
    get val() {
        return this._val;
    }
    set val(value) {
        this._val = value;
    }
    newLine() {
        return this._newLine;
    }
}
exports.BooleanNode = BooleanNode;
//# sourceMappingURL=BooleanNode.js.map