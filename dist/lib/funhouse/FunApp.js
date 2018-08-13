"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ReturnError_1 = require("../structural/ReturnError");
const space_lift_1 = require("space-lift");
// Application of a function. Assumes arg values passed in same order as FunDef args
class FunApp {
    /**
     * The constructor for a function application
     * @param name The name of the function
     * @param args Function arguments, if applicable
     * @param ws Preceding whitespace
     * @param defaultValue The default return value of the function, if any
     */
    constructor(name, args, ws, defaultValue) {
        this._defaultValue = undefined;
        this._newLine = false;
        this._name = name;
        this._args = args;
        this._defaultValue = defaultValue;
        this._ws = ws;
        if (ws == undefined) {
            this._ws = "";
        }
    }
    /**
     * Evaluates the function application
     * @param context
     */
    eval(context) {
        let fundef = context.lookup(this._name, context); // looking up function
        //let child = new Scope(fundef.scope); // avoiding overwrite; need to toss after returning
        let child = fundef.scope.copy(); // Copying definition scope
        // Assigns arg values to definition arguments
        if (this._args != null) {
            for (let i = 0; i < this._args.length; i++) { //lookups?
                //child.declare(this._funct.args[i]); // redeclare?
                child.assign(fundef.args[i], this._args[i]);
            }
        }
        let id = context.globalFunID; // Assigns an ID to the function
        context.globalFunID++;
        child.retValID = space_lift_1.Some(id); // new method
        // we only return a value with function application
        // if it is explicitly returned using a return statement;
        // we abuse JS exceptions for this purpose
        try {
            child.hadFunEval = true;
            fundef.body.eval(child);
            return this._defaultValue;
        }
        catch (e) {
            // make sure that we catch only the error intended for us
            if (e instanceof ReturnError_1.ReturnError && parseInt(e.ID) == id) {
                return e.retVal;
            }
            // error was not intended for us; rethrow
            throw e;
        }
        return fundef.body.eval(child);
    }
    /**
     * Returns a string representation of the function application
     */
    toString() {
        let argsList = '';
        if (this._args.length > 0) {
            for (let i = 0; i < this._args.length - 1; i++) {
                argsList += this._args[i].toString() + ", ";
            }
            argsList += this._args[this._args.length - 1].toString();
        }
        return this._ws + this.name + '(' + argsList + ")";
    }
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine() {
        return this._newLine;
    }
    /**
     * Function applications cannot be drawn directly
     * @param context
     * @param dims
     * @param ast
     */
    draw(context, dims, ast) {
        throw new Error("Not implemented");
    }
    /**
     * Equals cannot be called directly on a function application
     * @param right
     */
    equalsVal(right) {
        throw new Error("Cannot call equals directly on functions");
    }
    /**
     * Returns the name of the function
     */
    get name() {
        return this._name;
    }
    /**
     * Returns the arguments of the function
     */
    get args() {
        return this._args;
    }
}
exports.FunApp = FunApp;
//# sourceMappingURL=FunApp.js.map