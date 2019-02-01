import { BinaryOp } from './BinaryOp';
import { Expression } from '../Expression';
import { Scope } from '../structural/Scope';
import { NumberNode } from '../prims/NumberNode';
import { FloatNode } from '../prims/FloatNode';

export class DivOp extends BinaryOp<NumberNode | FloatNode> {

    eval(context: Scope): NumberNode | FloatNode {
        return new FloatNode(this.left.eval(context).val / this.right.eval(context).val);
    }

    toString(): string {
        return this.ws + this.left + " / " + this.right;
    }
}
