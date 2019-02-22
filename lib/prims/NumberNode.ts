import { AbstractTypeableNode } from './AbstractTypeableNode';
import { Expression } from '../Expression';
import { NumberEffect } from '../effects/NumberEffect';
import { PrintNode } from "../structural/PrintNode";
import { Scope } from '../structural/Scope';

export class NumberNode extends AbstractTypeableNode<NumberNode, number, NumberEffect> {

    eval(context: Scope): NumberNode {
        return this;
    }

    getEffect(context: Scope, aes: PrintNode): NumberEffect {
        return new NumberEffect(this, context, aes);
    }

    equals(right: Expression<any>): boolean {
        return right instanceof NumberNode && this.val === right.val;
    }

    toString(): string {
        return this.lws + this.val + this.rws;
    }
}
