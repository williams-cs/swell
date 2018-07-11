"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Conditional {
    constructor(ifOp, elseOp, ...elseIfOps) {
        this._ifOp = ifOp;
        this._elseOp = elseOp;
        this._elseIfOps = elseIfOps;
    }
    eval(context) {
        this._ifRes = this._ifOp.eval(context); // evaluate if
        console.log("ifres (in Conditional): " + this._ifRes);
        console.log("elseOp: " + this._elseOp);
        if (this._ifRes !== null) { // if if condition met, returns result of if body
            return this._ifRes;
        }
        else if (this._elseIfOps != null) { // if if condition not met, checks elseIfs
            for (let entry of this._elseIfOps) {
                this._elseIfRes = entry.eval(context);
                if (this._elseIfRes !== null)
                    return this._elseIfRes;
            }
        }
        else if (this._elseOp != undefined) { // if if and elseIf conditions not met, executes Else statement if extant
            console.log("Evaluating the Else");
            return this._elseOp.eval(context);
        }
        //return null; // necessary?
    }
    draw() {
    }
}
exports.Conditional = Conditional;
