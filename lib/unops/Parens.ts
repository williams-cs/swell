import { UnaryOp } from './UnaryOp';
import { NumberNode } from '../prims/NumberNode';
import { FloatNode } from "../prims/FloatNode";
import { Scope } from '../structural/Scope';

export class Parens extends UnaryOp<NumberNode | FloatNode> {

    eval(context: Scope): NumberNode | FloatNode {
        let v = this.expr.eval(context);
        if (v instanceof FloatNode) {
            return new FloatNode(v.val, "");
        }
        else {
            return new NumberNode(v.val, "");
        }
    }

    toString(): string {
        return `${this.lws}(${this.expr})${this.rws}`;
    }
}
