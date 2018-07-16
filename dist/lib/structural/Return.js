"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../..");
class Return {
    constructor(expr) {
        this._expr = expr;
    }
    eval(context) {
        // If return val is a var, returns that var's value
        let result = this._expr.eval(context);
        console.log("return result: " + result);
        throw new __1.ReturnError(result, context.retIDLookup());
        //return this._expr.eval(context); // will need typechecking at some point
    }
    draw(context, x, y) { }
}
exports.Return = Return;
//# sourceMappingURL=Return.js.map