import { Module } from "./Module";
import { Effect } from "../effects/Effect";
import { NumberEffect } from "../effects/NumberEffect";
import { EllipseEffect } from "../effects/EllipseEffect";

export class LessonTwoCpSeven extends Module {
    readonly _name: string = "l2c7";
    readonly _nextModule: string = 'l3c1';
    readonly _goal: any;
    readonly _constraint: string = 'none';
    readonly _instructions: string =
        `<p> Changing one circle changes c, which will then in turn change the other circle! </p>
    <p> Now let's put all we have learned to practice. </p>
    <p> Create a circle, and print out the size of that circle in the given box. </p>
    <p> IF we ever change the circle, we want the number in the box to change, too! </p>
    <p> CHALLENGE: Create a circle and print its size in the given box. </p>`;

    x: number = 10;
    y: number;
    square_size: number = 100;
    font_size = 20;

    constructor(ctx: CanvasRenderingContext2D, editor: CodeMirror.Editor) {
        super(ctx, editor);
        this.y = ctx.canvas.height - this.square_size - this.x;
    }

    drawGuides(): void {
        this.ctx.beginPath();
        this.ctx.rect(this.x, this.y, this.square_size, this.square_size);
        this.ctx.strokeStyle = '#6C6C6C';
        this.ctx.stroke();

        this.ctx.font = this.font_size + "px Courier New";
        this.ctx.fillStyle = '#6C6C6C';
        this.ctx.fillText("Put circle's size", this.x, this.y - 2 * this.font_size);
        this.ctx.fillText("in here", this.x, this.y - this.font_size);
    }

    /**
     * A lesson to print a string
     * goals: moving the text and observe the code
     * @param document: The HTML document
     * @param effects: the list of effects currently on the CANVAS
     */
    checkGoal(document: Document, effects: Effect<any>[]): boolean {
        for (let effect of effects) {
            if (effect instanceof NumberEffect && effect.num != null) {
                if (effect.x > this.x && effect.x < this.x + this.square_size && effect.y > this.y && effect.y < this.y + this.square_size) {
                    let val = effect.num;
                    for (let effect2 of effects) {
                        if (effect2 instanceof EllipseEffect && (val == effect2.w || val == effect2.h)) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }
}
