"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class VariableNode {
    //private _val: Expression<any>;
    constructor(name) {
        this._name = name;
        //this._val = val;
    }
    eval(context) {
        //todo: grab val from context
        return context.lookup(this._name);
    }
    // add get/set
    get name() {
        return this._name;
    }
}
exports.VariableNode = VariableNode;
