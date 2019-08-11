import { AbstractShapeEffect } from "./AbstractShapeEffect";
import { EllipseNode } from "../shapes/EllipseNode";

export class EllipseEffect extends AbstractShapeEffect<EllipseNode, EllipseEffect> {

    readonly name: string = "ellipse";

    update(): void {
        let x: number = this.x;
        let y: number = this.y;
        let w: number = this.w;
        let h: number = this.h;
        this.prepareCanvas(x, y);
        this.ctx.beginPath();
        this.ctx.ellipse(0,0, w/2, h/2, 0, 0, Math.PI * 2, false);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        this.restoreCanvas();
        if (this.isSelected) {
            this.drawGuides();
        }
        this.changeCursor();
    }
}
