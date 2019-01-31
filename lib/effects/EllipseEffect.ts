import { AbstractShapeEffect } from "./AbstractShapeEffect";
import { EllipseNode } from "../shapes/EllipseNode";

export class EllipseEffect extends AbstractShapeEffect<EllipseNode> {

    readonly name: string = "ellipse";

    /**
     * This method is called in order to draw and redraw the object when manipulations are made
     */
    update(): void {
        let x: number = this.x;
        let y: number = this.y;
        let w: number = this.w;
        let h: number = this.h;
        this.ctx.beginPath();
        this.ctx.ellipse(x + w/2, y + h/2, w/2, h/2, 0, 0, Math.PI * 2, false);
        this.ctx.fillStyle = "#D5B8FF";
        this.ctx.shadowColor = "#6C6C6C";
        this.ctx.shadowBlur = 15;
        this.ctx.fill();
        if (this.isSelected) {
            this.drawGuides(x, y, w, h, this.corner);
        }
    }
}
