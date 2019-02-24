import { BinaryOp } from './BinaryOp';
import { Expression } from '../Expression';
import { Scope } from '../structural/Scope';
import { NumberNode } from '../prims/NumberNode';
import { FloatNode } from '../prims/FloatNode';

export class MinusOp extends BinaryOp<NumberNode | FloatNode> {

    eval(context: Scope): NumberNode | FloatNode {
        let lhs = this.left.eval(context);
        let rhs = this.right.eval(context);
        if (lhs instanceof FloatNode || rhs instanceof FloatNode) {
            return new FloatNode(lhs.val - rhs.val);
        }
        return new NumberNode(lhs.val - rhs.val);
    }

    toString(): string {
        return `${this.lws}${this.left}-${this.right}${this.rws}`;
    }
}
