import { AbstractShapeEffect } from "./AbstractShapeEffect";
import { EllipseNode } from "../shapes/EllipseNode";

export class EllipseEffect extends AbstractShapeEffect<EllipseNode, EllipseEffect> {

    readonly name: string = "ellipse";

    update(): void {
        let x: number = this.x;
        let y: number = this.y;
        let w: number = this.w;
        let h: number = this.h;
        this.ctx.save();
        this.ctx.translate(x + w/2, y + h/2);
        this.ctx.rotate(this.rotate * Math.PI / 180);

        this.ctx.beginPath();
        this.ctx.ellipse(0,0, w/2, h/2, 0, 0, Math.PI * 2, false);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        this.ctx.restore();
        if (this.isSelected) {
            this.drawGuides();
        }
        this.changeCursor();
    }
}
