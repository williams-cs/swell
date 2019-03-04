import { Expression } from "../Expression";
import { BodyNode } from "../structural/BodyNode"
import { Scope } from '../structural/Scope';
import { BooleanNode } from "../prims/BooleanNode";
import { Some } from "space-lift";

export class Conditional extends Expression<any> {

    /**
     * The constructor for conditionals (if, else if, and else statements)
     * @param test The condition of the statement
     * @param trueBranch The branch to follow if the condition evaluates to true, stored inside a BodyNode
     * @param falseBranch The branch to follow if the condition evaluates to false, stored inside a BodyNode
     * @param ws Preceding whitespace
     */
    constructor(
        private _test: Expression<any>, private _trueBranch: Expression<BodyNode>,
        ws: string = "", private _falseBranch?: Expression<BodyNode>
    ) {
        super(ws, true);
    }

    eval(context: Scope) {
        let childCtx = new Scope(context, context.effects, context.eventLog);
        childCtx.canvas = Some(context.canvas.get());
        let res = this.test.eval(childCtx);
        // if (!(res instanceof BooleanNode)) {
        //     throw new Error("The condition must be a boolean expression.");
        // }
        if (res.val) {
            return this.trueBranch.eval(childCtx);
        }
        if (this.falseBranch != null) { // check if else/else if is null or undefined
            return this.falseBranch.eval(childCtx); // possibly a bad idea
        }
    }

    toString(): string {
        let res = `${this.ws}if(${this.test}) {\n\t${this.trueBranch}\n}`;
        if (this.falseBranch !== undefined) {
            res += `\nelse {\n ${this.falseBranch}\n};`;
        }
        return res;
    }

    /**
     * Returns the condition of the conditional
     */
    get test(): Expression<any> {
        return this._test;
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
