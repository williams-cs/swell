import { AbstractShapeNode } from "./AbstractShapeNode";
import { Argument } from "../funhouse/Argument";
import { Expression } from '../Expression';
import { Scope } from '../structural/Scope';
import { NumberNode } from '../prims/NumberNode';
import { StringNode } from '../prims/StringNode';
import { PrintNode } from '../structural/PrintNode';
import { EmojiEffect } from '../effects/EmojiEffect';

export class EmojiNode extends AbstractShapeNode<EmojiNode, EmojiEffect> {

    protected readonly name: string = "emoji";

    initArgMap(): Map<string, Argument<any>> {
        return new Map<string, Argument<any>>([
            ["type", new Argument<StringNode>()],
            ["width", new Argument<NumberNode>()],
            ["height", new Argument<NumberNode>()],
        ]);
    }

    eval(context: Scope): EmojiNode {
        return this;
    }

    getEffect(scope: Scope, aes: PrintNode): EmojiEffect {
        return new EmojiEffect(this, scope, aes);
    }

    equals(right: Expression<any>): boolean {
        return right instanceof EmojiNode &&
            this.type.equals(right.type) &&
            this.width.equals(right.width) &&
            this.height.equals(right.height);
    }

    get type(): Expression<StringNode> {
        return (<Expression<StringNode>>this.getArg("type"));
    }

    set type(type: Expression<StringNode>) {
        this.setArg("type", type);
    }
}
