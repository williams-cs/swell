import { AbstractShapeEffect } from "./AbstractShapeEffect";
import { EmojiNode } from "../shapes/EmojiNode";
import { PrintNode } from "../structural/PrintNode";
import { Scope } from "../structural/Scope";

export class EmojiEffect extends AbstractShapeEffect<EmojiNode, EmojiEffect> {

    private _image: HTMLImageElement;

    /**
     * Boolean flag to check if image is onload before updating
     */
    private _imageOnError: boolean = false;

    readonly name: string = "emoji";

    constructor(node: EmojiNode, scope: Scope, aes: PrintNode) {
        super(node, scope, aes);
        this.image = new Image();
        this.image.src = `./pics/${this.type}.svg`;
    }

    update(): void {
        this.image.onerror = () => this._imageOnError = true;
        if (this._imageOnError) return;

        this.prepareCanvas(this.x, this.y);
        this.ctx.beginPath();
        this.ctx.drawImage(this.image, -this.w/2, -this.h/2, this.w, this.h);
        this.restoreCanvas();
        if (this.isSelected) {
            this.drawGuides();
        }

        this.changeCursor();
    }

    /**
     * Returns true if the mouse is inside of the emoji's boundary (ellipse shape), false if otherwise
     */
    contains() : boolean {
        let newMousePos = this.changeCoordinate(this.mouse.x - this.x,
            this.mouse.y - this.y, this.rotate);
        let mx: number = newMousePos[0];
        let my: number = newMousePos[1];
        return (Math.pow(mx, 2) * Math.pow(this.h/2,2) + Math.pow(my, 2) * Math.pow(this.w/2,2)) 
                < (Math.pow(this.h/2,2) * Math.pow(this.w/2,2))
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

    get type(): string {
        return this.node.type.eval(this.scope).val;
    }
}
