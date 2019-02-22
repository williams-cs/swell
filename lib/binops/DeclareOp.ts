import { BinaryOp } from './BinaryOp';
import { Expression } from '../Expression';
import { Scope } from '../structural/Scope';
import { VariableNode } from '../vars/VariableNode';

export class DeclareOp<T> extends BinaryOp<T> {

    /**
     * Constructor for the declare operation, which declares a variable for the first time
     * @param left The left side of the declare op (the variable)
     * @param right The right side of the op (the value)
     * @param ws Preceding whitespace
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
        context.declare(this.left.name);
        let r: T = this.right.eval(context);
        context.assign(this.left.name, r);
        return r;
    }

    toString(): string {
        return this.lws + "var " + this.left + " = " + this.right + this.rws;
    }
}
