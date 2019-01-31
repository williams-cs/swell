import { BinaryOp } from './BinaryOp';
import { Expression } from '../Expression';
import { Scope } from '../structural/Scope';
import { NumberNode } from '../prims/NumberNode';
import { FloatNode } from '../prims/FloatNode';

export class PlusOp extends BinaryOp<NumberNode | FloatNode> {

    /**
     * Constructor for the addition operation
     * @param left The first addend
     * @param right The second addend
     * @param ws Preceding whitespace
     */
    constructor(left: Expression<NumberNode | FloatNode>, right: Expression<NumberNode | FloatNode>, ws?: string) {
        super(left, right);
        this.ws = ws !== undefined ? ws : "";
    }

    /**
     * Performs the addition and returns a single NumberNode
     * @param context The current program context
     */
    eval(context: Scope): NumberNode | FloatNode {
        return new NumberNode(this.left.eval(new Scope(context)).eval(context).val + this.right.eval(new Scope(context)).eval(context).val);
    }

    toString(): string {
        return this.ws + this.left + " + " + this.right;
    }
}
