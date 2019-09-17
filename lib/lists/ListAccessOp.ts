import { Expression } from "../Expression";
import { NumberNode } from "../prims/NumberNode";
import { Scope } from "../structural/Scope";
import { ListNode } from "./ListNode";
import { StringNode } from "../prims/StringNode";

export class ListAccessOp extends Expression<any> {

    constructor(
        private expr: Expression<any>,
        private idx: Expression<any>,
        preOpenBracketWs: string = "",
        private preCloseBracketWs: string = ""
    ) {
        super(preOpenBracketWs);
    }

    eval(scope: Scope): Expression<any> {
        let exprVal = this.expr.eval(scope);
        if (!(exprVal instanceof ListNode || exprVal instanceof StringNode)) {
            throw new Error("Expression is not indexable");
        }
        let idxVal = this.idx.eval(scope);
        if (!(idxVal instanceof NumberNode)) {
            throw new Error("Index is not a number");
        }
        let list = exprVal.val;
        let listIdx = idxVal.val;
        if (listIdx >= list.length || listIdx < 0) {
            throw new Error("Index out of range");
        }
        let returnVal = list[listIdx];
        return (returnVal instanceof Expression) ? returnVal : new StringNode(returnVal);
    }

    toString(): string {
        return `${this.expr}${this.ws}[${this.idx}${this.preCloseBracketWs}]`;
    }
}
