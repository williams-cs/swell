"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Scope_1 = require("../structural/Scope");
class FunDef {
    constructor(name, body, args, ws) {
        this._newLine = true;
        this._name = name;
        this._body = body;
        this._args = args;
        this._ws = ws;
        if (ws == undefined) {
            this._ws = "";
        }
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
    newLine() {
        return this._newLine;
    }
    toString() {
        let argsList = '';
        for (let i = 0; i < this._args.length - 1; i++) {
            argsList += this._args[i] + ", ";
        }
        argsList += this._args[this._args.length - 1];
        return this._ws + "fun " + this._name + "(" + argsList + ')' + ' {\n ' + this._body.toString() + '}';
    }
    draw(context, dims, ast) {
        throw new Error("Not implemented");
    }
    equalsVal(right) {
        throw new Error("Cannot call equals directly on functions");
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
//# sourceMappingURL=FunDef.js.map