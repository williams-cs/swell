"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UnaryOperation {
    constructor(_val) {
        this._val = _val;
        this._newLine = false;
    }
    ;
    draw(context, dims, ast) { }
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
exports.UnaryOperation = UnaryOperation;
//# sourceMappingURL=UnaryOperation.js.map