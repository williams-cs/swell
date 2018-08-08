"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StringEffect_1 = require("../effects/StringEffect");
//import{Node} from './Node';
// Nodes representing strings
// Should abstract Node class implement Expression?
class StringNode {
    constructor(str, ws) {
        this._newLine = false;
        this._str = str;
        this._ws = ws;
        if (ws == undefined) {
            this._ws = "";
        }
    }
    eval(context) {
        return this;
    }
    draw(context, dims, ast) {
        let e = new StringEffect_1.StringEffect(this);
        e.draw(context, dims, ast);
    }
    toString() {
        return this._ws + '\"' + this._str + '\"';
    }
    set str(value) {
        this._str = value;
    }
    get val() {
        return this._str;
    }
    newLine() {
        return this._newLine;
    }
}
exports.StringNode = StringNode;
//# sourceMappingURL=StringNode.js.map