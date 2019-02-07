import { AbstractTypeableNode } from './AbstractTypeableNode';
import { Expression } from '../Expression';
import { NumberEffect } from '../effects/NumberEffect';
import { PrintNode } from "../structural/PrintNode";
import { Scope } from '../structural/Scope';

export class FloatNode extends AbstractTypeableNode<FloatNode, number, NumberEffect> {

    eval(context: Scope): FloatNode {
        return this;
    }

    getEffect(context: Scope, aes: PrintNode): NumberEffect {
        return new NumberEffect(this, context, aes);
    }

    equals(right: Expression<any>): boolean {
        return right instanceof FloatNode && this.val === right.val;
    }

    toString(): string {
        return this.ws + this.val;
    }
}
