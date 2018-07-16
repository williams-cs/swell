"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ListNode {
    constructor(list) {
        this._list = list;
    }
    eval(context) {
        let evalList = [];
        for (let expr of this._list) {
            evalList.push(expr.eval(context));
        }
        return new ListNode(evalList);
    }
    draw() {
    }
    get list() {
        return this._list;
    }
}
exports.ListNode = ListNode;
//# sourceMappingURL=ListNode.js.map