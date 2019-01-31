import { AbstractTypeableNode } from './AbstractTypeableNode';
import { Expression } from '../Expression';
import { Scope } from '../structural/Scope';
import { StringEffect } from '../effects/StringEffect';
import { Dimensions } from '../structural/Dimensions';

export class StringNode extends AbstractTypeableNode<StringNode, string> {

    eval(context: Scope): StringNode {
        return this;
    }

    draw(scope: Scope, dims: Dimensions, ast: Expression<any>): void {
        let e = new StringEffect(this, scope, dims);
        e.draw();
    }

    equalsVal(right: Expression<any>): boolean{
        return right instanceof StringNode && this.val === right.val;
    }

    toString(): string {
        return this.ws + "\"" + this.val + "\"";
    }
}
