import { AbstractShapeNode } from "./AbstractShapeNode";
import { Expression } from '../Expression';
import { Scope } from '../structural/Scope';
import { RectangleEffect } from '../effects/RectangleEffect';
import { Dimensions } from '../structural/Dimensions';

export class RectangleNode extends AbstractShapeNode<RectangleNode, RectangleEffect> {

    eval(context: Scope): RectangleNode {
        return this;
    }

    getEffect(scope: Scope, dims: Dimensions): RectangleEffect {
        return new RectangleEffect(this, scope, dims);
    }

    equalsVal(right: Expression<any>): boolean {
        return right instanceof RectangleNode &&
            (this.width.equalsVal(right.width) && this.height.equalsVal(right.height));
    }

    toString(): string {
        return this.ws + "rect(" + this.width + ", " + this.height + ")";
    }
}
