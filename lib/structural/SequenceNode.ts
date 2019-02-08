import { Expression } from "../Expression";
import { Scope } from './Scope';
import { Some } from "space-lift";

export class SequenceNode extends Expression<void>{

    private _leftVal: any;
    private _rightVal: any;

    /**
     * Constructor for a SequenceNode, the building block of the AST
     * @param left The left side of the Sequence
     * @param right The right side of the Sequence
     */
    constructor(private _left: Expression<any>, private _right: Expression<any>) {
        super("", true);
    }

    /**
     * Evaluates the children in postorder (left, right, parent)
     * @param context The current program context
     */
    eval(context: Scope): void {
        let leftScope = new Scope(context, context.effects, context.eventLog);
        leftScope.canvas = Some(context.canvas.get());
        //throwing away after evaling
        this.leftVal = this.left.eval(leftScope);
        this.rightVal = this.right.eval(leftScope); // leftScope may be modified now
    }

    toString(): string {
        return (
            this.left + (this.left.newLine ? "\n" : ";\n") +
            this.right + (this.right.newLine ? "" : ";")
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

    get leftVal(): any {
        return this._leftVal;
    }

    set leftVal(val: any) {
        this._leftVal = val;
    }

    get rightVal(): any {
        return this._rightVal;
    }

    set rightVal(val: any) {
        this._rightVal = val;
    }
}
