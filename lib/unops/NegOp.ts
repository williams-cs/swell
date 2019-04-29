import { UnaryOp } from './UnaryOp';
import { NumberNode } from '../prims/NumberNode';
import { Scope } from '../structural/Scope';

export class NegOp extends UnaryOp<NumberNode>{

    eval(context: Scope): NumberNode {
        let v = this.expr.eval(context);
        return new NumberNode(-v.val, this.expr.ws);
    }

    toString(): string {
        return `${this.ws}-${this.expr}`;
    }
}
