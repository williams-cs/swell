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
     * @param scope The current program scope
     */
    eval(scope: Scope): void {
        this.left.eval(scope);
        let right = this.right;
        if (!scope.isLooping) {
            let rightScope = scope.createChildScope();
            right.eval(rightScope);
            scope.varBindings = rightScope.varBindings;
            return;
        }
        let f = function() {
            if (scope.isLooping) {
                setTimeout(f, 0);
            } else {
                let rightScope = scope.createChildScope();
                right.eval(rightScope);
                scope.varBindings = rightScope.varBindings;
            }
        }
        setTimeout(f, 0);
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
