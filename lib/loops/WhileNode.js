"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
class WhileNode {
    constructor(cond, body) {
        this._cond = cond;
        this._body = body; // can also be separate, just difference in parsing
    }
    eval(context) {
        let childCtx = new __1.Scope(context);
        let res = this._cond.eval(childCtx);
        if (typeof res != 'boolean') {
            throw new Error("The condition must be a boolean expression.");
        }
        let ret;
        while (res) {
            ret = this._body.eval(childCtx);
            res = this._cond.eval(childCtx);
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
