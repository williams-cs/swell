import { AbstractLineNode } from "./AbstractLineNode";
import { Expression } from '../Expression';
import { Scope } from '../structural/Scope';
import { LineEffect } from '../effects/LineEffect';
import { PrintNode } from "../structural/PrintNode";

export class LineNode extends AbstractLineNode<LineNode, LineEffect> {

    protected readonly name: string = "line";

    eval(context: Scope): LineNode {
        return this;
    }

    getEffect(context: Scope, aes: PrintNode): LineEffect {
        return new LineEffect(this, context, aes);
    }

    equals(right: Expression<any>): boolean {
        return right instanceof LineNode &&
            (this.x1.equals(right.x1) && this.y1.equals(right.y1)) &&
            (this.x2.equals(right.x2) && this.y2.equals(right.y2));
    }
}
