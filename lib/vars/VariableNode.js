"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class VariableNode {
    //private _val: Expression<any>;
    constructor(name) {
        this._name = name;
        //this._val = val;
    }
    draw(context) {
    }
    eval(context) {
        //todo: grab val from context
        console.log("looking up: " + this._name);
        return context.lookup(this._name, context);
    }
    // add get/set
    get name() {
        return this._name;
    }
}
exports.VariableNode = VariableNode;
