"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ReturnError_1 = require("./ReturnError");
class Return {
    constructor(expr) {
        this._newLine = false;
        this._expr = expr;
    }
    eval(context) {
        // If return val is a var, returns that var's value
        let result = this._expr.eval(context);
        console.log("return result: " + result);
        throw new ReturnError_1.ReturnError(result, context.retIDLookup());
        //return this._expr.eval(context); // will need typechecking at some point
    }
    toString() {
        return "return " + this._expr.toString();
    }
    newLine() {
        return this._newLine;
    }
    draw(context, dims, ast) { }
}
exports.Return = Return;
//# sourceMappingURL=Return.js.map