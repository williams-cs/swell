import { Expression } from "../Expression";
import { Scope } from "./Scope";

export class SequenceNode extends Expression<void>{

    /**
     * Constructor for a SequenceNode, the building block of the AST
     * @param left The left side of the Sequence
     * @param right The right side of the Sequence
     * @param lws Preceding ws
     */
    constructor(private _left: Expression<any>, private _right: Expression<any>, ws: string = "") {
        super(ws, true);
    }

    /**
     * Evaluates the children in post-order
     * @param scope The latest program scope
     */
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
    }

    toString(): string {
        return (
            this.ws + this.left + (this.left.newLine ? "" : "\n") +
            this.right + (this.right.newLine ? "" : "\n")
        );
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
