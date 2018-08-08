"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class VariableNode {
    //private _val: Expression<any>;
    constructor(name, ws) {
        this._newLine = false;
        this._name = name;
        //this._val = val;
        this._ws = ws;
        if (ws == undefined) {
            this._ws = "";
        }
    }
    eval(context) {
        //todo: grab val from context
        //console.log("looking up: " + this._name);
        return context.lookup(this._name, context);
    }
    draw(context, dims, ast) {
    }
    equalsVal(right) {
        throw new Error("Cannot directly compare vars, eval first");
    }
    toString() {
        return this._ws + this._name;
    }
    get name() {
        return this._name;
    }
    newLine() {
        return this._newLine;
    }
}
exports.VariableNode = VariableNode;
//# sourceMappingURL=VariableNode.js.map