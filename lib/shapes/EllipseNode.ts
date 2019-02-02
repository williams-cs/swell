import { AbstractShapeNode } from "./AbstractShapeNode";
import { Expression } from '../Expression';
import { Scope } from '../structural/Scope';
import { EllipseEffect } from '../effects/EllipseEffect';
import { Dimensions } from '../structural/Dimensions';

export class EllipseNode extends AbstractShapeNode<EllipseNode, EllipseEffect> {

    eval(context: Scope): EllipseNode {
        return this;
    }

    getEffect(scope: Scope, dims: Dimensions): EllipseEffect {
        return new EllipseEffect(this, scope, dims);
    }

    equals(right: Expression<any>): boolean {
        return right instanceof EllipseNode &&
            (this.width.equals(right.width) && this.height.equals(right.height));
    }

    toString(): string {
        return this.ws + "ellipse(" + this.width + ", " + this.height + ")";
    }
}
