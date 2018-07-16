"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../..");
class ForNode {
    constructor(init, cond, adj, body) {
        this._init = init;
        this._cond = cond;
        this._adj = adj;
        this._body = body; // can also be separate, just difference in parsing
    }
    eval(context) {
        let childCtx = new __1.Scope(context);
        let res = this._cond.eval(childCtx);
        if (!(res instanceof __1.BooleanNode)) {
            throw new Error("The condition must be a boolean expression.");
        }
        this._init.eval(childCtx); // initialize var
        let ret;
        //let adjust;
        while (res.val) {
            //console.log("Result.val: " + res.val);
            //console.log("I'm infinitely looping");
            ret = this._body.eval(childCtx);
            res = this._cond.eval(childCtx);
            this._adj.eval(childCtx);
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
exports.ForNode = ForNode;
//# sourceMappingURL=ForNode.js.map