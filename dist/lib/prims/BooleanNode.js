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