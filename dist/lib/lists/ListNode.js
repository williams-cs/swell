"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ListNode {
    /**
     * Constructor for an array-like list
     * @param list The list, stored in a TS array
     * @param ws Preceding whitespace
     */
    constructor(list, ws) {
        this._newLine = false;
        this._list = list;
        this._ws = ws;
        if (ws == undefined) {
            this._ws = "";
        }
    }
    /**
     * Evaluates each element of the list and pushes it onto the internal representation
     * @param context
     */
    eval(context) {
        let evalList = [];
        for (let expr of this._list) {
            evalList.push(expr.eval(context));
        }
        return new ListNode(evalList);
    }
    /**
     * Returns a string representation of the list
     */
    toString() {
        let list = '';
        for (let i = 0; i < this._list.length - 1; i++) {
            list += this._list[i].toString() + ", ";
        }
        list += this._list[this._list.length - 1].toString();
        return this._ws + '[' + list + ']';
    }
    /**
     * Returns whether the list equals another list
     * @param right The right side of the equality (must be a ListNode)
     */
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
    /**
     * Draw cannot be called directly on a list
     */
    draw() {
        throw new Error("Cannot draw a ListNode");
    }
    /**
     * Returns whether the element is terminated by a newline (true) or semicolon (false)
     */
    newLine() {
        return this._newLine;
    }
    /**
     * Returns the internal representation of the list
     */
    get list() {
        return this._list;
    }
}
exports.ListNode = ListNode;
//# sourceMappingURL=ListNode.js.map