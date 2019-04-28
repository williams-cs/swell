import { Expression } from "../Expression";
import { Scope } from "../structural/Scope";

export class ListNode extends Expression<ListNode> {

    /**
     * Constructor for an array-like list
     * @param list The list, stored in a TS array
     * @param preOpenBracketWs Preceding whitespace
     * @param emptyListWs Whitespace when list is empty
     */
    constructor(
        private list: Array<[Expression<any>, string]>,
        preOpenBracketWs: string = "",
        private emptyListWs: string = "") {
        super(preOpenBracketWs);
    }

    /**
     * Evaluates each element of the list and pushes it onto the internal representation
     * @param context
     */
    eval(scope: Scope): ListNode {
        let evalList: Array<[Expression<any>, string]> = [];
        for (let tup of this.list) {
            evalList.push([tup[0].eval(scope), tup[1]]);
        }
        return new ListNode(evalList);
    }

    toString(): string {
        let str = "";
        if (this.list.length == 0) {
            str = this.emptyListWs;
        } else {
            str = this.list[0][0] + this.list[0][1];
            for (let i = 1; i < this.list.length; i++) {
                str += `,${this.list[i][0]}${this.list[i][1]}`;
            }
        }

        return `${this.ws}[${str}]`;
    }

    equals(right: Expression<any>): boolean {
        if (!(right instanceof ListNode)) {
            return false;
        }
        for (let i = 0; i < this.list.length; i++) {
            if (!(this.list[i][0].equals(right.list[i][0]))) {
                return false;
            }
        }
        return true;
    }
}
