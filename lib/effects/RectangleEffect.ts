import { AbstractShapeEffect } from "./AbstractShapeEffect";
import { RectangleNode } from "../shapes/RectangleNode";

export class RectangleEffect extends AbstractShapeEffect<RectangleNode, RectangleEffect> {

    readonly name: string = "rectangle";

    update(): void {
        let x = this.x;
        let y = this.y;
        let width = this.w;
        let height = this.h;
        this.ctx.beginPath();
        this.ctx.rect(x, y, width, height);
        this.ctx.fillStyle = "#d5b8ff";
        this.ctx.shadowColor = "#6C6C6C";
        this.ctx.shadowBlur = 15;
        this.ctx.fill();
        if (this.isSelected) {
            this.drawGuides(x, y, width, height, this.corner);
        }
    }
}
