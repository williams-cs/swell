import { AbstractTypeableNode } from './AbstractTypeableNode';
import { Expression } from '../Expression';
import { PrintNode } from "../structural/PrintNode";
import { Scope } from '../structural/Scope';
import { StringEffect } from '../effects/StringEffect';

export class StringNode extends AbstractTypeableNode<StringNode, string, StringEffect> {

    eval(context: Scope): StringNode {
        return this;
    }

    getEffect(context: Scope, aes: PrintNode): StringEffect {
        return new StringEffect(this, context, aes);
    }

    equals(right: Expression<any>): boolean {
        return right instanceof StringNode && this.val === right.val;
    }

    toString(): string {
        return this.ws + "\"" + this.val + "\"";
    }
}
