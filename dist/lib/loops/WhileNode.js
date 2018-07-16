"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Scope_1 = require("../structural/Scope");
const BooleanNode_1 = require("../prims/BooleanNode");
class WhileNode {
    constructor(cond, body) {
        this._cond = cond;
        this._body = body;
    }
    eval(context) {
        let childCtx = new Scope_1.Scope(context);
        let res = this._cond.eval(childCtx);
        if (!(res instanceof BooleanNode_1.BooleanNode)) {
            throw new Error("The condition must be a boolean expression.");
        }
        let ret;
        while (res.val) {
            //console.log("Result.val: " + res.val);
            //console.log("I'm infinitely looping");
            ret = this._body.eval(childCtx);
            res = this._cond.eval(childCtx);
            //ret = this._body.eval(childCtx);
        }
        return ret;
        //let test = this._cond.eval(context);
        //console.log("test: " + test);
        //while(this._cond.eval(context)){
        //while(this._cond.eval(context)){
        /*
    while(this._cond.eval(context)){
        this._body.eval(context);
    }
    */
        //this._body.eval(context);
        //}
    }
    draw(context, x, y) {
    }
}
exports.WhileNode = WhileNode;
//# sourceMappingURL=WhileNode.js.map