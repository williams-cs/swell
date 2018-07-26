"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Scope_1 = require("./Scope");
const space_lift_1 = require("space-lift");
class SequenceNode {
    constructor(left, right) {
        this._newLine = false;
        this._left = left;
        this._right = right;
    }
    newLine() {
        return this._newLine;
    }
    draw(context, dims, ast) {
    }
    toString() {
        let result = this._left.toString();
        if (this._left.newLine() == true) {
            result += '\n';
        }
        else {
            result += ";\n";
        }
        if (this._right.newLine() == false) {
            result += this._right.toString() + ";";
        }
        else {
            result += this._right.toString();
        }
        return result;
    }
    eval(context) {
        let leftScope = new Scope_1.Scope(context, context.effects, context.myState, context.eventLog);
        leftScope.canvas = space_lift_1.Some(context.canvas.get());
        //throwing away after evaling
        this._leftVal = this._left.eval(leftScope);
        this._rightVal = this._right.eval(leftScope); // leftScope may be modified now
    }
    set left(left) {
        this._left = left;
    }
    get left() {
        return this._left;
    }
    set right(right) {
        this._right = right;
    }
    get right() {
        return this._right;
    }
    get leftVal() {
        return this._leftVal;
    }
    get rightVal() {
        return this._rightVal;
    }
}
exports.SequenceNode = SequenceNode;
//# sourceMappingURL=SequenceNode.js.map