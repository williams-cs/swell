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
        scope.isLooping = true;
        let cond = this._cond;
        let body = this._body;

        let f = function() {
            let newScope = scope.latestScope.createChildScope();
            let test = cond.eval(newScope);
            let latestScope = newScope.latestScope;
            scope.latestScope = latestScope;

            if (!(test instanceof BooleanNode)) {
                scope.isLooping = false;
                throw new Error("The condition must be a boolean expression.");
            }
            if (test.val) {
                let bodyScope = latestScope.createChildScope();
                body.eval(bodyScope);
                scope.latestScope = bodyScope.latestScope;
                setTimeout(f, 0);
            } else {
                scope.isLooping = false;
            }
        }
        setTimeout(f, 0);
    }

    toString(): string {
        return this.ws + "while(" + this._cond.toString() + ") {\n " + this._body.toString() + "}";
    }
}
