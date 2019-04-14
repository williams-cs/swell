import { Expression } from "../Expression";
import { NOP } from "../prims/NOP";
import { Return } from "./Return";
import { Scope } from "./Scope";
import { Some } from "space-lift";

export class SequenceNode extends Expression<void>{

    /**
     * Constructor for a SequenceNode, the building block of the AST
     * @param left The left side of the Sequence
     * @param right The right side of the Sequence
     * @param lws Preceding ws
     */
    constructor(private _left: Expression<any>, private _right: Expression<any>, ws: string = "") {
        super(ws);
    }

    /**
     * Evaluates the children from left to right
     * @param scope The current program scope
     */
    eval(scope: Scope): any {
        let leftScope = scope.createChildScope();
        let result = this.left.eval(leftScope);
        if (this.left instanceof Return || this.right instanceof NOP) {
            return result;
        }
        let rightScope = leftScope.latestScope.createChildScope();
        result = this.right.eval(rightScope);
        scope.latestScope = rightScope.latestScope;
        return result;
    }

    toString(): string {
        return `${this.ws}${this.left}\n${this.right}`;
    }

    get left(): Expression<any> {
        return this._left;
    }

    set left(left: Expression<any>) {
        this._left = left;
    }

    get right(): Expression<any> {
        return this._right;
    }

    set right(right: Expression<any>) {
        this._right = right;
    }
}
