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
        super(ws, true);
    }

    /**
     * Evaluates the body of the loop while the condition is true
     * @param scope The latest program scope
     */
    eval(scope: Scope): void {
        scope.isRunning = true;
        let cond = this._cond;
        let body = this._body;

        let asyncLoop = function() {
            let condScope = scope.latestScope.createChildScope();
            let condResult = cond.eval(condScope);
            let asyncBody = function() {
                if (condScope.isRunning) {
                    setTimeout(asyncBody, 0);
                    return;
                }

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

                } else {
                    scope.isRunning = false;
                    scope.latestScope = condScope.latestScope;
                }
            }
            asyncBody();
        }
        asyncLoop();
    }

    toString(): string {
        return this.ws + "while(" + this._cond.toString() + ") {\n " + this._body.toString() + "}";
    }
}
