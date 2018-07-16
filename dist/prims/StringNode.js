"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../..");
// Nodes representing strings
// Should abstract Node class implement Expression?
class StringNode {
    constructor(str) {
        this._str = str;
    }
    ;
    eval(context) {
        return this;
    }
    draw(context, x, y) {
        //let e = new StringEffect(this);
        let e = new __1.StringEffect(this);
        e.draw(context, x, y);
    }
    set str(value) {
        this._str = value;
    }
    get val() {
        return this._str;
    }
}
exports.StringNode = StringNode;
//# sourceMappingURL=StringNode.js.map