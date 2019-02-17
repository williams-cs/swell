import { AbstractShapeEffect } from "./AbstractShapeEffect";
import { EmojiNode } from "../shapes/EmojiNode";
import { PrintNode } from "../structural/PrintNode";
import { Scope } from "../structural/Scope";

export class EmojiEffect extends AbstractShapeEffect<EmojiNode, EmojiEffect> {

    private _image: HTMLImageElement;

    readonly name: string = "emoji";

    constructor(node: EmojiNode, scope: Scope, aes: PrintNode) {
        super(node, scope, aes);
        this.image = new Image();
        this.image.src = `./pics/${this.node.type.eval(this.scope).val}.svg`;
    }

    update(): void {
        this.ctx.beginPath();
        this.ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
        if (this.isSelected) {
            this.drawGuides();
        }
    }

    get image(): HTMLImageElement {
        return this._image;
    }

    set image(image: HTMLImageElement) {
        this._image = image;
    }
}
