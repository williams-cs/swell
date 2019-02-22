import { Expression } from "../Expression";
import { Scope } from "../structural/Scope";

export class ListNode extends Expression<ListNode> {

    /**
     * Constructor for an array-like list
     * @param list The list, stored in a TS array
     * @param lws Preceding whitespace
     * @param rws Post whitespace
     */
    constructor(private _list: Expression<any>[], lws: string = "", rws: string = "") {
        super(lws, rws);
    }

    /**
     * Evaluates each element of the list and pushes it onto the internal representation
     * @param context
     */
    eval(context: Scope): ListNode {
        let evalList: Expression<any>[] = [];
        for (let expr of this.list) {
            evalList.push(expr.eval(context));
        }
        return new ListNode(evalList);
    }

    toString(): string {
        let list = '';
        for (let i = 0; i < this.list.length - 1; i++) {
            list += this.list[i].toString() + ", ";
        }
        list += this.list[this.list.length - 1].toString();
        return this.lws + '[' + list + ']' + this.rws;
    }

    equals(right: Expression<any>): boolean {
        if (!(right instanceof ListNode)) {
            return false;
        }
        for (let i = 0; i < this.list.length; i++) {
            if (!(this.list[i].equals(right.list[i]))) {
                return false;
            }
        }
        return true;
    }

    /**
     * Returns the internal representation of the list
     */
    get list(): Expression<any>[] {
        return this._list;
    }
}
