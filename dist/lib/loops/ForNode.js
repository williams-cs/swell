"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Scope_1 = require("../structural/Scope");
const BooleanNode_1 = require("../prims/BooleanNode");
class ForNode {
    constructor(init, cond, post, body, ws) {
        this._newLine = true;
        this._init = init;
        this._cond = cond;
        this._post = post;
        this._body = body;
        this._ws = ws;
    }
    eval(context) {
        let childCtx = new Scope_1.Scope(context);
        this._init.eval(childCtx); // initialize var
        let res = this._cond.eval(childCtx);
        if (!(res instanceof BooleanNode_1.BooleanNode)) {
            throw new Error("The condition must be a boolean expression.");
        }
        let ret;
        //let adjust;
        while (res.val) {
            ret = this._body.eval(childCtx);
            this._post.eval(childCtx);
            res = this._cond.eval(childCtx);
            //this._post.eval(childCtx);
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
    equalsVal(right) {
        throw new Error("Cannot call equals on For loop");
    }
    draw(context, dims, ast) {
        return "Cannot call draw on For loop";
    }
    toString() {
        return this._ws + 'for(' + this._init.toString() + ", " + this._cond.toString() + ", " + this._post.toString() + ") {\n "
            + this._body.toString() + "}";
    }
    newLine() {
        return this._newLine;
    }
}
exports.ForNode = ForNode;
//# sourceMappingURL=ForNode.js.map