import { AbstractTypeableNode } from './AbstractTypeableNode';
import { Expression } from '../Expression';
import { Scope } from '../structural/Scope';
import { Dimensions } from '../structural/Dimensions';
import { NumberEffect } from '../effects/NumberEffect';

export class FloatNode extends AbstractTypeableNode<FloatNode, number> {

    eval(context: Scope): FloatNode {
        return this;
    }

    draw(scope: Scope, dims: Dimensions, ast: Expression<any>): void {
        let e = new NumberEffect(this, scope, dims);
        e.draw();
    }

    equalsVal(right: Expression<any>): boolean {
        return right instanceof FloatNode && this.val === right.val;
    }

    toString(): string {
        return this.ws + this.val;
    }
}
