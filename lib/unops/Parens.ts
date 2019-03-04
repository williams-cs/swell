import { UnaryOp } from './UnaryOp';
import { NumberNode } from '../prims/NumberNode';
import { Scope } from '../structural/Scope';

export class Parens extends UnaryOp<NumberNode> {

    eval(context: Scope): NumberNode {
        let v = this.expr.eval(context);
        return new NumberNode(v.val, "");
    }

    toString(): string {
        return `${this.ws}(${this.expr})`;
    }
}
