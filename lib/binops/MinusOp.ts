import { BinaryOp } from './BinaryOp';
import { Expression } from '../Expression';
import { Scope } from '../structural/Scope';
import { NumberNode } from '../prims/NumberNode';
import { FloatNode } from '../prims/FloatNode';

export class MinusOp extends BinaryOp<NumberNode | FloatNode> {

    /**
     * The constructor for the subtraction operation
     * @param left The minuend
     * @param right The subtrahend
     * @param ws Preceding whitespace
     */
    constructor(left: Expression<NumberNode | FloatNode>, right: Expression<NumberNode | FloatNode>, ws?: string) {
        super(left, right);
        this.ws = ws !== undefined ? ws : "";
    }

    eval(context: Scope): NumberNode | FloatNode {
        return new NumberNode(this.left.eval(new Scope(context)).eval(context).val - this.right.eval(new Scope(context)).eval(context).val);
    }

    toString(): string {
        return this.ws + this.left + " - " + this.right;
    }
}
