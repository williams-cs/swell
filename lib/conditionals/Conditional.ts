import { Expression } from "../Expression";
import { BodyNode } from "../structural/BodyNode"
import { ParensNode } from "../structural/ParensNode"
import { Argument } from "../funhouse/Argument"
import { Scope } from '../structural/Scope';
import { BooleanNode } from "../prims/BooleanNode";
import { Some } from "space-lift";

export class Conditional extends Expression<any> {
    private _test: ParensNode<Argument<any>>;
    private _trueBranch: BodyNode;
    private _falseBranch: BodyNode;
    private _ews: string;

    /**
     * The constructor for conditionals (if, else if, and else statements)
     * @param test The condition of the statement
     * @param trueBranch The branch to follow if the condition evaluates to true, stored inside a BodyNode
     * @param falseBranch The branch to follow if the condition evaluates to false, stored inside a BodyNode
     * @param iws Preceding if whitespace
     * @param ews Preceding else whitespace
     */
    constructor(
        _test: ParensNode<Argument<any>>,
        _trueBranch: BodyNode,
        iws: string = "",
        ews: string = "",
        _falseBranch?: BodyNode
    ){
        super(iws, true);
        this._ews = ews;
        this._test = _test;
        this._trueBranch = _trueBranch;   
        if(_falseBranch != null) this._falseBranch =  _falseBranch;
    }

    eval(context: Scope) {
        let childCtx = new Scope(context, context.effects, context.eventLog);
        childCtx.canvas = Some(context.canvas.get());
        let res = this._test.expr.value.eval(childCtx);
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
        let res = `${this.ws}if${this._test}${this.trueBranch}`;
        if (this.falseBranch !== undefined) {
            res += `${this._ews}else${this.falseBranch}`;
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
