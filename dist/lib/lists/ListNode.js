"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import { ListHead } from "./ListHead";
class ListNode {
    constructor(list, ws) {
        this._newLine = false;
        this._list = list;
        this._ws = ws;
        if (ws == undefined) {
            this._ws = "";
        }
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
        return this._ws + '[' + list + ']';
    }
    equalsVal(right) {
        if (right instanceof ListNode) {
            for (let i = 0; i < this.list.length; i++) {
                if (!(this.list[i].equalsVal(right.list[i]))) {
                    return false;
                }
            }
            return true;
        }
        return false;
    }
    draw() {
        throw new Error("Cannot draw a ListNode");
    }
    get list() {
        return this._list;
    }
    newLine() {
        return this._newLine;
    }
}
exports.ListNode = ListNode;
//# sourceMappingURL=ListNode.js.map