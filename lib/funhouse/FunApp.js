"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Application of a function. Assumes arg values passed in same order as FunDef args
class FunApp {
    constructor(funct, args) {
        this._funct = funct;
        this._args = args;
    }
    get funct() {
        return this._funct;
    }
    // Assigns args to values in new context
    eval(context) {
        let fundef = context.lookup(this._funct.name, context); // looking up function
        //let child = new Scope(fundef.scope); // avoiding overwrite; need to toss after returning
        let child = fundef.scope.copy(); // Copying definition scope
        if (this._args != null) {
            for (let i = 0; i < this._args.length; i++) { //lookups?
                //child.declare(this._funct.args[i]); // redeclare?
                child.assign(this._funct.args[i], this._args[i]); // need to declare as well?
            }
        }
        return this._funct.body.eval(child);
    }
}
exports.FunApp = FunApp;
