import { BinaryOp } from './BinaryOp';
import { Expression } from '../Expression';
import { Scope } from '../structural/Scope';
import { VariableNode } from '../vars/VariableNode';

export class AssignOp<T> extends BinaryOp<T> {

    protected readonly op: string = "=";

    /**
     * Constructor for an assignment operation
     * @param left The left side of the assignment (the var)
     * @param right The right side of the assignment (the value)
     * @param ws Preceding whitespace
     */
    constructor(left: Expression<T>, right: Expression<T>, ws: string = "") {
        super(left, right, ws);
        if (!(left instanceof VariableNode)) {
            throw("Left side is not a variable");
        }
    }

    eval(context: Scope): T {
        if (!(this.left instanceof VariableNode)) {
            throw("Left side is not a variable");
        }
        let r: T = this.right.eval(context);
        context.assign(this.left.name, r);
        return r;
    }
}
