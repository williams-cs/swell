import { BinaryOp } from './BinaryOp';
import { Expression } from '../Expression';
import { Scope } from '../structural/Scope';
import { VariableNode } from '../vars/VariableNode';

export class AssignOp<T> extends BinaryOp<T> {

    /**
     * Constructor for an assignment operation
     * @param left The left side of the assignment (the var)
     * @param right The right side of the assignment (the value)
     * @param lws Preceding whitespace
     * @param rws Post whitespace
     */
    constructor(left: Expression<T>, right: Expression<T>, lws: string = "", rws: string = "") {
        if (!(left instanceof VariableNode)) {
            throw("Left side is not a variable");
        }
        super(left, right, lws, rws);
    }

    eval(context: Scope): T {
        if (!(this.left instanceof VariableNode)) {
            throw("Left side is not a variable");
        }
        let r: T = this.right.eval(context);
        context.assign(this.left.name, r);
        return r;
    }

    toString(): string {
        return this.lws + this.left + "=" + this.right + this.rws;
    }
}
