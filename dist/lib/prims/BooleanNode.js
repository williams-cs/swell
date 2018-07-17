"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BooleanNode {
    constructor(val) {
        //super(parent);
        this._val = val;
    }
    ;
    eval(context) {
        return this;
    }
    draw(context, x, y) {
    }
    get val() {
        return this._val;
    }
    set val(value) {
        this._val = value;
    }
}
exports.BooleanNode = BooleanNode;
//# sourceMappingURL=BooleanNode.js.map