import { AbstractLineEffect } from "./AbstractLineEffect";
import { LineNode } from "../shapes/LineNode";

export class LineEffect extends AbstractLineEffect<LineNode, LineEffect> {

    readonly name: string = "line";

    update(): void {
        this.ctx.beginPath();
        this.ctx.moveTo(this.x1, this.y1);
        this.ctx.lineTo(this.x2, this.y2);
        this.ctx.strokeStyle = this.color;
        this.ctx.stroke();
        if (this.isSelected) {
            this.drawGuides();
            this.changeCursor(this.guideContains());
        }
    }
}
