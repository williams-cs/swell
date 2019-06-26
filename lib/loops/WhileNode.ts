import { Expression } from "../Expression";
import { Scope } from '../structural/Scope';
import { BooleanNode } from '../prims/BooleanNode';
import { Some } from "space-lift";

export class WhileNode extends Expression<any> {

    /**
     * Constructor for a While loop
     * @param cond The While loop condition
     * @param body The body of the loop
     * @param ws Preceding whitespace
     */
    constructor(private _cond: Expression<any>, private _body: Expression<any>, ws: string = "") {
        super(ws);
    }

    /**
     * Evaluates the body of the loop while the condition is true
     * @param scope The latest program scope
     */
<<<<<<< HEAD
    eval(context: Scope) {
        let childCtx = context.copy();
        let res = this._cond.eval(childCtx);
        if (!(res instanceof BooleanNode)) {
            throw new Error("The condition must be a boolean expression.");
        }
=======
    eval(scope: Scope): void {
        scope.isRunning = true;
        let cond = this._cond;
        let body = this._body;

        let asyncLoop = function() {
            let condScope = scope.latestScope.createChildScope();
            let condResult = cond.eval(condScope);
            if (!(condResult instanceof BooleanNode)) {
                throw new Error("The condition must be a boolean expression.");
            }

            if (condResult.val) {
                let bodyScope = condScope.latestScope.createChildScope();
                body.eval(bodyScope);
                let asyncPostBody = function() {
                    if (bodyScope.isRunning) {
                        setTimeout(asyncPostBody, 0);
                    } else {
                        scope.latestScope = bodyScope.latestScope;
                        setTimeout(asyncLoop, 0);
                    }
                }
                asyncPostBody();
>>>>>>> 025ee89eb3070cd0d0825f0565afdebd7d129261

            } else {
                scope.isRunning = false;
                scope.latestScope = condScope.latestScope;
            }
        }
        asyncLoop();
    }

    toString(): string {
        return this.ws + "while(" + this._cond.toString() + ") {\n " + this._body.toString() + "}";
    }
}
