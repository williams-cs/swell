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

    /**
     * Returns true if the mouse is inside of the ellipse's boundary, false if otherwise
     */
    contains() : boolean {
        let newMousePos = this.changeCoordinate(this.mouse.x - this.x,
            this.mouse.y - this.y, this.rotate);
        let mx: number = newMousePos[0];
        let my: number = newMousePos[1];
        return (Math.pow(mx, 2) * Math.pow(this.h/2,2) + Math.pow(my, 2) * Math.pow(this.w/2,2)) 
                < (Math.pow(this.h/2,2) * Math.pow(this.w/2,2))
    }
}
