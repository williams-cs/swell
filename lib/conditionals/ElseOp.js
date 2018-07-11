"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ElseOp {
    constructor(body) {
        this._body = body;
    }
    eval(context) {
        //this._body.eval(new Scope(context)); // new context?
        //this._body.eval(context);
        return this._body.eval(context);
        //return this._body.eval(new Scope(context));
        //return this._body.eval(context);
    }
    draw() {
    }
    get body() {
        return this._body;
    }
}
exports.ElseOp = ElseOp;
