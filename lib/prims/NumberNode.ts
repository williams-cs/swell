import { AbstractTypeableNode } from './AbstractTypeableNode';
import { Expression } from '../Expression';
import { Scope } from '../structural/Scope';
import { Dimensions } from '../structural/Dimensions';
import { NumberEffect } from '../effects/NumberEffect';

export class NumberNode extends AbstractTypeableNode<NumberNode, number> {

    eval(context: Scope): NumberNode {
        return this;
    }

    draw(scope: Scope, dims: Dimensions, ast: Expression<any>): void {
        let e = new NumberEffect(this, scope, dims);
        e.draw();
    }

    equalsVal(right: Expression<any>): boolean {
        return right instanceof NumberNode && this.val === right.val;
    }

    toString(): string {
        return this.ws + this.val;
    }
}
