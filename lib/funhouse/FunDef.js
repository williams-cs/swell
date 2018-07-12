"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Scope_1 = require("../structural/Scope");
class FunDef {
    constructor(name, body, args) {
        this._name = name;
        this._body = body;
        this._args = args;
    }
    ;
    // Binds args in context of definition; no values
    // Binds name to parent context (cur context is new context)
    eval(context) {
        this._funScope = new Scope_1.Scope(context);
        /*
        if(this._args != null){
            for(let entry of this._args){
                this._funScope.declare(entry);
            }
        }
        */
        context.declare(this._name); // assign with val function
        context.assign(this._name, this); // parent or current?
        return null;
    }
    draw(context, x, y) {
        //NO
    }
    // Get methods
    get name() {
        return this._name;
    }
    get body() {
        return this._body;
    }
    get args() {
        return this._args;
    }
    get scope() {
        return this._funScope;
    }
}
exports.FunDef = FunDef;
