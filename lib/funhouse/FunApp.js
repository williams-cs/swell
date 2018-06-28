"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const v4 = require("uuid/v4");
const ReturnError_1 = require("../ReturnError");
const space_lift_1 = require("space-lift");
// Application of a function. Assumes arg values passed in same order as FunDef args
class FunApp {
    constructor(name, args, defaultValue) {
        this._defaultValue = undefined;
        this._name = name;
        this._args = args;
        this._defaultValue = defaultValue;
    }
    // Assigns args to values in new context
    eval(context) {
        let fundef = context.lookup(this._name, context); // looking up function
        //let child = new Scope(fundef.scope); // avoiding overwrite; need to toss after returning
        let child = fundef.scope.copy(); // Copying definition scope
        if (this._args != null) {
            for (let i = 0; i < this._args.length; i++) { //lookups?
                //child.declare(this._funct.args[i]); // redeclare?
                child.assign(fundef.args[i], this._args[i]);
            }
        }
        // the ID of the return value
        //let id = v5("warp-lab.williams.edu",v5.DNS); // generate a unique ID for this function application
        //let id2 = v5("warp-lab.williams.edu",v5.DNS);
        let id = v4();
        //let id2 = v4();
        //console.log("ID1: " + id);
        //console.log("ID2: " + id2);
        child.retValID = space_lift_1.Some(id); // new method
        //console.log(child.retValID.get());
        // we only return a value with function application
        // if it is explicitly returned using a return statement;
        // we abuse JS exceptions for this purpose
        try {
            fundef.body.eval(child);
            return this._defaultValue;
        }
        catch (e) {
            // make sure that we catch only the error intended for us
            if (e instanceof ReturnError_1.ReturnError && e.ID == id) {
                return e.retVal;
            }
            // error was not intended for us; rethrow
            throw e;
        }
        return fundef.body.eval(child);
    }
    draw(context) {
        // this will have to do something
    }
    get name() {
        return this._name;
    }
}
exports.FunApp = FunApp;
