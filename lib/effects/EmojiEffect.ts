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
        let x = this.x;
        let y = this.y;
        let width = this.w;
        let height = this.h;
        this.ctx.beginPath();
        this.ctx.drawImage(this.image, this.x, this.y, width, height);
        if (this.isSelected) {
            this.drawGuides(x, y, width, height, this.corner);
        }
    }

    get image(): HTMLImageElement {
        return this._image;
    }

    set image(image: HTMLImageElement) {
        this._image = image;
    }
}
