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
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        if (this.isSelected) {
            this.drawGuides();
        }
        
        this.changeCursor();
    }
}
