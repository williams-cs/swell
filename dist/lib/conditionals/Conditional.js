"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Scope_1 = require("../structural/Scope");
const BooleanNode_1 = require("../prims/BooleanNode");
const space_lift_1 = require("space-lift");
class Conditional {
    /**
     * The constructor for conditionals (if, else if, and else statements)
     * @param test The condition of the statement
     * @param trueBranch The branch to follow if the condition evaluates to true
     * @param falseBranch The branch to follow if the condition evaluates to false
     */
    constructor(test, trueBranch, falseBranch) {
        this._newLine = true;
        this._test = test;
        this._trueBranch = trueBranch;
        this._falseBranch = falseBranch;
    }
    /**
     * Checks the test result and returns the result of the true or false branch, depending on the test
     * @param context The current program context
     */
    eval(context) {
        let childCtx = new Scope_1.Scope(context);
        childCtx.canvas = space_lift_1.Some(context.canvas.get());
        let res = this._test.eval(childCtx);
        if (!(res instanceof BooleanNode_1.BooleanNode)) {
            throw new Error("The condition must be a boolean expression.");
        }
        if (res.val) {
            return this._trueBranch.eval(childCtx);
        }
        else if (this._falseBranch != null) { // check if else/else if is null or undefined
            return this._falseBranch.eval(childCtx); // possibly a bad idea
        }
    }
    /**
     * Returns a string representation of the conditional statement
     */
    toString() {
        let res = 'if(' + this._test.toString() + ") {\n " + this._trueBranch.toString() + "}";
        if (this._falseBranch !== undefined) {
            res += '\nelse {\n ' + this._falseBranch.toString() + '}';
        }
        return res;
    }
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine() {
        return this._newLine;
    }
    /**
     * Returns the true branch of the conditional
     */
    get trueBranch() {
        return this._trueBranch;
    }
    /**
     * Returns the false branch of the conditional
     */
    get falseBranch() {
        return this._falseBranch;
    }
    /**
     * Conditionals cannot be drawn directly
     */
    draw() {
        throw new Error("Not implemented");
    }
    /**
     * Equals cannot be called directly on a conditional
     * @param right
     */
    equalsVal(right) {
        throw new Error("Cannot call equals directly on conditionals");
    }
}
exports.Conditional = Conditional;
//# sourceMappingURL=Conditional.js.map