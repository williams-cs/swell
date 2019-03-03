import { BinaryOp } from './BinaryOp';
import { Expression } from '../Expression';
import { Scope } from '../structural/Scope';
import { NumberNode } from '../prims/NumberNode';

export class MinusOp extends BinaryOp<NumberNode> {

    eval(context: Scope): NumberNode {
        return new NumberNode(this.left.eval(context).val - this.right.eval(context).val);
    }

    toString(): string {
        return `${this.lws}${this.left}-${this.right}${this.rws}`;
    }
}
