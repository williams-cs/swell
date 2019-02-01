import { AbstractTypeableNode } from './AbstractTypeableNode';
import { Expression } from '../Expression';
import { Dimensions } from '../structural/Dimensions';
import { NumberEffect } from '../effects/NumberEffect';
import { Scope } from '../structural/Scope';

export class FloatNode extends AbstractTypeableNode<FloatNode, number, NumberEffect> {

    eval(context: Scope): FloatNode {
        return this;
    }

    getEffect(scope: Scope, dims: Dimensions): NumberEffect {
        return new NumberEffect(this, scope, dims);
    }

    equalsVal(right: Expression<any>): boolean {
        return right instanceof FloatNode && this.val === right.val;
    }

    toString(): string {
        return this.ws + this.val;
    }
}
