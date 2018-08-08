"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NOP {
    constructor() {
        this._newLine = true;
    }
    eval(context) {
        return this;
    }
    draw(context, dims, ast) { }
    toString() {
        return "";
    }
    equalsVal(right) {
        return false;
    }
    newLine() {
        return this._newLine;
    }
}
exports.NOP = NOP;
//# sourceMappingURL=NOP.js.map