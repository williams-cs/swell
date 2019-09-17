import { AbstractShapeNode } from "./AbstractShapeNode";
import { Expression } from '../Expression';
import { Scope } from '../structural/Scope';
import { RectangleEffect } from '../effects/RectangleEffect';
import { PrintNode } from "../structural/PrintNode";

export class RectangleNode extends AbstractShapeNode<RectangleNode, RectangleEffect> {

    protected readonly name: string = "rect";

    eval(context: Scope): RectangleNode {
        return this;
    }

    getEffect(context: Scope, aes: PrintNode): RectangleEffect {
        return new RectangleEffect(this, context, aes);
    }

    equals(right: Expression<any>): boolean {
        return right instanceof RectangleNode &&
            (this.width.equals(right.width) && this.height.equals(right.height));
    }
}
