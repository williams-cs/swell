import { AbstractShapeEffect } from "./AbstractShapeEffect";
import { EmojiNode } from "../shapes/EmojiNode";
import { Scope } from "../structural/Scope";
import { Dimensions } from "../structural/Dimensions";

export class EmojiEffect extends AbstractShapeEffect<EmojiNode> {

    private _emojiImg: HTMLImageElement;

    readonly name: string = "emoji";

    constructor(node: EmojiNode, scope: Scope, dims: Dimensions) {
        super(node, scope, dims);
        this._emojiImg = new Image();
        this._emojiImg.src = './pics/' + this.node.name.eval(this.scope).val + '.svg';
    }

    /**
     * This method is called in order to draw and redraw the object when manipulations are made
     */
    update(): void {
        let x = this.x;
        let y = this.y;
        let width = this.w;
        let height = this.h;
        this.ctx.beginPath();
        this.ctx.drawImage(this._emojiImg, this.x, this.y, width, height);
        if (this.isSelected) {
            this.drawGuides(x, y, width, height, this.corner);
        }
    }

    /**
     * Returns the image
     */
    get image(): HTMLImageElement {
        return this._emojiImg;
    }

    /**
     * Returns the name of this emoji
     */
    get emojiName(): string {
        return this.node.name.eval(this.scope).val;
    }
}
