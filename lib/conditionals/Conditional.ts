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
        private falseBranch_: BodyNode | Conditional = null,
        private preElseWS: string = "",
    ) {
        super();
    }

<<<<<<< HEAD
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
=======
    eval(scope: Scope) {
        scope.isRunning = true;
        let res = this.cond.expr.value.eval(scope);
        if (!(res instanceof BooleanNode)) {
            throw new Error("The condition must be a boolean expression.");
        }
        let branch = res.val ? this.trueBranch : this.falseBranch;
        let bodyScope = scope.createChildScope();
        branch.eval(bodyScope);
        let asyncPostBody = function() {
            if (bodyScope.isRunning) {
                setTimeout(asyncPostBody, 0);
            } else {
                scope.isRunning = false;
                scope.latestScope = bodyScope.latestScope;
            }
        }
        asyncPostBody();
>>>>>>> 025ee89eb3070cd0d0825f0565afdebd7d129261
    }

    toString(): string {
        let res = `${this.preIfWS}if${this.cond}${this.trueBranch}`;
        if (this.falseBranch !== null) {
            res += `${this.preElseWS}else${this.falseBranch}`;
        }
        return res;
    }

    get falseBranch(): Conditional | BodyNode {
        return this.falseBranch_;
    }
}
