import { AbstractShapeNode } from "./AbstractShapeNode";
import { Expression } from '../Expression';
import { Scope } from '../structural/Scope';
import { NumberNode } from '../prims/NumberNode';
import { StringNode } from '../prims/StringNode';
import { Dimensions } from '../structural/Dimensions';
import { EmojiEffect } from '../effects/EmojiEffect';

export class EmojiNode extends AbstractShapeNode<EmojiNode, EmojiEffect> {

    constructor(
        private _name: Expression<StringNode>,
        width: Expression<NumberNode>,
        height: Expression<NumberNode>,
        ws: string = "",
    ) {
        super(width, height, ws);
    }

    eval(context: Scope): EmojiNode {
        return this;
    }

    getEffect(scope: Scope, dims: Dimensions): EmojiEffect {
        return new EmojiEffect(this, scope, dims);
    }

    equalsVal(right: Expression<any>): boolean {
        return right instanceof EmojiNode &&
            this.name.equalsVal(right.name) &&
            this.width.equalsVal(right.width) &&
            this.height.equalsVal(right.height);
    }

    toString(): string {
        return this.ws + "emoji(" + this.name + ", " + this.width + ", " + this.height + ")";
    }

    get name(): Expression<StringNode> {
        return this._name;
    }

    set name(name: Expression<StringNode>) {
        this._name = name;
    }
}
