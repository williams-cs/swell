"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IfOp {
    constructor(cond, body) {
        this._cond = cond;
        this._body = body;
    }
    eval(context) {
        let condresult = this._cond.eval(context);
        console.log("Condition result: " + condresult);
        if (condresult) {
            //this._body.eval(new Scope(context)); // new context?
            //this._body.eval(context);
            let result = this._body.eval(context);
            console.log("If result (IfOp): " + result);
            return result;
            //return this._body.eval(new Scope(context));
        }
        //return null; // could this be a problem?
        //return this._body.eval(context);
    }
    draw() {
    }
    get cond() {
        return this._cond;
    }
    get body() {
        return this._body;
    }
}
exports.IfOp = IfOp;
