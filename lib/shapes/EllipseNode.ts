import { AbstractShapeNode } from "./AbstractShapeNode";
import { Expression } from '../Expression';
import { Scope } from '../structural/Scope';
import { EllipseEffect } from '../effects/EllipseEffect';
import { PrintNode } from "../structural/PrintNode";

export class EllipseNode extends AbstractShapeNode<EllipseNode, EllipseEffect> {

    protected readonly name: string = "ellipse";

    eval(context: Scope): EllipseNode {
        return this;
    }

    getEffect(context: Scope, aes: PrintNode): EllipseEffect {
        return new EllipseEffect(this, context, aes);
    }

    equals(right: Expression<any>): boolean {
        return right instanceof EllipseNode &&
            (this.width.equals(right.width) && this.height.equals(right.height));
    }
}
