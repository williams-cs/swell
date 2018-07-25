"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import { ListHead } from "./ListHead";
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
    toString() {
        let list = '';
        for (let i = 0; i < this._list.length - 1; i++) {
            list += this._list[i].toString() + ", ";
        }
        list += this._list[this._list.length - 1].toString();
        return '[' + list + ']';
    }
    draw() {
    }
    get list() {
        return this._list;
    }
}
exports.ListNode = ListNode;
//# sourceMappingURL=ListNode.js.map