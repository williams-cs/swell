import { Module } from "./Module";
import { Effect } from "../effects/Effect";
import { StringEffect } from "../effects/StringEffect";

export class LessonOneCpTwo extends Module {
    readonly _name: string = "l1c2";
    readonly _nextModule: string = 'l1c3';
    readonly _goal: any;
    readonly _constraint: string = 'code';
    readonly _instructions: string =
    `<p> You just told the computer to write words on the CANVAS! </p>
    <p> Now let's do something more interesting: click on the words on the CANVAS, then drag it inside the box at the top-right corner. Observe what happens to your code. </p>
    <p> GOAL: Move the words you just created inside the top-right box. </p>`;

    x: number;
    y: number = 10;
    square_size: number = 100;
    font_size = 20;

    constructor(ctx: CanvasRenderingContext2D) {
      super(ctx);
      this.x = ctx.canvas.width - this.square_size - this.y;
    }

    drawGuides(): void {
      this.ctx.beginPath();
      this.ctx.rect(this.x, this.y, this.square_size, this.square_size);
      this.ctx.strokeStyle = '#6C6C6C';
      this.ctx.stroke();

      this.ctx.font = this.font_size + "px Courier New";
      this.ctx.fillStyle = '#6C6C6C';
      this.ctx.fillText("Put text", this.x, this.y + this.square_size + this.font_size);
      this.ctx.fillText("in here", this.x, this.y + this.square_size + 2*this.font_size);
    }

    /**
     * A lesson to print a string
     * goals: moving the text and observe the code
     * @param document The HTML document
     * @param effects: the list of effects currently on the CANVAS
     */
    checkGoal(document: Document, effects: Effect<any>[]): boolean {
        for (let effect of effects) {
          if (effect instanceof StringEffect && effect.str !== "") {
            if (effect.x > this.x && effect.x < this.x + this.square_size && effect.y > this.y && effect.y < this.y + this.square_size) {
              return true;
            }
          }
        }
        return false;
    }
}
