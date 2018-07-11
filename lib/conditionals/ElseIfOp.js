"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ElseIfOp {
    constructor(cond, body) {
        this._cond = cond;
        this._body = body;
    }
    eval(context) {
        if (this._cond.eval(context)) {
            //this._body.eval(new Scope(context)); // new context?
            //this._body.eval(context);
            return this._body.eval(context);
            //return this._body.eval(new Scope(context));
        }
        return null;
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
exports.ElseIfOp = ElseIfOp;
