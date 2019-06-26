import { Expression } from "../Expression";
<<<<<<< HEAD
import { NOP } from "../prims/NOP";
import { Return } from "./Return";
import { Scope } from "./Scope";
import { Some } from "space-lift";
=======
import { Scope } from "./Scope";
>>>>>>> 025ee89eb3070cd0d0825f0565afdebd7d129261

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
     * Evaluates the children in post-order
     * @param scope The latest program scope
     */
<<<<<<< HEAD
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
=======
    eval(scope: Scope): void {
        scope.isRunning = true;
        let leftScope = scope.createChildScope();
        this.left.eval(leftScope);
        let right = this.right;
        
        let asyncEvalRight = function() {
            if (leftScope.isRunning) {
                setTimeout(asyncEvalRight, 0);
            } else {
                let rightScope = leftScope.latestScope.createChildScope();
                right.eval(rightScope);
                let asyncFinishEval = function() {
                    if (rightScope.isRunning) {
                        setTimeout(asyncFinishEval, 0);
                    } else {
                        scope.latestScope = rightScope.latestScope;
                        scope.isRunning = false;
                    }
                }
                asyncFinishEval();
            }
        }
        asyncEvalRight();
>>>>>>> 025ee89eb3070cd0d0825f0565afdebd7d129261
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
