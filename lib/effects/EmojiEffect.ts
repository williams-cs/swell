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
        this.prepareCanvas(this.x + this.w/2, this.y + this.h/2);
        this.ctx.beginPath();
        this.ctx.drawImage(this.image, -this.w/2, -this.h/2, this.w, this.h);
        this.restoreCanvas();
        if (this.isSelected) {
            this.drawGuides();
        }

        this.changeCursor();
    }

    // prevent EmojiEffect from reponding to "onchangingcolor"
    onChangingObjectColor() : void {
        return;
    }

    get image(): HTMLImageElement {
        return this._image;
    }

    set image(image: HTMLImageElement) {
        this._image = image;
    }
}
