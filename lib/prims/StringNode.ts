import { AbstractTypeableNode } from './AbstractTypeableNode';
import { Expression } from '../Expression';
import { Dimensions } from '../structural/Dimensions';
import { Scope } from '../structural/Scope';
import { StringEffect } from '../effects/StringEffect';

export class StringNode extends AbstractTypeableNode<StringNode, string, StringEffect> {

    eval(context: Scope): StringNode {
        return this;
    }

    getEffect(scope: Scope, dims: Dimensions): StringEffect {
        return new StringEffect(this, scope, dims);
    }

    equalsVal(right: Expression<any>): boolean {
        return right instanceof StringNode && this.val === right.val;
    }

    toString(): string {
        return this.ws + "\"" + this.val + "\"";
    }
}
