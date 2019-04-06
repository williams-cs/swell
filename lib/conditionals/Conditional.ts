import { BodyNode } from "../structural/BodyNode";
import { BooleanNode } from "../prims/BooleanNode";
import { Expression } from "../Expression";
import { Parens } from "../unops/Parens";
import { Scope } from "../structural/Scope";

export class Conditional extends Expression<any> {

    /**
     * The constructor for conditionals (if, else if, and else statements)
     * @param cond The condition of the statement
     * @param trueBranch The branch to follow if the condition evaluates to true, stored inside a BodyNode
     * @param preIfWS Preceding if whitespace
     * @param preElseWS Preceding else whitespace
     * @param falseBranch The branch to follow if the condition evaluates to false, stored inside a BodyNode
     */
    constructor(
        private cond: Parens<any>,
        private trueBranch: Expression<any>,
        private preIfWS: string = "",
        private falseBranch: BodyNode | Conditional = null,
        private preElseWS: string = "",
    ) {
        super();
    }

    eval(scope: Scope): any {
        let cond = this.cond.eval(scope);
        if (!(cond instanceof BooleanNode)) {
            throw new Error("The condition must be a boolean expression.");
        }

        let bodyScope = scope.createChildScope();
        let branch = cond.val ? this.trueBranch : this.falseBranch;
        if (branch === null || branch === undefined) {
            return;
        }

        let returnResult = branch.eval(bodyScope);
        scope.latestScope = bodyScope.latestScope;
        return returnResult;
    }

    toString(): string {
        let res = `${this.preIfWS}if${this.cond}${this.trueBranch}`;
        if (this.falseBranch !== null) {
            res += `${this.preElseWS}else${this.falseBranch}`;
        }
        return res;
    }
}
