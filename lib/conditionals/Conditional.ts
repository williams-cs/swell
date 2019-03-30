import { Expression } from "../Expression";
import { BodyNode } from "../structural/BodyNode"
import { ParensNode } from "../structural/ParensNode"
import { Argument } from "../funhouse/Argument"
import { Scope } from '../structural/Scope';
import { BooleanNode } from "../prims/BooleanNode";
import { Some } from "space-lift";

export class Conditional extends Expression<any> {
    private _cond: ParensNode<Argument<any>>;
    private _trueBranch: BodyNode;
    private _falseBranch: BodyNode;
    private _ews: string;

    /**
     * The constructor for conditionals (if, else if, and else statements)
     * @param cond The condition of the statement
     * @param trueBranch The branch to follow if the condition evaluates to true, stored inside a BodyNode
     * @param falseBranch The branch to follow if the condition evaluates to false, stored inside a BodyNode
     * @param iws Preceding if whitespace
     * @param ews Preceding else whitespace
     */
    constructor(
        cond: ParensNode<Argument<any>>,
        trueBranch: BodyNode,
        iws: string = "",
        ews: string = "",
        falseBranch: BodyNode = null,
    ){
        super(iws, true);
        this._ews = ews;
        this._cond = cond;
        this._trueBranch = trueBranch;
        this._falseBranch = falseBranch;
    }

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
    }

    toString(): string {
        let res = `${this.ws}if${this.cond}${this.trueBranch}`;
        if (this.falseBranch !== undefined) {
            res += `${this._ews}else${this.falseBranch}`;
        }
        return res;
    }

    /**
     * Returns the condition of the conditional
     */
    get cond(): ParensNode<Argument<any>> {
        return this._cond;
    }

    /**
     * Returns the true branch of the conditional
     */
    get trueBranch(): Expression<any> {
        return this._trueBranch;
    }

    /**
     * Returns the false branch of the conditional
     */
    get falseBranch(): Expression<any> {
        return this._falseBranch;
    }
}
