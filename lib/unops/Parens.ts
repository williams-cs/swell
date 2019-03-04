import { UnaryOp } from './UnaryOp';
import { NumberNode } from '../prims/NumberNode';
import { Scope } from '../structural/Scope';

export class Parens<T> extends UnaryOp<T> {

    eval(context: Scope): T {
        return this.expr.eval(context)
    }

    toString(): string {
        return `${this.ws}(${this.expr})`;
    }
}
